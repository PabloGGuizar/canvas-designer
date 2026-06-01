// Canvas Designer — Content Script (Part 1: i18n, state, bridge, helpers)

// ── i18n ────────────────────────────────────────────────────────────────────
const i18n = {
  es: {
    hint: 'Selecciona texto y elige transformación:',
    tabTransform: 'Transformar', tabAI: 'IA', tabSettings: 'Config',
    grpBasic: 'Básicos', grpLayout: 'Estructura', grpNav: 'Navegación', grpContent: 'Contenido',
    toHero: 'Héroe', toBanner: 'Banner', toCard: 'Tarjeta', toAccordion: 'Acordeón',
    toButton: 'Botón', toBlockquote: 'Cita', toAlert: 'Alerta', toProgress: 'Progreso',
    toBadge: 'Insignia', toBreadcrumb: 'Migas', toListGroup: 'Lista', toBtnGroup: 'Btn Grupo',
    toNavBar: 'Nav Bar', toPagination: 'Paginación', toCardGrid: 'Grid Tarjetas', toDropdown: 'Desplegable',
    redesignPage: 'Rediseñar página', transformSel: 'Transformar selección',
    aiPlaceholder: 'Instrucción para la IA…',
    modelLabel: 'Modelo', apiKeyLabel: 'API Key Gemini',
    saveKey: 'Guardar clave', openBuilder: 'Abrir Constructor de Estilos',
    noSelection: 'Sin texto seleccionado.', noApiKey: 'Ingresa tu API Key en Config.',
    aiThinking: 'La IA está procesando…', aiError: 'Error al contactar la IA.',
    noEditor: 'Editor no detectado.', libLoaded: 'Librería activa',
    libEmpty: 'Sin librería guardada', done: '¡Listo!',
  },
  en: {
    hint: 'Select text and choose a transformation:',
    tabTransform: 'Transform', tabAI: 'AI', tabSettings: 'Settings',
    grpBasic: 'Basic', grpLayout: 'Layout', grpNav: 'Navigation', grpContent: 'Content',
    toHero: 'Hero', toBanner: 'Banner', toCard: 'Card', toAccordion: 'Accordion',
    toButton: 'Button', toBlockquote: 'Quote', toAlert: 'Alert', toProgress: 'Progress',
    toBadge: 'Badge', toBreadcrumb: 'Breadcrumb', toListGroup: 'List Group', toBtnGroup: 'Btn Group',
    toNavBar: 'Nav Bar', toPagination: 'Pagination', toCardGrid: 'Card Grid', toDropdown: 'Dropdown',
    redesignPage: 'Redesign page', transformSel: 'Transform selection',
    aiPlaceholder: 'Instruction for AI…',
    modelLabel: 'Model', apiKeyLabel: 'Gemini API Key',
    saveKey: 'Save key', openBuilder: 'Open Style Builder',
    noSelection: 'No text selected.', noApiKey: 'Enter API Key in Settings.',
    aiThinking: 'AI is processing…', aiError: 'Error contacting AI.',
    noEditor: 'Editor not detected.', libLoaded: 'Library active',
    libEmpty: 'No saved library', done: 'Done!',
  }
};

// ── State ────────────────────────────────────────────────────────────────────
let settings = { apiKey: '', model: 'gemini-2.0-flash', lang: 'es' };
let styleLib = null;
let panelInjected = false;
let panelOpen = true;
const t = (k) => i18n[settings.lang]?.[k] ?? i18n.en[k] ?? k;

// ── Bridge ───────────────────────────────────────────────────────────────────
const PREFIX = 'CD_BRIDGE_';
let msgId = 0;
const pending = new Map();

window.addEventListener('message', (e) => {
  if (e.source !== window) return;
  const msg = e.data;
  if (!msg?.type) return;
  if (msg.type === PREFIX + 'READY') return;
  if (msg.type === PREFIX + 'RESPONSE' && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error)) : resolve(msg);
  }
});

function bridgeCall(type, extra = {}) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    window.postMessage({ type: PREFIX + 'REQ_' + type, id, ...extra }, '*');
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('timeout')); } }, 8000);
  });
}

