// Canvas Designer — Panel (Part 2)

(function () {
  const CD = window.__CD;

  // ── Options config per component ──────────────────────────────────────────
  const COMPONENT_OPTIONS = {
    'alert': {
      label: 'Tipo de alerta',
      variants: [
        { id:'info',    icon:'ℹ️', label:'Info' },
        { id:'success', icon:'✅', label:'Éxito' },
        { id:'warning', icon:'⚠️', label:'Aviso' },
        { id:'danger',  icon:'🚫', label:'Error' },
      ]
    },
    'button': {
      label: 'Estilo del botón',
      variants: [
        { id:'primary',   icon:'■', label:'Primario' },
        { id:'outlined',  icon:'□', label:'Secundario' },
        { id:'pill',      icon:'◉', label:'Redondeado' },
      ]
    },
    'badge': {
      label: 'Color de la insignia',
      variants: [
        { id:'primary',   icon:'●', label:'Primario' },
        { id:'secondary', icon:'●', label:'Secundario' },
        { id:'accent',    icon:'●', label:'Acento' },
        { id:'success',   icon:'●', label:'Éxito' },
      ]
    },
    'progress': {
      label: 'Porcentaje (del texto seleccionado o escribe)',
      isProgress: true,
    },
  };

  // Components that apply immediately (no variant picker needed)
  const INSTANT = ['hero','banner','card','accordion','blockquote','listgroup','cardgrid','navbar','breadcrumb','pagination','btngroup','dropdown'];

  // ── Status ────────────────────────────────────────────────────────────────
  function setStatus(msg, type = 'info', duration = 4000) {
    const el = document.getElementById('cd-status');
    if (!el) return;
    el.textContent = msg;
    el.className = type;
    if (duration) setTimeout(() => { if (el) el.className = ''; }, duration);
  }
  CD.setStatus = setStatus;

  // ── Options panel ─────────────────────────────────────────────────────────
  let pendingType = null;

  function showOptions(type) {
    pendingType = type;
    const opts = COMPONENT_OPTIONS[type];
    const panel = document.getElementById('cd-options-panel');
    if (!panel || !opts) return;

    if (opts.isProgress) {
      panel.innerHTML = `
        <div class="cd-opts-label">${opts.label}</div>
        <div class="cd-opts-progress">
          <input type="number" id="cd-pct-input" class="cd-input" min="0" max="100" value="70" placeholder="70">
          <span class="cd-pct-sym">%</span>
        </div>
        <input type="text" id="cd-pct-label" class="cd-input" placeholder="Etiqueta (ej: Avance del curso)" style="margin-top:6px">
        <button class="cd-btn cd-btn-primary" id="cd-apply-variant" style="margin-top:8px">Insertar barra</button>
      `;
      // Auto-fill from selection
      CD.bridgeCall('GET_SELECTION').then(sel => {
        const pctMatch = (sel?.text || '').match(/(\d+)\s*%/);
        if (pctMatch) {
          const input = document.getElementById('cd-pct-input');
          if (input) input.value = parseInt(pctMatch[1]);
        }
      }).catch(()=>{});
      document.getElementById('cd-apply-variant')?.addEventListener('click', () => {
        const pct = parseInt(document.getElementById('cd-pct-input')?.value || '70');
        const label = document.getElementById('cd-pct-label')?.value?.trim() || 'Progreso';
        applyComponent('progress', null, { pct, label });
        hideOptions();
      });
    } else {
      const btns = opts.variants.map(v => `
        <button class="cd-variant-btn" data-variant="${v.id}" title="${v.label}">
          <span>${v.icon}</span><span>${v.label}</span>
        </button>`).join('');
      panel.innerHTML = `<div class="cd-opts-label">${opts.label}</div><div class="cd-variant-grid">${btns}</div>`;
      panel.querySelectorAll('.cd-variant-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          applyComponent(pendingType, btn.dataset.variant, {});
          hideOptions();
        });
      });
    }

    panel.classList.add('visible');
  }

  function hideOptions() {
    const panel = document.getElementById('cd-options-panel');
    if (panel) panel.classList.remove('visible');
    pendingType = null;
  }

  // ── Apply component ───────────────────────────────────────────────────────
  async function applyComponent(type, variant, extra) {
    // Ensure we have the absolutely latest styles from storage before generating HTML
    const res = await new Promise(resolve => chrome.runtime.sendMessage({ type: 'GET_STYLE_LIBRARY' }, resolve));
    if (res?.library) CD.setLib(res.library);
    
    const lib = CD.getLib();
    let sel;
    try { sel = await CD.bridgeCall('GET_SELECTION'); } catch (e) { return setStatus(CD.t('noEditor'), 'error'); }

    const text  = sel?.text?.trim() || '';
    const html  = sel?.content || '';
    
    // Parse smart structure
    const parsed = parseSmartSelection(html, text);
    const { title, body, items, links } = parsed;
    const href  = CD.extractHrefFromHTML(html) || links[0]?.href;

    let result = '';

    switch (type) {
      case 'hero': {
        const heroBody = body ? body.replace(/<[^>]+>/g, '').trim() : '';
        result = CD.makeHero(title || 'Título del Héroe', heroBody || 'Subtítulo descriptivo para tu héroe', lib); 
        break;
      }
      case 'banner':
        result = CD.makeBanner(text || 'Texto destacado para tu banner', lib); break;
      case 'card': {
        const cardBody = body ? body.replace(/<[^>]+>/g, '').trim() : '';
        result = CD.makeCard(title || 'Título de la Tarjeta', cardBody || 'Este es el contenido principal de la tarjeta. Puedes añadir más información aquí.', lib); 
        break;
      }
      case 'button': {
        const b = lib.button, ty = lib.typography;
        const link = href || '#';
        const display = title || 'Botón';
        if (variant === 'outlined') {
          const s = `background:transparent;color:${b.background};border-radius:${b.borderRadius};padding:${b.padding};font-size:${b.fontSize};font-weight:${b.fontWeight};text-decoration:none;display:inline-block;font-family:${ty.bodyFont};border:2px solid ${b.background}`;
          result = `<a href="${link}" style="${s}">${display}</a>`;
        } else if (variant === 'pill') {
          const s = `background:${b.background};color:${b.color};border-radius:50px;padding:${b.padding};font-size:${b.fontSize};font-weight:${b.fontWeight};text-decoration:none;display:inline-block;font-family:${ty.bodyFont}`;
          result = `<a href="${link}" style="${s}">${display}</a>`;
        } else {
          result = CD.makeButton(display, link, lib);
        }
        break;
      }
      case 'alert':
        result = CD.makeAlert(html || text || 'Texto de alerta', variant || 'info', lib); break;
      case 'badge': {
        const pl = lib.palette, ty = lib.typography;
        const colors = { primary: pl.primary, secondary: pl.secondary, accent: pl.accent, success: '#10b981' };
        const bg = colors[variant] || pl.primary;
        result = `<span style="background:${bg};color:#fff;border-radius:20px;padding:3px 10px;font-size:0.78em;font-weight:600;display:inline-block;font-family:${ty.bodyFont};line-height:1.5">${title || 'Insignia'}</span>`;
        break;
      }
      case 'progress': {
        const pctMatch = text.match(/(\\d+)\\s*%/);
        const pct = extra.pct ?? (pctMatch ? parseInt(pctMatch[1]) : 70);
        const label = extra.label || title || 'Progreso';
        result = CD.makeProgress(label, pct, lib);
        break;
      }
      case 'blockquote':
        result = CD.makeBlockquote(html || text || 'Texto destacado para la cita', lib); break;
      case 'accordion': {
        const accBody = (body && body.replace(/<[^>]+>/g, '').trim()) ? body : '<p>Contenido descriptivo del acordeón. Haz clic en Editar para cambiar este texto.</p>';
        result = CD.makeAccordion(title || 'Título del acordeón', accBody, lib); 
        break;
      }
      case 'listgroup': {
        const labels = items.map(i => i.label);
        result = CD.makeListGroup(labels.length ? labels : [title], lib);
        break;
      }
      case 'navbar': {
        const brand = items[0]?.label || 'Mi Curso';
        const navItems = items.length > 1 ? items.slice(1).map(i => i.label) : ['Inicio', 'Módulos'];
        result = CD.makeNavBar(brand, navItems, lib);
        break;
      }
      case 'breadcrumb': {
        const crumbs = items.length ? items.map(i => ({ label: i.label, href: i.href })) : [{label: title, href: '#'}];
        result = CD.makeBreadcrumb(crumbs, lib);
        break;
      }
      case 'pagination':
        result = CD.makePagination(2, 5, lib); break;
      case 'btngroup': {
        const labels = items.map(i => i.label).slice(0, 4);
        result = CD.makeButtonGroup(labels.length ? labels : ['Opción A', 'Opción B'], lib);
        break;
      }
      case 'dropdown': {
        const dropTitle = items[0]?.label || 'Menú';
        const dropItems = items.length > 1 ? items.slice(1).map(i => i.label) : ['Opción 1', 'Opción 2'];
        result = CD.makeDropdown(dropTitle, dropItems, lib);
        break;
      }
      case 'cardgrid':
        const cards = items.map(i => ({ title: i.label, body: i.subBody ? i.subBody.replace(/<[^>]+>/g, '') : 'Descripción' }));
        // Ensure at least two cards if not enough items
        if (cards.length === 1) cards.push({ title: 'Tarjeta 2', body: 'Contenido adicional' });
        result = CD.makeCardGrid(cards, lib);
        break;
    }

    if (!result) return;
    try {
      // If we are inserting an accordion or dropdown without previous selection,
      // we attach a temporary ID so the bridge can find it and force it open in TinyMCE.
      if (!html && (type === 'accordion' || type === 'dropdown')) {
        result = result.replace('<details', '<details id="cd-temp-insertion"');
      }

      await CD.bridgeCall('REPLACE_SELECTION', { html: result });
      
      if (!html && ['dropdown', 'card', 'hero', 'accordion'].includes(type)) {
        setStatus('💡 Tip: Selecciona texto antes de añadir este componente', 'ok');
      } else {
        setStatus('✅ ' + CD.t('done'), 'ok');
      }
    } catch (e) { setStatus(CD.t('aiError'), 'error'); }
  }

  // ── Smart Selection Parsing ───────────────────────────────────────────────
  function parseSmartSelection(html, fallbackText) {
    if (!html) {
      const t = fallbackText.trim() || 'Texto de ejemplo';
      return { title: t, body: '', items: [{label: t, href: '#', subBody: ''}], links: [] };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const root = doc.body;

    let title = '';
    let bodyHtml = '';
    let items = [];
    let links = [];

    // Extract all links globally
    root.querySelectorAll('a').forEach(a => {
      links.push({ label: a.textContent.trim(), href: a.getAttribute('href') || '#' });
    });

    // Strategy 1: Nested Lists
    const topLists = Array.from(root.children).filter(el => el.tagName === 'UL' || el.tagName === 'OL');
    if (topLists.length > 0) {
      const topItems = Array.from(topLists[0].children).filter(el => el.tagName === 'LI');
      if (topItems.length > 0) {
        items = topItems.map(li => {
          const clone = li.cloneNode(true);
          const subLists = clone.querySelectorAll('ul, ol');
          let subBody = '';
          subLists.forEach(sl => {
            subBody += sl.innerHTML;
            sl.remove();
          });
          const a = clone.querySelector('a');
          const href = a ? (a.getAttribute('href') || '#') : '#';
          return {
            label: clone.textContent.trim().replace(/\s+/g, ' '),
            href,
            subBody: subBody.trim() || clone.innerHTML.trim()
          };
        });
        title = items[0].label;
        bodyHtml = items[0].subBody;
        return { title, body: bodyHtml, items, links };
      }
    }

    // Strategy 2: Headings and Paragraphs
    const heading = root.querySelector('h1, h2, h3, h4, h5, h6, strong, b');
    if (heading) {
      title = heading.textContent.trim();
      const clone = root.cloneNode(true);
      const hClone = clone.querySelector(heading.tagName);
      if (hClone) hClone.remove();
      bodyHtml = clone.innerHTML.trim();
      if (!bodyHtml.replace(/<[^>]+>/g, '').trim()) bodyHtml = ''; 
    } else {
      // Strategy 3: Just paragraphs or lines
      const p = root.querySelector('p');
      if (p) {
        title = p.textContent.trim();
        const clone = root.cloneNode(true);
        clone.querySelector('p').remove();
        bodyHtml = clone.innerHTML.trim();
      } else {
        const lines = fallbackText.split('\\n').map(s=>s.trim()).filter(Boolean);
        title = lines[0] || 'Texto de ejemplo';
        bodyHtml = lines.slice(1).map(l => `<p>${l}</p>`).join('');
      }
    }

    // Build items from blocks if not a list
    const blocks = root.querySelectorAll('p, div, li');
    if (blocks.length > 0) {
      blocks.forEach(b => {
        const text = b.textContent.trim();
        if (text) {
          const a = b.querySelector('a');
          items.push({ label: text, href: a ? (a.getAttribute('href') || '#') : '#', subBody: text });
        }
      });
    } else {
      const lines = fallbackText.split('\\n').map(s=>s.trim()).filter(Boolean);
      items = lines.map(l => ({ label: l, href: '#', subBody: l }));
    }

    if (items.length === 0) {
      items = [{ label: title, href: links[0]?.href || '#', subBody: bodyHtml || title }];
    }

    return { title, body: bodyHtml, items, links };
  }

  // ── Panel HTML ─────────────────────────────────────────────────────────────
  function buildPanelHTML() {
    const s   = CD.getSettings();
    const lib = CD.getLib();

    const tBtn = (type, icon, key, hasOpts) =>
      `<button class="cd-transform-btn${hasOpts?' has-opts':''}" data-type="${type}" title="${CD.t(key)}">
        <span class="cd-icon">${icon}</span>
        <span>${CD.t(key)}</span>
        ${hasOpts ? '<span class="cd-opts-arrow">▾</span>' : ''}
      </button>`;

    return `
<div id="canvas-designer-panel">
  <div id="cd-header">
    <div class="cd-logo">🎨 Canvas Designer</div>
    <button id="cd-lang-btn">${s.lang === 'es' ? 'EN' : 'ES'}</button>
  </div>
  <div id="cd-tabs">
    <button class="cd-tab active" data-tab="transform">${CD.t('tabTransform')}</button>
    <button class="cd-tab" data-tab="settings">${CD.t('tabSettings')}</button>
  </div>
  <div id="cd-body">
    <div id="cd-status"></div>

    <!-- TRANSFORM TAB -->
    <div class="cd-tab-pane active" id="cd-pane-transform">
      <div class="cd-library-chip">
        <span class="dot ${lib ? '' : 'empty'}"></span>
        <span>${lib ? CD.t('libLoaded') : CD.t('libEmpty')}</span>
      </div>
      <p class="cd-hint">${CD.t('hint')}</p>

      <div class="cd-section-label">${CD.t('grpBasic')}</div>
      <div class="cd-transform-grid">
        ${tBtn('hero',       '🎯', 'toHero',       false)}
        ${tBtn('banner',     '📢', 'toBanner',     false)}
        ${tBtn('card',       '🃏', 'toCard',       false)}
        ${tBtn('button',     '🔘', 'toButton',     true )}
        ${tBtn('blockquote', '💬', 'toBlockquote', false)}
        ${tBtn('badge',      '🏷️', 'toBadge',      true )}
      </div>

      <div class="cd-section-label">${CD.t('grpContent')}</div>
      <div class="cd-transform-grid">
        ${tBtn('accordion', '📋', 'toAccordion', false)}
        ${tBtn('dropdown',  '▾',  'toDropdown',  false)}
        ${tBtn('alert',     'ℹ️', 'toAlert',     true )}
        ${tBtn('progress',  '📊', 'toProgress',  true )}
        ${tBtn('listgroup', '📝', 'toListGroup', false)}
        ${tBtn('cardgrid',  '⊞',  'toCardGrid',  false)}
      </div>

      <div class="cd-section-label">${CD.t('grpNav')}</div>
      <div class="cd-transform-grid">
        ${tBtn('navbar',      '🧭', 'toNavBar',     false)}
        ${tBtn('breadcrumb',  '🔗', 'toBreadcrumb', false)}
        ${tBtn('pagination',  '📄', 'toPagination', false)}
        ${tBtn('btngroup',    '⚡', 'toBtnGroup',   false)}
      </div>

      <!-- Options panel (contextual) -->
      <div id="cd-options-panel"></div>
    </div>

    <!-- SETTINGS TAB -->
    <div class="cd-tab-pane" id="cd-pane-settings">
      <button class="cd-btn cd-btn-primary" id="cd-btn-open-builder">🎨 ${CD.t('openBuilder')}</button>
      <div class="cd-divider"></div>
      <div class="cd-field">
        <label class="cd-label">Idioma / Language</label>
        <div style="display:flex;gap:8px">
          <button class="cd-btn cd-btn-secondary" id="cd-btn-es" style="flex:1">🇲🇽 Español</button>
          <button class="cd-btn cd-btn-secondary" id="cd-btn-en" style="flex:1">🇺🇸 English</button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  function buildFAB() {
    const fab = document.createElement('button');
    fab.id = 'cd-fab';
    fab.title = 'Canvas Designer';
    fab.innerHTML = '🎨';
    if (window.__cdPanelOpen !== false) fab.classList.add('panel-open');
    fab.addEventListener('click', togglePanel);
    return fab;
  }

  function togglePanel() {
    const panel = document.getElementById('canvas-designer-panel');
    const fab   = document.getElementById('cd-fab');
    if (!panel) return;
    const hidden = panel.classList.toggle('cd-hidden');
    window.__cdPanelOpen = !hidden;
    if (fab) fab.classList.toggle('panel-open', !hidden);
  }

  // ── Wire events ────────────────────────────────────────────────────────────
  function wirePanel() {
    document.getElementById('cd-lang-btn')?.addEventListener('click', () => {
      const s = CD.getSettings();
      s.lang = s.lang === 'es' ? 'en' : 'es';
      chrome.runtime.sendMessage({ type: 'SAVE_SETTINGS', settings: s });
      reRender();
    });

    document.querySelectorAll('.cd-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.cd-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.cd-tab-pane').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`cd-pane-${tab.dataset.tab}`)?.classList.add('active');
      });
    });

    document.querySelectorAll('.cd-transform-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        // Close options if clicking same type again
        const opts = document.getElementById('cd-options-panel');
        if (opts?.classList.contains('visible') && pendingType === type) {
          hideOptions(); return;
        }
        if (INSTANT.includes(type)) {
          hideOptions();
          applyComponent(type, null, {});
        } else {
          showOptions(type);
        }
      });
    });

    document.getElementById('cd-btn-open-builder')?.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'OPEN_BUILDER' });
    });

    document.getElementById('cd-btn-es')?.addEventListener('click', () => setLang('es'));
    document.getElementById('cd-btn-en')?.addEventListener('click', () => setLang('en'));
  }

  function setLang(lang) {
    const s = CD.getSettings();
    s.lang = lang;
    chrome.runtime.sendMessage({ type: 'SAVE_SETTINGS', settings: s });
    reRender();
  }

  function reRender() {
    const old = document.getElementById('canvas-designer-panel');
    if (old) old.remove();
    const div = document.createElement('div');
    div.innerHTML = buildPanelHTML();
    document.body.appendChild(div.firstElementChild);
    wirePanel();
  }

  // ── RCE Detection & Init ───────────────────────────────────────────────────
  let panelInjected = false;

  function injectPanel() {
    if (panelInjected || document.getElementById('canvas-designer-panel')) return;
    panelInjected = true;
    window.__cdPanelOpen = true;
    const div = document.createElement('div');
    div.innerHTML = buildPanelHTML();
    document.body.appendChild(div.firstElementChild);
    document.body.appendChild(buildFAB());
    wirePanel();
  }

  function detectRCE() {
    const has = !!(
      document.querySelector('.tox-tinymce') ||
      document.querySelector('[data-testid="canvas-rce"]') ||
      document.querySelector('textarea.mce_editable') ||
      document.getElementById('tinymce')
    );
    if (has && !panelInjected) {
      const s = document.createElement('script');
      s.src = chrome.runtime.getURL('content/rce_bridge.js');
      (document.head || document.documentElement).appendChild(s);
      s.onload = () => s.remove();
      injectPanel();
    }
  }

  chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (res) => {
    if (res?.settings) CD.setSettings({ ...CD.getSettings(), ...res.settings });
  });
  chrome.runtime.sendMessage({ type: 'GET_STYLE_LIBRARY' }, (res) => {
    if (res?.library) CD.setLib(res.library);
  });

  const observer = new MutationObserver(() => detectRCE());
  observer.observe(document.body, { childList: true, subtree: true });
  detectRCE();

})();
