#!/usr/bin/env node
// Canvas Designer — Build Script
// Usage:
//   node build.js          → builds both chrome and firefox
//   node build.js chrome   → builds only chrome
//   node build.js firefox  → builds only firefox

const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────
const SRC_DIR       = path.join(__dirname, 'src');
const MANIFESTS_DIR = path.join(__dirname, 'manifests');
const DIST_DIR      = path.join(__dirname, 'dist');

const BROWSERS = ['chrome', 'firefox'];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Recursively copy a directory */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/** Recursively collect all file paths under a dir */
function collectFiles(dir, baseDir = dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, baseDir, result);
    } else {
      result.push(path.relative(baseDir, full));
    }
  }
  return result;
}

/** Minimal synchronous ZIP writer (no external deps) */
function createZip(sourceDir, outPath) {
  // Use Node's built-in zlib + manual ZIP format
  const zlib = require('zlib');

  const files = collectFiles(sourceDir);
  const localHeaders = [];
  const centralDir   = [];
  let offset = 0;

  const chunks = [];

  for (const relPath of files) {
    const absPath  = path.join(sourceDir, relPath);
    const fileData = fs.readFileSync(absPath);
    const zipName  = relPath.replace(/\\/g, '/');

    // Local file header
    const compressed  = zlib.deflateRawSync(fileData, { level: 6 });
    const crc         = crc32(fileData);
    const nameBytes   = Buffer.from(zipName, 'utf8');

    const localHeader = Buffer.alloc(30 + nameBytes.length);
    localHeader.writeUInt32LE(0x04034b50, 0);  // signature
    localHeader.writeUInt16LE(20, 4);           // version needed
    localHeader.writeUInt16LE(0, 6);            // flags
    localHeader.writeUInt16LE(8, 8);            // deflate
    localHeader.writeUInt16LE(0, 10);           // mod time
    localHeader.writeUInt16LE(0, 12);           // mod date
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(fileData.length, 22);
    localHeader.writeUInt16LE(nameBytes.length, 26);
    localHeader.writeUInt16LE(0, 28);           // extra length
    nameBytes.copy(localHeader, 30);

    localHeaders.push({ offset, nameBytes, crc, compressed, uncompressed: fileData.length });
    chunks.push(localHeader, compressed);
    offset += localHeader.length + compressed.length;
  }

  // Central directory
  const cdStart = offset;
  for (const { offset: lhOffset, nameBytes, crc, compressed, uncompressed } of localHeaders) {
    const cd = Buffer.alloc(46 + nameBytes.length);
    cd.writeUInt32LE(0x02014b50, 0); // signature
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(8, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(compressed.length, 20);
    cd.writeUInt32LE(uncompressed, 24);
    cd.writeUInt16LE(nameBytes.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(lhOffset, 42);
    nameBytes.copy(cd, 46);
    chunks.push(cd);
    offset += cd.length;
  }

  // End of central directory
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(localHeaders.length, 8);
  eocd.writeUInt16LE(localHeaders.length, 10);
  eocd.writeUInt32LE(offset - cdStart, 12);
  eocd.writeUInt32LE(cdStart, 16);
  eocd.writeUInt16LE(0, 20);
  chunks.push(eocd);

  fs.writeFileSync(outPath, Buffer.concat(chunks));
}

/** CRC-32 checksum */
function crc32(buf) {
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c;
    }
    return t;
  })());
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ── Build ─────────────────────────────────────────────────────────────────────
const target = process.argv[2];
const toBuild = target ? [target] : BROWSERS;

for (const browser of toBuild) {
  if (!BROWSERS.includes(browser)) {
    console.error(`❌ Unknown browser: "${browser}". Valid options: ${BROWSERS.join(', ')}`);
    process.exit(1);
  }

  const outDir      = path.join(DIST_DIR, browser);
  const manifestSrc = path.join(MANIFESTS_DIR, `${browser}.json`);
  const zipPath     = path.join(DIST_DIR, `canvas-designer-${browser}.zip`);

  // Clean & copy
  fs.rmSync(outDir, { recursive: true, force: true });
  copyDir(SRC_DIR, outDir);

  // Inject browser-specific manifest
  fs.copyFileSync(manifestSrc, path.join(outDir, 'manifest.json'));

  // Create ZIP
  createZip(outDir, zipPath);

  const manifest = JSON.parse(fs.readFileSync(manifestSrc, 'utf8'));
  console.log(`✅ ${browser.padEnd(8)} → dist/${browser}/  +  canvas-designer-${browser}.zip  (v${manifest.version})`);
}
