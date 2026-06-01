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

  // ── Editor panel ─────────────────────────────────────────────────────────
  let currentEditorType = null;
  let currentEditorData = null;

  const stripHtml = (h) => {
    if (!h) return '';
    const div = document.createElement('div');
    div.innerHTML = h;
    return div.textContent.trim();
  };

  const getSubLines = (html) => {
    if (!html) return [];
    const div = document.createElement('div');
    div.innerHTML = html;
    const blocks = Array.from(div.querySelectorAll('p, div, li'));
    if (blocks.length > 0) {
      return blocks.map(b => b.textContent.trim()).filter(Boolean);
    }
    return html.split(/<br\s*\/?>/i).map(s => {
       div.innerHTML = s;
       return div.textContent.trim();
    }).filter(Boolean);
  };

  async function showEditor(type) {
    const res = await new Promise(resolve => chrome.runtime.sendMessage({ type: 'GET_STYLE_LIBRARY' }, resolve));
    if (res?.library) CD.setLib(res.library);

    currentEditorType = type;
    
    let sel;
    try { sel = await CD.bridgeCall('GET_SELECTION'); } catch (e) { return setStatus(CD.t('noEditor'), 'error'); }

    const text  = sel?.text?.trim() || '';
    const html  = sel?.content || '';
    
    currentEditorData = parseSmartSelection(html, text);
    const { items } = currentEditorData;
    currentEditorData.href = CD.extractHrefFromHTML(html) || currentEditorData.links[0]?.href || '#';

    // Pre-process items for list-like components
    if (['listgroup', 'navbar', 'breadcrumb', 'btngroup', 'dropdown'].includes(type)) {
      if (items.length === 1 && items[0].subBody) {
         const sub = getSubLines(items[0].subBody);
         if (sub.length > 0) {
            currentEditorData.items = sub.map((s, idx) => {
              if (idx === 0 && (type === 'navbar' || type === 'dropdown')) return items[0];
              return { label: s, href: '#', subBody: '' };
            });
         }
      }
    }

    renderEditorForm();
    
    document.querySelectorAll('.cd-tab-pane').forEach(p => p.classList.remove('active'));
    const pane = document.getElementById('cd-pane-editor');
    if (pane) pane.classList.add('active');
  }

  function hideEditor() {
    currentEditorType = null;
    currentEditorData = null;
    document.querySelectorAll('.cd-tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('cd-pane-transform').classList.add('active');
  }

  function renderEditorForm() {
    const pane = document.getElementById('cd-pane-editor');
    if (!pane) return;

    const d = currentEditorData;
    const type = currentEditorType;

    let formHtml = `<div id="cd-editor-header">
      <button class="cd-back-btn" id="cd-editor-back" title="Regresar">←</button>
      <span id="cd-editor-title">Editar ${type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </div>
    <div id="cd-live-preview" class="cd-preview-box"></div>
    <div class="cd-editor-form" id="cd-form-container"></div>
    <div class="cd-btn-group">
      <button class="cd-btn cd-btn-secondary" id="cd-editor-cancel" style="margin-bottom:0">Cancelar</button>
      <button class="cd-btn cd-btn-primary" id="cd-editor-insert" style="margin-bottom:0">Insertar</button>
    </div>`;
    
    pane.innerHTML = formHtml;
    document.getElementById('cd-editor-back').addEventListener('click', hideEditor);
    document.getElementById('cd-editor-cancel').addEventListener('click', hideEditor);
    document.getElementById('cd-editor-insert').addEventListener('click', insertFromEditor);

    const container = document.getElementById('cd-form-container');

    const addField = (id, label, val, isHtml = false) => {
      return `<div class="cd-field">
        <label class="cd-label">${label}</label>
        ${isHtml 
          ? `<div id="${id}" class="cd-textarea cd-editable" contenteditable="true" style="overflow-y:auto; background:rgba(0,0,0,0.2);">${val}</div>`
          : `<input type="text" id="${id}" class="cd-input" value="${val}">`
        }
      </div>`;
    };

    const addSelect = (id, label, opts) => {
      return `<div class="cd-field">
        <label class="cd-label">${label}</label>
        <select id="${id}" class="cd-select">
          ${opts.map(o => `<option value="${o.id}">${o.label}</option>`).join('')}
        </select>
      </div>`;
    };

    let h = '';
    const optsConfig = COMPONENT_OPTIONS[type];
    if (optsConfig && optsConfig.variants) {
      h += addSelect('f-variant', optsConfig.label, optsConfig.variants);
    }
    if (optsConfig && optsConfig.isProgress) {
      const pctMatch = (d.title || '').match(/(\d+)\s*%/);
      h += addField('f-pct', 'Porcentaje (0-100)', pctMatch ? pctMatch[1] : '70');
      h += addField('f-label', 'Etiqueta', d.title.replace(/\d+\s*%/, '').trim() || 'Progreso');
    }

    if (['hero', 'banner', 'card', 'alert', 'blockquote'].includes(type)) {
      h += addField('f-title', 'Título / Texto', d.title || '');
      if (type !== 'banner' && type !== 'blockquote') {
         h += addField('f-body', 'Cuerpo / Descripción', d.body || '', true);
      }
      if (type === 'card') {
         h += addField('f-image', 'URL de Imagen (Opcional)', '');
      }
    } else if (['button', 'badge'].includes(type)) {
      h += addField('f-title', 'Texto', d.title || 'Botón');
      if (type === 'button') h += addField('f-href', 'Enlace URL', d.href || '#');
    } else if (['accordion', 'listgroup', 'navbar', 'breadcrumb', 'btngroup', 'dropdown', 'cardgrid'].includes(type)) {
      if (type === 'accordion') {
         h += addField('f-title', 'Título General (opcional)', d.title || '');
      }
      if (type === 'navbar' || type === 'dropdown') {
         h += addField('f-title', type === 'navbar' ? 'Marca / Título' : 'Título del Menú', d.items[0]?.label || '');
      }

      h += `<div class="cd-field"><label class="cd-label">Elementos</label><div id="cd-item-list" class="cd-item-list"></div></div>
            <button class="cd-btn cd-btn-secondary" id="cd-add-item">+ Añadir Ítem</button>`;
    } else if (type === 'progress') {
       // handled by optsConfig
    } else if (type === 'pagination') {
       h += `<div class="cd-hint">La paginación se insertará con estilo por defecto y 5 páginas.</div>`;
    }

    const styleKey = type === 'cardgrid' ? 'card' : (type === 'btngroup' ? 'button' : type);
    const compStyles = CD.getLib()[styleKey] || {};
    if (Object.keys(compStyles).length > 0) {
      h += `<details class="cd-custom-styles" style="margin-top:16px; border:1px solid var(--cd-border); border-radius:8px; background:rgba(0,0,0,0.1);">
        <summary style="padding:10px; font-weight:600; cursor:pointer; font-size:12px; outline:none;">⚙️ Estilos de este elemento</summary>
        <div style="padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">`;
      for (const [sKey, sVal] of Object.entries(compStyles)) {
        if (typeof sVal !== 'string') continue;
        const isColor = /^#[0-9a-fA-F]{3,8}$/.test(sVal.trim()) || sKey.toLowerCase().includes('color') || sKey.toLowerCase().includes('background');
        
        if (isColor) {
           h += `<div class="cd-field" style="margin-bottom:0;">
             <label class="cd-label" style="font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${sKey}">${sKey}</label>
             <div class="cd-color-row">
               <input type="color" class="cd-color-swatch cd-style-override-swatch" data-key="${sKey}" value="${sVal}">
               <input type="text" class="cd-color-hex cd-style-override" data-key="${sKey}" value="${sVal}">
             </div>
           </div>`;
        } else {
           h += `<div class="cd-field" style="margin-bottom:0;">
             <label class="cd-label" style="font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${sKey}">${sKey}</label>
             <input type="text" class="cd-input cd-style-override" data-key="${sKey}" value="${sVal}" style="padding:6px; font-size:11px;">
           </div>`;
        }
      }
      h += `</div></details>`;
    }

    container.innerHTML = h;

    const listEl = document.getElementById('cd-item-list');
    if (listEl) {
      const renderItems = () => {
        let itemsHtml = '';
        let loopItems = d.items;
        if (type === 'navbar' || type === 'dropdown') loopItems = d.items.slice(1);
        if (loopItems.length === 0) loopItems = [{label: 'Opción 1', subBody: ''}];
        
        loopItems.forEach((it, i) => {
          itemsHtml += `<div class="cd-item-editor" data-idx="${i}">
            <button class="cd-item-remove" title="Eliminar">✖</button>
            <input type="text" class="cd-input cd-item-label" placeholder="Título" value="${it.label || ''}" style="margin-bottom:6px">
            ${['accordion', 'cardgrid'].includes(type) ? `<div class="cd-textarea cd-editable cd-item-body" contenteditable="true" style="overflow-y:auto; background:rgba(0,0,0,0.2);" placeholder="Cuerpo">${it.subBody || ''}</div>` : ''}
            ${type === 'cardgrid' ? `<input type="text" class="cd-input cd-item-image" placeholder="URL de Imagen (Opcional)" value="" style="margin-top:6px">` : ''}
            ${type === 'breadcrumb' ? `<input type="text" class="cd-input cd-item-href" placeholder="URL" value="${it.href || '#'}">` : ''}
          </div>`;
        });
        listEl.innerHTML = itemsHtml;
        
        listEl.querySelectorAll('.cd-item-remove').forEach((btn, idx) => {
          btn.addEventListener('click', () => {
             loopItems.splice(idx, 1);
             if (type === 'navbar' || type === 'dropdown') d.items = [d.items[0], ...loopItems];
             else d.items = loopItems;
             renderItems();
             updateLivePreview();
          });
        });
      };
      renderItems();

      document.getElementById('cd-add-item').addEventListener('click', () => {
         let loopItems = (type === 'navbar' || type === 'dropdown') ? d.items.slice(1) : d.items;
         loopItems.push({label: 'Nuevo Ítem', subBody: ''});
         if (type === 'navbar' || type === 'dropdown') d.items = [d.items[0], ...loopItems];
         else d.items = loopItems;
         renderItems();
         updateLivePreview();
      });
    }

    // Color Pickers Sync
    document.querySelectorAll('.cd-style-override-swatch').forEach(swatch => {
      const hexInput = document.querySelector(`.cd-style-override[data-key="${swatch.dataset.key}"]`);
      if (!hexInput) return;
      
      const setColor = (val) => {
         updateLivePreview();
      };
      
      const initVal = hexInput.value || '#ffffff';
      if (/^#[0-9a-fA-F]{6}$/i.test(initVal.trim())) {
        swatch.value = initVal.trim();
      }
      
      swatch.addEventListener('input', () => {
        hexInput.value = swatch.value;
        setColor(swatch.value);
      });
      hexInput.addEventListener('input', () => {
        const v = hexInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/i.test(v)) { swatch.value = v; setColor(v); }
      });
    });

    // Attach preview updates to inputs
    pane.addEventListener('input', (e) => {
       if (e.target.matches('input, select, textarea, [contenteditable]')) {
          updateLivePreview();
       }
    });

    updateLivePreview();
  }

  function updateLivePreview() {
    const previewBox = document.getElementById('cd-live-preview');
    if (!previewBox) return;
    const finalHtml = generateComponentHtml();
    previewBox.innerHTML = finalHtml || '<span style="color:var(--cd-text-dim);font-size:13px;font-style:italic">Vista previa...</span>';
  }

  function generateComponentHtml() {
    const type = currentEditorType;
    let lib = CD.getLib();

    const styleKey = type === 'cardgrid' ? 'card' : (type === 'btngroup' ? 'button' : type);
    const overrides = Array.from(document.querySelectorAll('.cd-style-override'));
    if (overrides.length > 0) {
      lib = JSON.parse(JSON.stringify(lib));
      if (!lib[styleKey]) lib[styleKey] = {};
      overrides.forEach(input => {
        lib[styleKey][input.dataset.key] = input.value;
      });
    }
    const vEl = document.getElementById('f-variant');
    const variant = vEl ? vEl.value : null;

    let finalHtml = '';
    
    const gTitle = document.getElementById('f-title')?.value || '';
    const bodyEl = document.getElementById('f-body');
    const gBody  = bodyEl ? (bodyEl.tagName === 'DIV' ? bodyEl.innerHTML : bodyEl.value) : '';
    const gImage = document.getElementById('f-image')?.value || '';
    const gHref  = document.getElementById('f-href')?.value || '#';
    const gPct   = document.getElementById('f-pct')?.value || 70;
    const gLabel = document.getElementById('f-label')?.value || '';

    let gItems = [];
    const listEl = document.getElementById('cd-item-list');
    if (listEl) {
       listEl.querySelectorAll('.cd-item-editor').forEach(el => {
         const bodyEl = el.querySelector('.cd-item-body');
         gItems.push({
           label: el.querySelector('.cd-item-label')?.value || '',
           subBody: bodyEl ? (bodyEl.tagName === 'DIV' ? bodyEl.innerHTML : bodyEl.value) : '',
           href: el.querySelector('.cd-item-href')?.value || '#',
           imageSrc: el.querySelector('.cd-item-image')?.value || ''
         });
       });
    }

    switch (type) {
      case 'hero': finalHtml = CD.makeHero(gTitle || 'Título del Héroe', gBody || 'Subtítulo', lib); break;
      case 'banner': finalHtml = CD.makeBanner(gTitle || 'Texto', lib); break;
      case 'card': finalHtml = CD.makeCard(gTitle || 'Título', gBody || 'Contenido', lib, gImage); break;
      case 'button': {
        const b = lib.button, ty = lib.typography;
        const link = gHref;
        const display = gTitle || 'Botón';
        if (variant === 'outlined') {
          const s = `background:transparent;color:${b.background};border-radius:${b.borderRadius};padding:${b.padding};font-size:${b.fontSize};font-weight:${b.fontWeight};text-decoration:none;display:inline-block;font-family:${ty.bodyFont};border:2px solid ${b.background}`;
          finalHtml = `<a href="${link}" style="${s}">${display}</a>`;
        } else if (variant === 'pill') {
          const s = `background:${b.background};color:${b.color};border-radius:50px;padding:${b.padding};font-size:${b.fontSize};font-weight:${b.fontWeight};text-decoration:none;display:inline-block;font-family:${ty.bodyFont}`;
          finalHtml = `<a href="${link}" style="${s}">${display}</a>`;
        } else {
          finalHtml = CD.makeButton(display, link, lib);
        }
        break;
      }
      case 'alert': finalHtml = CD.makeAlert(gTitle || gBody, variant || 'info', lib); break;
      case 'badge': {
        const pl = lib.palette, ty = lib.typography;
        const colors = { primary: pl.primary, secondary: pl.secondary, accent: pl.accent, success: '#10b981' };
        const bg = colors[variant] || pl.primary;
        finalHtml = `<span style="background:${bg};color:#fff;border-radius:20px;padding:3px 10px;font-size:0.78em;font-weight:600;display:inline-block;font-family:${ty.bodyFont};line-height:1.5">${gTitle || 'Insignia'}</span>`;
        break;
      }
      case 'progress': finalHtml = CD.makeProgress(gLabel || 'Progreso', parseInt(gPct) || 70, lib); break;
      case 'blockquote': finalHtml = CD.makeBlockquote(gTitle || 'Texto destacado para la cita', lib); break;
      case 'accordion': {
        if (gItems.length > 1 || (gItems.length === 1 && gTitle)) {
          finalHtml = gItems.map(i => CD.makeAccordion(i.label || 'Título', i.subBody || '<p>Contenido</p>', lib)).join('');
        } else {
          const i = gItems[0];
          finalHtml = CD.makeAccordion(i?.label || gTitle || 'Título del acordeón', i?.subBody || gBody || '<p>Contenido</p>', lib); 
        }
        break;
      }
      case 'listgroup': finalHtml = CD.makeListGroup(gItems.length ? gItems.map(i=>i.label) : [gTitle], lib); break;
      case 'navbar': finalHtml = CD.makeNavBar(gTitle || 'Marca', gItems.map(i=>i.label), lib); break;
      case 'breadcrumb': finalHtml = CD.makeBreadcrumb(gItems.map(i=>({label:i.label, href:i.href})), lib); break;
      case 'pagination': finalHtml = CD.makePagination(2, 5, lib); break;
      case 'btngroup': finalHtml = CD.makeButtonGroup(gItems.length ? gItems.map(i=>i.label) : ['A', 'B'], lib); break;
      case 'dropdown': finalHtml = CD.makeDropdown(gTitle || 'Menú', gItems.map(i=>i.label), lib); break;
      case 'cardgrid': finalHtml = CD.makeCardGrid(gItems.map(i=>({title: i.label, body: i.subBody, imageSrc: i.imageSrc})), lib); break;
    }

    return finalHtml;
  }

  async function insertFromEditor() {
    let finalHtml = generateComponentHtml();
    
    if (!finalHtml) return;

    try {
      if (type === 'accordion' || type === 'dropdown') {
        finalHtml = finalHtml.replace(/<details/g, '<details class="cd-temp-insertion"');
      }
      await CD.bridgeCall('REPLACE_SELECTION', { html: finalHtml });
      hideEditor();
      setStatus('✅ ' + CD.t('done'), 'ok');
    } catch (e) {
      setStatus(CD.t('aiError'), 'error');
    }
  }

  // ── Instant Insertion (Magic Wand) ──────────────────────────────────────
  async function applyInstantComponent(type) {
    const res = await new Promise(resolve => chrome.runtime.sendMessage({ type: 'GET_STYLE_LIBRARY' }, resolve));
    if (res?.library) CD.setLib(res.library);

    const lib = CD.getLib();
    let sel;
    try { sel = await CD.bridgeCall('GET_SELECTION'); } catch (e) { return setStatus(CD.t('noEditor'), 'error'); }

    const text  = sel?.text?.trim() || '';
    const html  = sel?.content || '';
    
    const parsed = parseSmartSelection(html, text);
    const { title, body, items } = parsed;
    const href = CD.extractHrefFromHTML(html) || parsed.links[0]?.href || '#';

    let result = '';

    const getInstantItems = () => {
      if (['listgroup', 'navbar', 'breadcrumb', 'btngroup', 'dropdown'].includes(type) && items.length === 1 && items[0].subBody) {
         const sub = getSubLines(items[0].subBody);
         if (sub.length > 0) return sub.map(s => ({label: s, href: '#', subBody: ''}));
      }
      return items;
    };

    const instItems = getInstantItems();

    switch (type) {
      case 'hero': result = CD.makeHero(title || 'Título', body || 'Subtítulo', lib); break;
      case 'banner': result = CD.makeBanner(text || 'Texto', lib); break;
      case 'card': result = CD.makeCard(title || 'Título', body || 'Contenido', lib, ''); break;
      case 'button': result = CD.makeButton(title || 'Botón', href, lib); break;
      case 'alert': result = CD.makeAlert(html || text || 'Alerta', 'info', lib); break;
      case 'badge': result = CD.makeBadge(title || 'Insignia', lib); break;
      case 'progress': {
        const pctMatch = text.match(/(\d+)\s*%/);
        const pct = pctMatch ? parseInt(pctMatch[1]) : 70;
        const label = title.replace(/\d+\s*%/, '').trim() || 'Progreso';
        result = CD.makeProgress(label, pct, lib);
        break;
      }
      case 'blockquote': result = CD.makeBlockquote(html || text || 'Cita', lib); break;
      case 'accordion': {
        if (instItems.length > 1 || (instItems.length === 1 && title && instItems[0].label !== title)) {
          result = instItems.map(i => CD.makeAccordion(i.label || 'Título', i.subBody || '<p>Contenido</p>', lib)).join('');
        } else {
          result = CD.makeAccordion(title || 'Título', body || '<p>Contenido</p>', lib);
        }
        break;
      }
      case 'listgroup': result = CD.makeListGroup(instItems.map(i=>i.label), lib); break;
      case 'navbar': {
        const brand = instItems[0]?.label || 'Marca';
        const navLinks = instItems.slice(1).map(i=>i.label);
        result = CD.makeNavBar(brand, navLinks.length ? navLinks : ['Inicio'], lib); 
        break;
      }
      case 'breadcrumb': result = CD.makeBreadcrumb(instItems, lib); break;
      case 'pagination': result = CD.makePagination(2, 5, lib); break;
      case 'btngroup': result = CD.makeButtonGroup(instItems.map(i=>i.label), lib); break;
      case 'dropdown': {
        const dTitle = instItems[0]?.label || 'Menú';
        const dLinks = instItems.slice(1).map(i=>i.label);
        result = CD.makeDropdown(dTitle, dLinks.length ? dLinks : ['Opción 1'], lib);
        break;
      }
      case 'cardgrid': result = CD.makeCardGrid(instItems.map(i=>({title: i.label, body: i.subBody, imageSrc: ''})), lib); break;
    }

    if (!result) return;

    try {
      if (type === 'accordion' || type === 'dropdown') {
        result = result.replace(/<details/g, '<details class="cd-temp-insertion"');
      }
      await CD.bridgeCall('REPLACE_SELECTION', { html: result });
      if (!html && ['dropdown', 'card', 'hero', 'accordion'].includes(type)) {
        setStatus('💡 Tip: Selecciona texto antes de añadir este componente', 'ok');
      } else {
        setStatus('✅ ' + CD.t('done'), 'ok');
      }
    } catch (e) {
      setStatus(CD.t('aiError'), 'error');
    }
  }

  // ── Smart Selection Parsing ───────────────────────────────────────────────
  function parseSmartSelection(html, fallbackText) {
    if (!html) {
      const t = fallbackText.trim() || 'Texto de ejemplo';
      return { title: t, body: '', items: [{label: t, href: '#', subBody: ''}], links: [] };
    }

    if (!/<[a-z][\s\S]*>/i.test(html)) {
      html = html.split('\n').map(l => `<p>${l}</p>`).join('');
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

    // Strategy 0: Plus/Minus Syntax (+ Título \n - Cuerpo)
    let hasPlusMinus = false;
    let pmItems = [];
    let pmCurrent = null;
    
    root.childNodes.forEach(node => {
      let text = node.textContent.trim();
      if (!text) return;

      if (text.startsWith('+')) {
        hasPlusMinus = true;
        if (pmCurrent) pmItems.push(pmCurrent);
        
        let label = text.replace(/^\s*\+\s*/, '').trim();
        let href = '#';
        if (node.nodeType === 1) { 
           const a = node.querySelector('a');
           if (a) href = a.getAttribute('href') || '#';
        }
        pmCurrent = { label, href, subBody: '' };
      } else if (text.startsWith('-') && pmCurrent) {
        let htmlContent = '';
        if (node.nodeType === 1) {
          let clone = node.cloneNode(true);
          const walk = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT, null, false);
          let firstText = walk.nextNode();
          if (firstText) {
             firstText.nodeValue = firstText.nodeValue.replace(/^\s*-?\s*/, '');
          }
          htmlContent = clone.innerHTML.trim();
        } else {
          htmlContent = text.replace(/^\s*-?\s*/, '');
        }
        pmCurrent.subBody += (pmCurrent.subBody ? '<br>' : '') + htmlContent;
      } else if (pmCurrent) {
         let htmlContent = node.nodeType === 1 ? node.innerHTML.trim() : text;
         pmCurrent.subBody += (pmCurrent.subBody ? '<br>' : '') + htmlContent;
      }
    });
    if (pmCurrent) pmItems.push(pmCurrent);

    if (hasPlusMinus && pmItems.length > 0) {
      return { 
        title: pmItems[0].label, 
        body: pmItems[0].subBody || '', 
        items: pmItems, 
        links 
      };
    }

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
    let heading = root.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      title = heading.textContent.trim();
      const clone = root.cloneNode(true);
      const hClone = clone.querySelector(heading.tagName);
      if (hClone) hClone.remove();
      bodyHtml = clone.innerHTML.trim();
      if (!bodyHtml.replace(/<[^>]+>/g, '').trim()) bodyHtml = ''; 
    } else {
      // Strategy 3: Just paragraphs or lines
      const firstChild = root.firstElementChild;
      if (firstChild) {
        title = firstChild.textContent.trim();
        const clone = root.cloneNode(true);
        if (clone.firstElementChild) clone.firstElementChild.remove();
        bodyHtml = clone.innerHTML.trim();
      } else {
        const lines = fallbackText.split('\n').map(s=>s.trim()).filter(Boolean);
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
          items.push({ label: text, href: a ? (a.getAttribute('href') || '#') : '#', subBody: b.innerHTML.trim() });
        }
      });
    } else {
      const lines = fallbackText.split('\n').map(s=>s.trim()).filter(Boolean);
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
      `<div style="position:relative; display:flex;">
         <button class="cd-transform-btn${hasOpts?' has-opts':''}" data-type="${type}" title="${CD.t(key)}" style="flex:1;">
           <span class="cd-icon">${icon}</span>
           <span>${CD.t(key)}</span>
           ${hasOpts ? '<span class="cd-opts-arrow">▾</span>' : ''}
         </button>
         <button class="cd-instant-btn" data-type="${type}" title="Inserción Rápida" style="position:absolute; top:4px; right:4px; background:none; border:none; cursor:pointer; font-size:12px; opacity:0.6; padding:4px;">🪄</button>
       </div>`;

    return `
<div id="canvas-designer-panel" class="${s.theme === 'light' ? 'cd-light-theme' : ''}">
  <div id="cd-header">
    <div class="cd-logo">🎨 Canvas Designer</div>
    <div>
      <button id="cd-theme-btn" title="Cambiar Tema" style="background:none;border:none;cursor:pointer;font-size:16px;margin-right:8px;color:inherit;">${s.theme === 'light' ? '🌙' : '☀️'}</button>
      <button id="cd-lang-btn">${s.lang === 'es' ? 'EN' : 'ES'}</button>
    </div>
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

    </div>

    <!-- EDITOR TAB -->
    <div class="cd-tab-pane" id="cd-pane-editor"></div>


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

    document.getElementById('cd-theme-btn')?.addEventListener('click', () => {
      const s = CD.getSettings();
      s.theme = s.theme === 'light' ? 'dark' : 'light';
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
        showEditor(type);
      });
    });

    document.querySelectorAll('.cd-instant-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.dataset.type;
        applyInstantComponent(type);
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