function injectBridge() {
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('content/rce_bridge.js');
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

// ── CSS helpers ───────────────────────────────────────────────────────────────
function css(o) { return Object.entries(o).filter(([,v])=>v!=null&&v!=='').map(([k,v])=>`${k}:${v}`).join(';'); }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── Default library ───────────────────────────────────────────────────────────
function getDefaultLib() {
  return {
    palette:{ primary:'#000000', secondary:'#4b5563', accent:'#6b7280', background:'#ffffff', surface:'#ffffff', text:'#111827', textLight:'#6b7280' },
    typography:{ headingFont:'system-ui, sans-serif', bodyFont:'system-ui, sans-serif', baseSize:'16px', lineHeight:'1.5' },
    hero:{ background:'#f3f4f6', color:'#111827', padding:'60px 40px', textAlign:'left', borderRadius:'0px', minHeight:'200px', titleSize:'2.5em', subtitleColor:'#4b5563', subtitleSize:'1.25em', backgroundImage:'' },
    banner:{ background:'#f9fafb', color:'#111827', borderLeft:'4px solid #111827', padding:'16px 20px', borderRadius:'0px', fontSize:'1em', fontWeight:'normal' },
    card:{ background:'#ffffff', border:'1px solid #e5e7eb', borderRadius:'0px', padding:'24px', titleColor:'#111827', textColor:'#4b5563', titleSize:'1.25em' },
    button:{ background:'#000000', color:'#ffffff', borderRadius:'0px', padding:'10px 24px', fontSize:'1em', fontWeight:'normal', border:'1px solid #000000', textDecoration:'none', display:'inline-block' },
    accordion:{ summaryBackground:'#f9fafb', summaryColor:'#111827', summaryPadding:'12px 16px', contentBackground:'#ffffff', contentPadding:'16px', border:'1px solid #e5e7eb', borderRadius:'0px', fontWeight:'bold' },
    blockquote:{ borderLeft:'4px solid #111827', background:'#ffffff', color:'#4b5563', padding:'16px 20px', fontStyle:'italic', borderRadius:'0px' },
    table:{ headerBackground:'#f3f4f6', headerColor:'#111827', rowBackground:'#ffffff', altRowBackground:'#f9fafb', border:'1px solid #e5e7eb', cellPadding:'12px 16px' },
  };
}

// ── Renderers ─────────────────────────────────────────────────────────────────
function makeHero(title, subtitle, lib) {
  const h = lib.hero, ty = lib.typography;
  let bgStyle = `background:${h.background};`;
  if (h.backgroundImage) {
    bgStyle = `background: url('${esc(h.backgroundImage)}') center/cover no-repeat, ${h.background};`;
  }
  return `<div style="${css({'text-align':h.textAlign,'border-radius':h.borderRadius,'min-height':h.minHeight,display:'flex','flex-direction':'column','justify-content':'center','align-items':h.textAlign==='center'?'center':'flex-start','margin-bottom':'20px', padding: h.padding})};${bgStyle}"><div style="${css({background: h.backgroundImage ? 'rgba(255,255,255,0.85)' : 'transparent', padding: h.backgroundImage ? '20px' : '0', 'border-radius': h.borderRadius})}"><h2 style="${css({color:h.color,'font-size':h.titleSize,'font-family':ty.headingFont,'font-weight':'700',margin:'0 0 10px','line-height':'1.2'})}">${title}</h2>${subtitle?`<div style="${css({color:h.subtitleColor,'font-size':h.subtitleSize,'font-family':ty.bodyFont,margin:'0'})}">${subtitle}</div>`:''}</div></div>`;
}

function makeBanner(text, lib) {
  const b = lib.banner, ty = lib.typography;
  return `<div style="${css({background:b.background,color:b.color,'border-left':b.borderLeft,padding:b.padding,'border-radius':b.borderRadius,'font-size':b.fontSize,'font-weight':b.fontWeight,'font-family':ty.bodyFont,margin:'16px 0'})}"><div style="margin:0">${text}</div></div>`;
}

function makeCard(title, body, lib, imageSrc) {
  const c = lib.card, ty = lib.typography;
  let imgHtml = '';
  if (imageSrc) {
    // Top corners rounded if card has border-radius
    let radiusTop = c.borderRadius === '0px' ? '0px' : `calc(${c.borderRadius} - 1px) calc(${c.borderRadius} - 1px) 0 0`;
    imgHtml = `<img src="${esc(imageSrc)}" alt="" style="width:100%;height:auto;display:block;border-radius:${radiusTop};border-bottom:${c.border}">`;
  }
  return `<div style="${css({background:c.background,border:c.border,'border-radius':c.borderRadius})}">${imgHtml}<div style="${css({padding:c.padding})}"><h3 style="${css({color:c.titleColor,'font-size':c.titleSize,'font-family':ty.headingFont,'font-weight':'600',margin:'0 0 8px'})}">${title}</h3><div style="${css({color:c.textColor,'font-family':ty.bodyFont,margin:'0','line-height':ty.lineHeight})}">${body}</div></div></div>`;
}

function makeButton(label, href, lib) {
  const b = lib.button, ty = lib.typography;
  const link = href || '#';
  return `<a href="${esc(link)}" style="${css({background:b.background,color:b.color,'border-radius':b.borderRadius,padding:b.padding,'font-size':b.fontSize,'font-weight':b.fontWeight,'text-decoration':'none',display:'inline-block','font-family':ty.bodyFont,cursor:'pointer'})}" target="${href && href !== '#' ? '_blank' : '_self'}">${esc(label)}</a>`;
}

function makeAccordion(title, content, lib) {
  const a = lib.accordion, ty = lib.typography;
  return `<details style="${css({border:a.border,'border-radius':a.borderRadius,margin:'8px 0',overflow:'hidden'})}"><summary style="${css({background:a.summaryBackground,color:a.summaryColor,padding:a.summaryPadding,'font-weight':a.fontWeight,'font-family':ty.headingFont,cursor:'pointer',display:'block'})}">${title}</summary><div style="${css({background:a.contentBackground,color:a.contentColor,padding:a.contentPadding,'font-family':ty.bodyFont,'line-height':ty.lineHeight})}">${content || '<p>Contenido del acordeón</p>'}</div></details>`;
}

function makeBlockquote(text, author, lib) {
  const bq = lib.blockquote, ty = lib.typography, pl = lib.palette || {textLight: '#6b7280'};
  let html = `<div style="margin:0">${text}</div>`;
  if (author) {
    html += `<cite style="display:block;font-style:normal;font-weight:600;margin-top:8px;font-size:0.85em;color:${pl.textLight}">— ${esc(author)}</cite>`;
  }
  return `<blockquote style="${css({'border-left':bq.borderLeft,background:bq.background,color:bq.color,padding:bq.padding,'font-style':bq.fontStyle,'border-radius':bq.borderRadius,margin:'16px 0','font-family':ty.bodyFont})}">${html}</blockquote>`;
}

// ── NEW COMPONENTS ────────────────────────────────────────────────────────────

function makeAlert(text, variant, lib) {
  const al = lib.alert, ty = lib.typography;
  const variants = {
    info:    { bg: al.infoBackground, color: al.infoColor, border: al.infoBorderColor, icon: 'ℹ️' },
    success: { bg: al.successBackground, color: al.successColor, border: al.successBorderColor, icon: '✅' },
    warning: { bg: al.warningBackground, color: al.warningColor, border: al.warningBorderColor, icon: '⚠️' },
    danger:  { bg: al.dangerBackground, color: al.dangerColor, border: al.dangerBorderColor, icon: '🚫' },
  };
  const v = variants[variant] || variants.info;
  return `<div style="${css({display:'flex', gap:'8px', background:v.bg,color:v.color,border:`1px solid ${v.border}`,'border-left':`4px solid ${v.border}`,'border-radius':al.borderRadius,padding:'14px 16px',margin:'12px 0','font-family':ty.bodyFont,'font-size':'0.95em','line-height':ty.lineHeight})}"><strong style="flex-shrink:0;">${v.icon} </strong><div style="flex:1;">${text}</div></div>`;
}

function makeBadge(text, lib) {
  const bg = lib.badge, ty = lib.typography, pl = lib.palette;
  const background = bg.background || pl.primary;
  return `<span style="${css({background:background,color:bg.color,'border-radius':bg.borderRadius,padding:bg.padding,'font-size':bg.fontSize,'font-weight':'600',display:'inline-block','font-family':ty.bodyFont,'line-height':'1.5'})}">${esc(text)}</span>`;
}

function makeProgress(label, percent, lib) {
  const pr  = lib.progress, pl = lib.palette, ty = lib.typography;
  const pct = Math.min(100, Math.max(0, parseInt(percent) || 70));

  const cFrom = pr.colorFrom || pl.primary;
  const cTo = pr.colorTo || pl.secondary;

  const wrapStyle  = `margin:16px 0;font-family:${ty.bodyFont}`;
  const tableStyle = `width:100%;border-collapse:collapse;margin-bottom:6px`;
  const labelStyle = `font-size:0.9em;font-weight:600;color:${pl.text};text-align:left;padding:0;border:none;background:none`;
  const pctStyle   = `font-size:0.9em;font-weight:600;color:${pl.text};text-align:right;padding:0;border:none;background:none`;
  const trackStyle = `background:${pr.trackBackground};border-radius:${pr.borderRadius};height:${pr.height};overflow:hidden;width:100%`;
  const fillStyle  = `background:linear-gradient(90deg,${cFrom},${cTo});width:${pct}%;height:${pr.height};border-radius:${pct >= 100 ? pr.borderRadius : `calc(${pr.borderRadius} - 2px) 0 0 calc(${pr.borderRadius} - 2px)`};display:block`;

  return `<div style="${wrapStyle}"><table style="${tableStyle}"><tbody><tr><td style="${labelStyle}">${esc(label)}</td><td style="${pctStyle}">${pct}%</td></tr></tbody></table><div style="${trackStyle}"><div style="${fillStyle}">&nbsp;</div></div></div>`;
}


function makeBreadcrumb(items, lib) {
  const br = lib.breadcrumb, ty = lib.typography;
  const navStyle = css({display:'flex','align-items':'center','flex-wrap':'wrap',gap:'6px',margin:'12px 0','font-family':ty.bodyFont,'font-size':'0.9em'});
  const linkStyle = css({color:br.linkColor,'text-decoration':'none','font-weight':'500'});
  const sepStyle  = css({color:br.separatorColor});
  const parts = items.map((item, i) => {
    const isLast = i === items.length - 1;
    const label = isLast
      ? `<span style="${css({color:br.activeColor,'font-weight':'600'})}">${esc(item.label)}</span>`
      : `<a href="${esc(item.href||'#')}" style="${linkStyle}">${esc(item.label)}</a>`;
    return label + (isLast ? '' : `<span style="${sepStyle}"> ${br.separator || '/'} </span>`);
  }).join('');
  return `<nav style="${navStyle}" aria-label="breadcrumb">${parts}</nav>`;
}

function makeListGroup(items, lib) {
  const lg = lib.listgroup, ty = lib.typography;
  const ulStyle = css({'list-style':'none',padding:'0',margin:'12px 0',border:`1px solid #e2e8f0`,'border-radius':lg.borderRadius,overflow:'hidden'});
  const rows = items.map((item, i) => {
    const bg = i % 2 === 0 ? lg.evenBackground : lg.oddBackground;
    return `<li style="${css({padding:lg.padding,'border-bottom':i<items.length-1?'1px solid #e2e8f0':'none',background:bg,'font-family':ty.bodyFont,color:lg.color,'font-size':'0.95em','line-height':'1.5'})}">${esc(item)}</li>`;
  }).join('');
  return `<ul style="${ulStyle}">${rows}</ul>`;
}

function makeButtonGroup(labels, lib) {
  const b = lib.button, ty = lib.typography;
  const wrapStyle = css({display:'inline-flex','border-radius':b.borderRadius,overflow:'hidden',border:`1px solid ${b.background}`,'flex-wrap':'wrap',margin:'8px 0'});
  const btnBase = css({background:b.background,color:b.color,padding:'9px 18px','font-size':b.fontSize,'font-weight':b.fontWeight,'text-decoration':'none',display:'inline-block','font-family':ty.bodyFont});
  const btns = labels.map((label, i) => {
    const extra = i > 0 ? `border-left:1px solid rgba(255,255,255,0.2)` : '';
    return `<a href="#" style="${btnBase};${extra}">${esc(label)}</a>`;
  }).join('');
  return `<div style="${wrapStyle}">${btns}</div>`;
}

function makeNavBar(brand, links, lib) {
  const nb = lib.navbar, ty = lib.typography;
  const navStyle = css({background:nb.background,'border-radius':nb.borderRadius,padding:nb.padding,display:'flex','align-items':'center',gap:'8px',margin:'16px 0','flex-wrap':'wrap'});
  const brandStyle = css({color:nb.brandColor,'font-weight':'700','font-size':'1.05em','text-decoration':'none','font-family':ty.headingFont,'margin-right':'auto'});
  const linkStyle  = css({color:nb.linkColor,'text-decoration':'none','font-size':'0.9em','font-family':ty.bodyFont,padding:'4px 10px','border-radius':'6px'});
  const linkItems  = links.map(l=>`<a href="#" style="${linkStyle}">${esc(l)}</a>`).join('');
  return `<nav style="${navStyle}"><a href="#" style="${brandStyle}">${esc(brand)}</a>${linkItems}</nav>`;
}

function makePagination(items, lib) {
  const pg = lib.pagination, ty = lib.typography;
  const navStyle = css({display:'flex','justify-content':'center','align-items':'center',gap:'5px',margin:'16px 0','font-family':ty.bodyFont});
  const base = css({'border-radius':pg.borderRadius,padding:'7px 13px','font-size':'0.9em','text-decoration':'none','font-weight':'500',display:'inline-block'});
  const inactive = `${base};background:${pg.inactiveBackground};color:${pg.inactiveColor};border:1px solid #e2e8f0`;
  const active   = `${base};background:${pg.activeBackground};color:${pg.activeColor};border:1px solid ${pg.activeBackground}`;
  const disabled = `${base};background:#f8fafc;color:#9ca3af;border:1px solid #e2e8f0;pointer-events:none`;

  if (typeof items === 'number') {
    const current = items;
    const total = arguments[1];
    items = [];
    for (let i = 1; i <= Math.min(total, 5); i++) {
       items.push({ label: String(i), href: '#', active: i === current });
    }
  }

  const pages = [];
  let activeIdx = items.findIndex(it => it.active);
  if (activeIdx === -1) activeIdx = 0;
  
  const prevItem = items[activeIdx - 1];
  const nextItem = items[activeIdx + 1];

  pages.push(`<a href="${prevItem ? esc(prevItem.href) : '#'}" style="${prevItem ? inactive : disabled}">‹</a>`);
  
  items.forEach(it => {
    pages.push(`<a href="${esc(it.href||'#')}" style="${it.active ? active : inactive}">${esc(it.label)}</a>`);
  });
  
  pages.push(`<a href="${nextItem ? esc(nextItem.href) : '#'}" style="${nextItem ? inactive : disabled}">›</a>`);
  
  return `<nav style="${navStyle}">${pages.join('')}</nav>`;
}

function makeDropdown(label, items, lib) {
  // CSS-only dropdown using details/summary (no JS needed)
  const dp = lib.dropdown, ty = lib.typography, b = lib.button;
  const detailsStyle = css({display:'inline-block',position:'relative',margin:'8px 0'});
  const summaryStyle = css({background:b.background,color:b.color,'border-radius':b.borderRadius,padding:b.padding,'font-size':b.fontSize,'font-weight':b.fontWeight,'font-family':ty.bodyFont,cursor:'pointer','list-style':'none',display:'inline-block'});
  const menuStyle = css({position:'static',background:dp.menuBackground,border:'1px solid #e2e8f0','border-radius':dp.borderRadius,margin:'4px 0',overflow:'hidden','min-width':'160px','box-shadow':'0 4px 12px rgba(0,0,0,0.1)'});
  const itemStyle = css({display:'block',padding:'10px 16px',color:dp.itemColor,'text-decoration':'none','font-family':ty.bodyFont,'font-size':'0.9em','border-bottom':'1px solid #f1f5f9'});
  const rows = items.map(item => `<a href="#" style="${itemStyle}">${esc(item)}</a>`).join('');
  return `<details style="${detailsStyle}"><summary style="${summaryStyle}">${esc(label)} ▾</summary><div style="${menuStyle}">${rows}</div></details>`;
}

function makeCardGrid(cards, lib) {
  const c = lib.card, ty = lib.typography;
  const gridStyle = css({display:'flex','flex-wrap':'wrap',gap:'16px',margin:'16px 0'});
  const items = cards.map(card => {
    let imgHtml = '';
    if (card.imageSrc) {
      let radiusTop = c.borderRadius === '0px' ? '0px' : `calc(${c.borderRadius} - 1px) calc(${c.borderRadius} - 1px) 0 0`;
      imgHtml = `<img src="${esc(card.imageSrc)}" alt="" style="width:100%;height:auto;display:block;border-radius:${radiusTop};border-bottom:${c.border}">`;
    }
    return `<div style="${css({background:c.background,border:c.border,'border-radius':c.borderRadius,flex:'1','min-width':'160px'})}">${imgHtml}<div style="${css({padding:c.padding})}"><h3 style="${css({color:c.titleColor,'font-size':c.titleSize,'font-family':ty.headingFont,'font-weight':'600',margin:'0 0 8px'})}">${card.title}</h3><div style="${css({color:c.textColor,'font-family':ty.bodyFont,margin:'0','font-size':'0.9em','line-height':ty.lineHeight})}">${card.body}</div></div></div>`;
  }).join('');
  return `<div style="${gridStyle}">${items}</div>`;
}

// ── Extract href from HTML selection ─────────────────────────────────────────
function extractHrefFromHTML(html) {
  if (!html) return null;
  const m = html.match(/<a[^>]+href=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

// Export via global for part 2
window.__CD = { t, settings, getSettings: ()=>settings, getLib: ()=>styleLib||getDefaultLib(),
  makeHero, makeBanner, makeCard, makeButton, makeAccordion, makeBlockquote,
  makeAlert, makeBadge, makeProgress, makeBreadcrumb, makeListGroup,
  makeButtonGroup, makeNavBar, makePagination, makeDropdown, makeCardGrid,
  extractHrefFromHTML, bridgeCall, setStatus: null, setSettings: (s)=>{ settings=s; }, setLib: (l)=>{ styleLib=l; }
};
