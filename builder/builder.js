// Canvas Designer — Style Builder JS

// ── Default library ─────────────────────────────────────────────────────────
const DEFAULT = {
  version: '1.0',
  palette: {
    primary: '#000000', secondary: '#4b5563', accent: '#6b7280',
    background: '#ffffff', surface: '#ffffff', text: '#111827', textLight: '#6b7280',
  },
  typography: {
    headingFont: 'system-ui, sans-serif', bodyFont: 'system-ui, sans-serif',
    baseSize: '16px', lineHeight: '1.5',
  },
  hero: {
    background: '#f3f4f6', color: '#111827', padding: '60px 40px', textAlign: 'left',
    borderRadius: '0px', minHeight: '200px', titleSize: '2.5em',
    subtitleColor: '#4b5563', subtitleSize: '1.25em', backgroundImage: '',
  },
  banner: {
    background: '#f9fafb', color: '#111827',
    borderLeft: '4px solid #111827', padding: '16px 20px',
    borderRadius: '0px', fontSize: '1em', fontWeight: 'normal',
  },
  card: {
    background: '#ffffff', border: '1px solid #e5e7eb',
    borderRadius: '0px', padding: '24px',
    titleColor: '#111827', textColor: '#4b5563', titleSize: '1.25em',
  },
  button: {
    background: '#000000', color: '#ffffff', borderRadius: '0px',
    padding: '10px 24px', fontSize: '1em', fontWeight: 'normal',
    border: '1px solid #000000', textDecoration: 'none', display: 'inline-block',
  },
  accordion: {
    summaryBackground: '#f9fafb', summaryColor: '#111827',
    summaryPadding: '12px 16px', contentBackground: '#ffffff', contentColor: '#4b5563',
    contentPadding: '16px', border: '1px solid #e5e7eb',
    borderRadius: '0px', fontWeight: 'bold',
  },
  blockquote: {
    borderLeft: '4px solid #111827', background: '#ffffff',
    color: '#4b5563', padding: '16px 20px', fontStyle: 'italic',
    borderRadius: '0px',
  },
  table: {
    headerBackground: '#f3f4f6', headerColor: '#111827',
    rowBackground: '#ffffff', altRowBackground: '#f9fafb',
    border: '1px solid #e5e7eb', cellPadding: '12px 16px',
  },
  alert: {
    infoBackground: '#eff6ff', infoColor: '#1e40af', infoBorderColor: '#3b82f6',
    successBackground: '#f0fdf4', successColor: '#166534', successBorderColor: '#22c55e',
    warningBackground: '#fffbeb', warningColor: '#92400e', warningBorderColor: '#f59e0b',
    dangerBackground: '#fff1f2', dangerColor: '#9f1239', dangerBorderColor: '#f43f5e',
    borderRadius: '8px',
  },
  badge: {
    background: '', color: '#ffffff',
    borderRadius: '20px', padding: '3px 10px', fontSize: '0.78em',
  },
  dropdown: {
    menuBackground: '#ffffff', itemColor: '#111827', borderRadius: '8px',
  },
  listgroup: {
    evenBackground: '#ffffff', oddBackground: '#f9fafb',
    color: '#111827', borderRadius: '8px', padding: '11px 16px',
  },
  progress: {
    colorFrom: '', colorTo: '',
    trackBackground: '#e2e8f0', height: '10px', borderRadius: '8px',
  },
  navbar: {
    background: '', brandColor: '', linkColor: '',
    borderRadius: '10px', padding: '12px 20px',
  },
  breadcrumb: {
    linkColor: '', separatorColor: '#9ca3af',
    activeColor: '', separator: '/',
  },
  pagination: {
    activeBackground: '', activeColor: '#ffffff',
    inactiveBackground: '#f1f5f9', inactiveColor: '',
    borderRadius: '6px',
  },
};

// ── Modern Theme ────────────────────────────────────────────────────────────
const MODERN_THEME = {
  version: '1.0',
  palette: {
    primary: '#4f46e5', secondary: '#8b5cf6', accent: '#06b6d4',
    background: '#f8fafc', surface: '#ffffff', text: '#0f172a', textLight: '#64748b',
  },
  typography: {
    headingFont: '"Outfit", "Inter", system-ui, sans-serif', bodyFont: '"Inter", system-ui, sans-serif',
    baseSize: '16px', lineHeight: '1.6',
  },
  hero: {
    background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)', color: '#ffffff', padding: '80px 40px', textAlign: 'center',
    borderRadius: '16px', minHeight: '300px', titleSize: '3em',
    subtitleColor: 'rgba(255,255,255,0.9)', subtitleSize: '1.25em', backgroundImage: '',
  },
  banner: {
    background: '#e0e7ff', color: '#3730a3',
    borderLeft: '4px solid #4f46e5', padding: '16px 20px',
    borderRadius: '12px', fontSize: '1em', fontWeight: '500',
  },
  card: {
    background: '#ffffff', border: '1px solid #e2e8f0',
    borderRadius: '16px', padding: '24px',
    titleColor: '#1e293b', textColor: '#475569', titleSize: '1.25em',
  },
  button: {
    background: '#4f46e5', color: '#ffffff', borderRadius: '100px',
    padding: '12px 28px', fontSize: '1em', fontWeight: '600',
    border: 'none', textDecoration: 'none', display: 'inline-block',
  },
  accordion: {
    summaryBackground: '#f8fafc', summaryColor: '#1e293b',
    summaryPadding: '16px 20px', contentBackground: '#ffffff', contentColor: '#475569',
    contentPadding: '20px', border: '1px solid #e2e8f0',
    borderRadius: '12px', fontWeight: '600',
  },
  blockquote: {
    borderLeft: '4px solid #8b5cf6', background: '#f5f3ff',
    color: '#4c1d95', padding: '20px 24px', fontStyle: 'italic',
    borderRadius: '0 12px 12px 0',
  },
  table: {
    headerBackground: '#f8fafc', headerColor: '#475569',
    rowBackground: '#ffffff', altRowBackground: '#f8fafc',
    border: '1px solid #e2e8f0', cellPadding: '16px 20px',
  },
  alert: {
    infoBackground: '#eff6ff', infoColor: '#1e40af', infoBorderColor: '#bfdbfe',
    successBackground: '#f0fdf4', successColor: '#166534', successBorderColor: '#bbf7d0',
    warningBackground: '#fffbeb', warningColor: '#92400e', warningBorderColor: '#fde68a',
    dangerBackground: '#fef2f2', dangerColor: '#991b1b', dangerBorderColor: '#fecaca',
    borderRadius: '12px',
  },
  badge: {
    background: '#4f46e5', color: '#ffffff',
    borderRadius: '100px', padding: '4px 12px', fontSize: '0.75em',
  },
  dropdown: {
    menuBackground: '#ffffff', itemColor: '#1e293b', borderRadius: '12px',
  },
  listgroup: {
    evenBackground: '#ffffff', oddBackground: '#f8fafc',
    color: '#1e293b', borderRadius: '12px', padding: '12px 20px',
  },
  progress: {
    colorFrom: '#4f46e5', colorTo: '#8b5cf6',
    trackBackground: '#e2e8f0', height: '12px', borderRadius: '100px',
  },
  navbar: {
    background: 'linear-gradient(90deg, #1e293b, #0f172a)', brandColor: '#ffffff', linkColor: 'rgba(255,255,255,0.8)',
    borderRadius: '16px', padding: '16px 24px',
  },
  breadcrumb: {
    linkColor: '#4f46e5', separatorColor: '#94a3b8',
    activeColor: '#1e293b', separator: '›',
  },
  pagination: {
    activeBackground: '#4f46e5', activeColor: '#ffffff',
    inactiveBackground: '#f8fafc', inactiveColor: '#475569',
    borderRadius: '8px',
  },
};

// ── i18n ────────────────────────────────────────────────────────────────────
const I18N = {
  es: {
    save: 'Guardar librería', reset: 'Restablecer', preview: 'Vista previa — Página de Canvas',
    tabPalette: '🎨 Paleta', tabTypo: 'Aa Tipografía', tabComp: '⊞ Componentes',
    sub: 'Constructor de Estilos', saved: '¡Librería guardada!', resetDone: 'Valores restablecidos.',
    tplActual: 'Plantilla Actual',
    saveNew: 'Guardar como nueva',
    deleteTpl: 'Eliminar plantilla',
    exportBtn: '⬇️ Exportar',
    exportTitle: 'Descargar plantilla JSON',
    importBtn: '⬆️ Importar',
    importTitle: 'Cargar plantilla JSON',
    changeTheme: 'Cambiar Tema',
    headingFont: 'Fuente de títulos',
    bodyFont: 'Fuente de cuerpo',
    baseSize: 'Tamaño base',
    lineHeight: 'Interlineado',
    compHero: 'Héroe',
    compBanner: 'Banner',
    compAlert: 'Alertas',
    compBadge: 'Insignias (Badges)',
    compCard: 'Tarjeta',
    compButton: 'Botón',
    compDropdown: 'Desplegable',
    compAccordion: 'Acordeón',
    compListgroup: 'Lista de grupo',
    compProgress: 'Barras de progreso',
    compNavbar: 'Barra de navegación',
    compBreadcrumb: 'Migas de pan',
    compPagination: 'Paginación',
    compBlockquote: 'Cita destacada',
    compTable: 'Tabla',
    fieldBackground: 'Fondo',
    fieldBgImage: 'Imagen de Fondo (URL)',
    fieldTextColor: 'Color texto',
    fieldPadding: 'Padding',
    fieldBorderRadius: 'Border-radius',
    fieldTextAlignment: 'Alineación texto',
    fieldTitleSize: 'Tamaño título',
    fieldSubtitleColor: 'Color subtítulo',
    fieldSubtitleSize: 'Tamaño subtítulo',
    fieldBorderLeft: 'Borde izquierdo',
    fieldFontSize: 'Tamaño fuente',
    fieldFontWeight: 'Grosor fuente',
    fieldBorderColor: 'Color borde',
    fieldBorder: 'Borde',
    fieldTitleColor: 'Color título',
    fieldMenuBg: 'Fondo menú',
    fieldItemColor: 'Color texto ítem',
    fieldMenuBorderRadius: 'Border-radius menú',
    fieldSummaryBg: 'Fondo cabecera',
    fieldSummaryColor: 'Color texto cabecera',
    fieldContentBg: 'Fondo contenido',
    fieldContentColor: 'Color texto contenido',
    fieldEvenBg: 'Fondo ítem par',
    fieldOddBg: 'Fondo ítem impar',
    fieldItemPadding: 'Padding ítem',
    fieldColorFrom: 'Color inicio gradiente',
    fieldColorTo: 'Color fin gradiente',
    fieldTrackBg: 'Fondo pista',
    fieldHeight: 'Altura (px)',
    fieldBrandColor: 'Color marca',
    fieldLinkColor: 'Color enlaces',
    fieldLinkColorSingle: 'Color enlace',
    fieldSeparatorColor: 'Color separador',
    fieldActiveColor: 'Color actual',
    fieldSeparator: 'Separador',
    fieldActiveBg: 'Fondo activo',
    fieldActiveTextColor: 'Color texto activo',
    fieldInactiveBg: 'Fondo inactivo',
    fieldInactiveTextColor: 'Color texto inactivo',
    fieldTableHeaderBg: 'Fondo encabezado',
    fieldTableHeaderColor: 'Color texto encabezado',
    fieldTableAltRowBg: 'Fila alterna',
    alignCenter: 'Centro',
    alignLeft: 'Izquierda',
    alignRight: 'Derecha',
    confirmReset: '¿Restablecer al estilo por defecto? Perderás los cambios no guardados.',
    prHeroTitle: 'Bienvenidos al Módulo 1',
    prHeroSub: 'Explora los conceptos fundamentales de esta unidad',
    prBannerText: '📌 Completa todas las actividades antes del viernes.',
    prAlertInfo: 'Esta es una alerta informativa.',
    prAlertSucc: 'La actividad fue entregada correctamente.',
    prAlertWarn: 'La fecha límite vence mañana.',
    prAlertDang: 'No se pudo procesar tu entrega.',
    prBadgeNew: 'Nuevo',
    prBadgeFeatured: 'Destacado',
    prBadgeSoon: 'Próximamente',
    prBadgeDone: 'Completado',
    prCard1Title: '📖 Lectura',
    prCard1Text: 'Revisa el material de apoyo antes de la sesión.',
    prCard2Title: '🎥 Video',
    prCard2Text: 'Mira el video introductorio de 12 minutos.',
    prCard3Title: '✍️ Tarea',
    prCard3Text: 'Entrega tu reflexión antes del domingo.',
    prBtnMain: 'Botón principal',
    prBtnSec: 'Botón secundario',
    prOptA: 'Opción A',
    prOptB: 'Opción B',
    prOptC: 'Opción C',
    prSelectMod: 'Seleccionar módulo ▾',
    prMod1Intro: 'Módulo 1 — Introducción',
    prMod2Dev: 'Módulo 2 — Desarrollo',
    prMod3End: 'Módulo 3 — Cierre',
    prAcc1Title: '¿Cómo entrego la tarea?',
    prAcc1Body: '<p>Ve a la sección "Tareas" en el menú lateral y sube tu archivo.</p>',
    prAcc2Title: '¿Puedo entregar después de la fecha límite?',
    prAcc2Body: '<p>Las entregas tardías tienen una penalización del 20%.</p>',
    prLg1: '📘 Módulo 1 — Introducción al curso',
    prLg2: '📗 Módulo 2 — Conceptos fundamentales',
    prLg3: '📙 Módulo 3 — Aplicación práctica',
    prLg4: '📕 Módulo 4 — Evaluación final',
    prProg1: 'Módulo 1 completado',
    prProg2: 'Módulo 2 en progreso',
    prProg3: 'Módulo 3 pendiente',
    prBrandText: '🎓 Mi Curso',
    prHome: 'Inicio',
    prModules: 'Módulos',
    prResources: 'Recursos',
    prContact: 'Contacto',
    prLesson3: 'Lección 3',
    prQuote: '"El aprendizaje no es producto del docente, sino del alumno que actúa con responsabilidad."',
    prThWeek: 'Semana',
    prThTopic: 'Tema',
    prThDeliver: 'Entrega',
    prTdIntro: 'Introducción',
    prTdForum: 'Foro inicial',
    prTdConcepts: 'Conceptos clave',
    prTdQuiz: 'Cuestionario',
    prTdApp: 'Aplicación',
    prTdProject: 'Proyecto'
  },
  en: {
    save: 'Save library', reset: 'Reset', preview: 'Preview — Canvas Page',
    tabPalette: '🎨 Palette', tabTypo: 'Aa Typography', tabComp: '⊞ Components',
    sub: 'Style Builder', saved: 'Library saved!', resetDone: 'Values reset.',
    tplActual: 'Current Template',
    saveNew: 'Save as new',
    deleteTpl: 'Delete template',
    exportBtn: '⬇️ Export',
    exportTitle: 'Download JSON template',
    importBtn: '⬆️ Import',
    importTitle: 'Load JSON template',
    changeTheme: 'Toggle Theme',
    headingFont: 'Heading font',
    bodyFont: 'Body font',
    baseSize: 'Base size',
    lineHeight: 'Line height',
    compHero: 'Hero',
    compBanner: 'Banner',
    compAlert: 'Alerts',
    compBadge: 'Badges',
    compCard: 'Card',
    compButton: 'Button',
    compDropdown: 'Dropdown',
    compAccordion: 'Accordion',
    compListgroup: 'List Group',
    compProgress: 'Progress Bars',
    compNavbar: 'Navigation Bar',
    compBreadcrumb: 'Breadcrumbs',
    compPagination: 'Pagination',
    compBlockquote: 'Featured Quote',
    compTable: 'Table',
    fieldBackground: 'Background',
    fieldBgImage: 'Background Image (URL)',
    fieldTextColor: 'Text color',
    fieldPadding: 'Padding',
    fieldBorderRadius: 'Border radius',
    fieldTextAlignment: 'Text alignment',
    fieldTitleSize: 'Title size',
    fieldSubtitleColor: 'Subtitle color',
    fieldSubtitleSize: 'Subtitle size',
    fieldBorderLeft: 'Left border',
    fieldFontSize: 'Font size',
    fieldFontWeight: 'Font weight',
    fieldBorderColor: 'Border color',
    fieldBorder: 'Border',
    fieldTitleColor: 'Title color',
    fieldMenuBg: 'Menu background',
    fieldItemColor: 'Item text color',
    fieldMenuBorderRadius: 'Menu border radius',
    fieldSummaryBg: 'Summary background',
    fieldSummaryColor: 'Summary text color',
    fieldContentBg: 'Content background',
    fieldContentColor: 'Content text color',
    fieldEvenBg: 'Even item background',
    fieldOddBg: 'Odd item background',
    fieldItemPadding: 'Item padding',
    fieldColorFrom: 'Gradient start color',
    fieldColorTo: 'Gradient end color',
    fieldTrackBg: 'Track background',
    fieldHeight: 'Height (px)',
    fieldBrandColor: 'Brand color',
    fieldLinkColor: 'Links color',
    fieldLinkColorSingle: 'Link color',
    fieldSeparatorColor: 'Separator color',
    fieldActiveColor: 'Current color',
    fieldSeparator: 'Separator',
    fieldActiveBg: 'Active background',
    fieldActiveTextColor: 'Active text color',
    fieldInactiveBg: 'Inactive background',
    fieldInactiveTextColor: 'Inactive text color',
    fieldTableHeaderBg: 'Header background',
    fieldTableHeaderColor: 'Header text color',
    fieldTableAltRowBg: 'Alternate row',
    alignCenter: 'Center',
    alignLeft: 'Left',
    alignRight: 'Right',
    confirmReset: 'Reset to default style? You will lose any unsaved changes.',
    prHeroTitle: 'Welcome to Module 1',
    prHeroSub: 'Explore the fundamental concepts of this unit',
    prBannerText: '📌 Complete all activities before Friday.',
    prAlertInfo: 'This is an informational alert.',
    prAlertSucc: 'The activity was successfully submitted.',
    prAlertWarn: 'The deadline is tomorrow.',
    prAlertDang: 'Your submission could not be processed.',
    prBadgeNew: 'New',
    prBadgeFeatured: 'Featured',
    prBadgeSoon: 'Upcoming',
    prBadgeDone: 'Completed',
    prCard1Title: '📖 Reading',
    prCard1Text: 'Review the support material before the session.',
    prCard2Title: '🎥 Video',
    prCard2Text: 'Watch the 12-minute introductory video.',
    prCard3Title: '✍️ Assignment',
    prCard3Text: 'Submit your reflection before Sunday.',
    prBtnMain: 'Primary Button',
    prBtnSec: 'Secondary Button',
    prOptA: 'Option A',
    prOptB: 'Option B',
    prOptC: 'Option C',
    prSelectMod: 'Select module ▾',
    prMod1Intro: 'Module 1 — Introduction',
    prMod2Dev: 'Module 2 — Development',
    prMod3End: 'Module 3 — Closing',
    prAcc1Title: 'How do I submit the assignment?',
    prAcc1Body: '<p>Go to the "Assignments" section in the side menu and upload your file.</p>',
    prAcc2Title: 'Can I submit after the deadline?',
    prAcc2Body: '<p>Late submissions have a 20% penalty.</p>',
    prLg1: '📘 Module 1 — Introduction to the course',
    prLg2: '📗 Module 2 — Fundamental concepts',
    prLg3: '📙 Module 3 — Practical application',
    prLg4: '📕 Module 4 — Final evaluation',
    prProg1: 'Module 1 completed',
    prProg2: 'Module 2 in progress',
    prProg3: 'Module 3 pending',
    prBrandText: '🎓 My Course',
    prHome: 'Home',
    prModules: 'Modules',
    prResources: 'Resources',
    prContact: 'Contact',
    prLesson3: 'Lesson 3',
    prQuote: '"Learning is not a product of teaching, but of the learner acting responsibly."',
    prThWeek: 'Week',
    prThTopic: 'Topic',
    prThDeliver: 'Submission',
    prTdIntro: 'Introduction',
    prTdForum: 'Initial forum',
    prTdConcepts: 'Key concepts',
    prTdQuiz: 'Quiz',
    prTdApp: 'Application',
    prTdProject: 'Project'
  }
};

let lang = 'es';
const t = (k) => I18N[lang][k] ?? I18N.en[k] ?? k;

// ── State ────────────────────────────────────────────────────────────────────
let lib = JSON.parse(JSON.stringify(DEFAULT));

// ── Helpers ──────────────────────────────────────────────────────────────────
function css(o) {
  return Object.entries(o).filter(([, v]) => v != null && v !== '').map(([k, v]) => `${k}:${String(v).replace(/"/g, "'")}`).join(';');
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function deep(o) { return JSON.parse(JSON.stringify(o)); }

// Deep-merge: starts from a full copy of defaults, then overlays saved values.
// Skips empty/null values in saved so defaults are preserved for new keys.
function deepMerge(defaults, target) {
  const out = deep(defaults);
  for (const key of Object.keys(target)) {
    const tVal = target[key];
    const oVal = out[key];
    if (oVal && typeof oVal === 'object' && tVal && typeof tVal === 'object') {
      // Merge at key level: saved value wins only when non-empty
      for (const subKey of Object.keys(tVal)) {
        if (tVal[subKey] !== null && tVal[subKey] !== '') {
          oVal[subKey] = tVal[subKey];
        }
      }
    } else if (tVal !== null && tVal !== undefined) {
      out[key] = tVal;
    }
  }
  return out;
}

// ── Storage ──────────────────────────────────────────────────────────────────
async function loadLib() {
  return new Promise(res => {
    chrome.runtime.sendMessage({ type: 'GET_STYLE_LIBRARY' }, r => {
      // Merge saved library with DEFAULT so new component sections are always present
      const saved = r?.library;
      res(saved ? deepMerge(DEFAULT, saved) : deep(DEFAULT));
    });
  });
}
async function saveLib() {
  return new Promise(res => {
    chrome.runtime.sendMessage({ type: 'SAVE_STYLE_LIBRARY', library: lib }, r => res(r?.ok));
  });
}
async function loadSettings() {
  return new Promise(res => {
    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, r => res(r?.settings || {}));
  });
}

// ── Templates Manager ────────────────────────────────────────────────────────
let templates = [];
let currentTemplateId = 'default';

async function loadTemplates() {
  return new Promise(res => {
    chrome.runtime.sendMessage({ type: 'GET_TEMPLATES' }, r => res(r?.templates || []));
  });
}
async function saveTemplatesData() {
  return new Promise(res => {
    chrome.runtime.sendMessage({ type: 'SAVE_TEMPLATES', templates }, r => res(r?.ok));
  });
}

function renderTemplateSelect() {
  const select = document.getElementById('ctrl-template-select');
  if (!select) return;
  select.innerHTML = '';
  templates.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    select.appendChild(opt);
  });
  select.value = currentTemplateId;
  const delBtn = document.getElementById('btn-delete-tpl');
  if (delBtn) delBtn.style.display = templates.length > 1 ? 'inline-block' : 'none';
}

function applyLibToUI() {
  // Re-populate all inputs
  document.querySelectorAll('[id^="ctrl-"]').forEach(el => {
    if (el.id === 'ctrl-template-select' || el.id === 'ctrl-global-borderRadius') return;
    const parts = el.id.replace('ctrl-', '').split('-');
    const section = parts[0];
    const key = parts.slice(1).join('-').replace(/-range$/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (!lib[section]) return;
    if (el.tagName === 'SELECT' || el.type !== 'color') {
      const val = lib[section]?.[key];
      if (val !== undefined) {
        if (el.type === 'range') {
          el.value = parseFloat(val) || 16;
          const display = document.getElementById(`val-${section === 'typography' ? key : section + '-' + key}`);
          if (display) display.textContent = val;
        } else {
          el.value = val;
          // Synchronize the associated color picker if it exists
          const picker = document.getElementById(el.id + '-picker');
          if (picker && typeof val === 'string' && /^#[0-9a-f]{6}$/i.test(val.trim())) {
            picker.value = val.trim();
          }
        }
      }
    }
  });
  renderPaletteTab();
  renderPreview();
}

// ── Preview renderer ─────────────────────────────────────────────────────────
function renderPreview() {
  const h = lib.hero;
  const bn = lib.banner;
  const c = lib.card;
  const bt = lib.button;
  const a = lib.accordion;
  const bq = lib.blockquote;
  const tb = lib.table;
  const ty = lib.typography;
  const pl = lib.palette;

  const pageStyle = css({
    'font-family': ty.bodyFont,
    'font-size': ty.baseSize,
    'line-height': ty.lineHeight,
    'color': pl.text,
    'background': pl.background,
    'padding': '32px',
  });

  let heroBgStyle = `background:${h.background};`;
  if (h.backgroundImage) {
    heroBgStyle = `background: url('${esc(h.backgroundImage)}') center/cover no-repeat, ${h.background};`;
  }
  const heroStyle = css({
    'text-align': h.textAlign,
    'border-radius': h.borderRadius,
    'min-height': h.minHeight,
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': h.textAlign === 'center' ? 'center' : 'flex-start',
    'margin-bottom': '28px',
    'padding': h.padding,
  });
  const heroInnerStyle = css({
    'background': h.backgroundImage ? 'rgba(255,255,255,0.85)' : 'transparent',
    'padding': h.backgroundImage ? '20px' : '0',
    'border-radius': h.borderRadius
  });
  const heroTitleStyle = css({
    'color': h.color, 'font-size': h.titleSize, 'font-family': ty.headingFont,
    'font-weight': '700', 'margin': '0 0 10px', 'line-height': '1.2',
  });
  const heroSubStyle = css({
    'color': h.subtitleColor, 'font-size': h.subtitleSize, 'margin': '0', 'font-family': ty.bodyFont,
  });

  const bannerStyle = css({
    'background': bn.background, 'color': bn.color, 'border-left': bn.borderLeft,
    'padding': bn.padding, 'border-radius': bn.borderRadius,
    'font-size': bn.fontSize, 'font-weight': bn.fontWeight,
    'font-family': ty.bodyFont, 'margin-bottom': '24px',
  });

  const gridStyle = css({ 'display': 'flex', 'flex-wrap': 'wrap', 'gap': '16px', 'margin-bottom': '28px' });
  const cardStyle = css({
    'background': c.background,
    'border': c.border, 'border-radius': c.borderRadius, 'flex': '1', 'min-width': '160px',
  });
  const cardInnerStyle = css({ 'padding': c.padding });
  const radiusTop = c.borderRadius === '0px' ? '0px' : `calc(${c.borderRadius} - 1px) calc(${c.borderRadius} - 1px) 0 0`;
  const imgHtml1 = `<img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400&h=200" alt="" style="width:100%;height:auto;display:block;border-radius:${radiusTop};border-bottom:${c.border}">`;
  const imgHtml2 = ``; // No image
  const imgHtml3 = `<img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=200" alt="" style="width:100%;height:auto;display:block;border-radius:${radiusTop};border-bottom:${c.border}">`;
  const cardTitleStyle = css({ 'color': c.titleColor, 'font-size': c.titleSize, 'font-family': ty.headingFont, 'font-weight': '600', 'margin': '0 0 8px' });
  const cardTextStyle = css({ 'color': c.textColor, 'font-family': ty.bodyFont, 'margin': '0', 'font-size': '0.9em' });

  const btnStyle = css({
    'background': bt.background, 'color': bt.color, 'border-radius': bt.borderRadius,
    'padding': bt.padding, 'font-size': bt.fontSize, 'font-weight': bt.fontWeight,
    'text-decoration': 'none', 'display': 'inline-block', 'font-family': ty.bodyFont,
  });

  const detailsStyle = css({ 'border': a.border, 'border-radius': a.borderRadius, 'margin-bottom': '8px', 'overflow': 'hidden' });
  const summaryStyle = css({
    'background': a.summaryBackground, 'color': a.summaryColor, 'padding': a.summaryPadding,
    'font-weight': a.fontWeight, 'font-family': ty.headingFont, 'cursor': 'pointer', 'display': 'block',
  });
  const summaryBodyStyle = css({ 'background': a.contentBackground, 'color': a.contentColor || pl.text, 'padding': a.contentPadding, 'font-family': ty.bodyFont });

  const bqStyle = css({
    'border-left': bq.borderLeft, 'background': bq.background, 'color': bq.color,
    'padding': bq.padding, 'font-style': bq.fontStyle, 'border-radius': bq.borderRadius,
    'margin-bottom': '24px', 'font-family': ty.bodyFont,
  });

  const tableStyle = css({ 'width': '100%', 'border-collapse': 'collapse', 'font-family': ty.bodyFont, 'font-size': '0.9em', 'margin-bottom': '24px' });
  const thStyle = css({ 'background': tb.headerBackground, 'color': tb.headerColor, 'padding': tb.cellPadding, 'text-align': 'left', 'font-weight': '600', 'border': tb.border });
  const tdStyle = css({ 'padding': tb.cellPadding, 'border': tb.border, 'background': tb.rowBackground, 'color': pl.text });
  const tdAltStyle = css({ 'padding': tb.cellPadding, 'border': tb.border, 'background': tb.altRowBackground, 'color': pl.text });

  const h2Style = css({ 'color': pl.text, 'font-family': ty.headingFont, 'font-size': '1.5em', 'margin': '0 0 16px', 'font-weight': '700' });
  const h3Style = css({ 'color': pl.text, 'font-family': ty.headingFont, 'font-size': '1.15em', 'margin': '0 0 12px', 'font-weight': '600' });
  const dividerStyle = css({ 'border': 'none', 'border-top': `2px solid ${pl.accent}`, 'margin': '28px 0', 'opacity': '0.25' });

  /* ── Inline styles for new components ── */
  const al = lib.alert || DEFAULT.alert;
  const bg = lib.badge || DEFAULT.badge;
  const dd = lib.dropdown || DEFAULT.dropdown;
  const lg = lib.listgroup || DEFAULT.listgroup;
  const pr = lib.progress || DEFAULT.progress;
  const nb = lib.navbar || DEFAULT.navbar;
  const bc = lib.breadcrumb || DEFAULT.breadcrumb;
  const pg = lib.pagination || DEFAULT.pagination;

  const alertInfoStyle = css({ background: al.infoBackground, color: al.infoColor, border: `1px solid ${al.infoBorderColor}`, 'border-left': `4px solid ${al.infoBorderColor}`, 'border-radius': al.borderRadius, padding: '14px 16px', margin: '10px 0', 'font-family': ty.bodyFont, 'line-height': ty.lineHeight });
  const alertSuccStyle = css({ background: al.successBackground, color: al.successColor, border: `1px solid ${al.successBorderColor}`, 'border-left': `4px solid ${al.successBorderColor}`, 'border-radius': al.borderRadius, padding: '14px 16px', margin: '10px 0', 'font-family': ty.bodyFont });
  const alertWarnStyle = css({ background: al.warningBackground, color: al.warningColor, border: `1px solid ${al.warningBorderColor}`, 'border-left': `4px solid ${al.warningBorderColor}`, 'border-radius': al.borderRadius, padding: '14px 16px', margin: '10px 0', 'font-family': ty.bodyFont });
  const alertDangStyle = css({ background: al.dangerBackground, color: al.dangerColor, border: `1px solid ${al.dangerBorderColor}`, 'border-left': `4px solid ${al.dangerBorderColor}`, 'border-radius': al.borderRadius, padding: '14px 16px', margin: '10px 0', 'font-family': ty.bodyFont });
  const badgeStyle = css({ background: pl.primary, color: '#fff', 'border-radius': bg.borderRadius, padding: bg.padding, 'font-size': bg.fontSize, 'font-weight': '600', display: 'inline-block', 'font-family': ty.bodyFont, 'line-height': '1.5', margin: '2px' });
  const badge2Style = css({ background: pl.secondary, color: '#fff', 'border-radius': bg.borderRadius, padding: bg.padding, 'font-size': bg.fontSize, 'font-weight': '600', display: 'inline-block', 'font-family': ty.bodyFont, 'line-height': '1.5', margin: '2px' });
  const badge3Style = css({ background: pl.accent, color: '#fff', 'border-radius': bg.borderRadius, padding: bg.padding, 'font-size': bg.fontSize, 'font-weight': '600', display: 'inline-block', 'font-family': ty.bodyFont, 'line-height': '1.5', margin: '2px' });
  const badge4Style = css({ background: '#10b981', color: '#fff', 'border-radius': bg.borderRadius, padding: bg.padding, 'font-size': bg.fontSize, 'font-weight': '600', display: 'inline-block', 'font-family': ty.bodyFont, 'line-height': '1.5', margin: '2px' });
  const btnGrpWrap = css({ display: 'inline-flex', 'border-radius': bt.borderRadius, overflow: 'hidden', border: `1px solid ${bt.background}` });
  const btnGrpItem = (sep) => css({ background: bt.background, color: bt.color, padding: bt.padding, 'font-size': bt.fontSize, 'font-weight': bt.fontWeight, 'text-decoration': 'none', display: 'inline-block', 'font-family': ty.bodyFont }) + (sep ? `;border-left:1px solid rgba(255,255,255,0.25)` : '');
  const dropDetails = css({ display: 'inline-block', position: 'relative', margin: '8px 0' });
  const dropSummary = css({ background: bt.background, color: bt.color, 'border-radius': bt.borderRadius, padding: bt.padding, 'font-size': bt.fontSize, 'font-weight': bt.fontWeight, 'font-family': ty.bodyFont, cursor: 'pointer', 'list-style': 'none', display: 'inline-block' });
  const dropMenu = css({ background: dd.menuBackground, border: '1px solid #e2e8f0', 'border-radius': dd.borderRadius, margin: '4px 0', overflow: 'hidden', 'min-width': '160px' });
  const dropItem = css({ display: 'block', padding: '9px 16px', color: dd.itemColor || pl.text || '#1e293b', 'text-decoration': 'none', 'font-family': ty.bodyFont, 'font-size': '0.9em', 'border-bottom': '1px solid #f1f5f9' });
  const lgStyle = css({ 'list-style': 'none', padding: '0', margin: '12px 0', border: '1px solid #e2e8f0', 'border-radius': lg.borderRadius, overflow: 'hidden' });
  const lgItem = (alt) => css({ padding: lg.padding, 'border-bottom': '1px solid #f1f5f9', background: alt ? lg.oddBackground : lg.evenBackground, 'font-family': ty.bodyFont, color: lg.color || pl.text || '#111827', 'font-size': '0.95em' });
  const navStyle = css({ background: nb.background || pl.primary, 'border-radius': nb.borderRadius, padding: nb.padding, display: 'flex', 'align-items': 'center', gap: '8px', margin: '16px 0', 'flex-wrap': 'wrap' });
  const navBrand = css({ color: nb.brandColor || '#fff', 'font-weight': '700', 'font-size': '1.05em', 'text-decoration': 'none', 'font-family': ty.headingFont, 'margin-right': 'auto' });
  const navLink = css({ color: nb.linkColor || 'rgba(255,255,255,0.8)', 'text-decoration': 'none', 'font-size': '0.9em', 'font-family': ty.bodyFont, padding: '4px 10px', 'border-radius': '6px' });
  const breadStyle = css({ display: 'flex', 'align-items': 'center', 'flex-wrap': 'wrap', gap: '4px', margin: '12px 0', 'font-family': ty.bodyFont, 'font-size': '0.9em' });
  const breadLink = css({ color: bc.linkColor || pl.primary, 'text-decoration': 'none', 'font-weight': '500' });
  const breadSep = css({ color: bc.separatorColor });
  const pgNav = css({ display: 'flex', 'justify-content': 'center', gap: '5px', margin: '16px 0', 'font-family': ty.bodyFont });
  const pgBase = css({ 'border-radius': pg.borderRadius, padding: '7px 13px', 'font-size': '0.9em', 'text-decoration': 'none', 'font-weight': '500', display: 'inline-block' });
  const pgActive = `${pgBase};background:${pg.activeBackground || pl.primary};color:${pg.activeColor || '#fff'};border:1px solid ${pg.activeBackground || pl.primary}`;
  const pgInactive = `${pgBase};background:${pg.inactiveBackground};color:${pg.inactiveColor || pl.text};border:1px solid #e2e8f0`;

  const html = `<div style="${pageStyle}">

  <h2 style="${h2Style}">① ${t('compHero')}</h2>
  <div style="${heroStyle};${heroBgStyle}">
    <div style="${heroInnerStyle}">
      <h2 style="${heroTitleStyle}">${t('prHeroTitle')}</h2>
      <p style="${heroSubStyle}">${t('prHeroSub')}</p>
    </div>
  </div>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">② ${t('compBanner')}</h2>
  <div style="${bannerStyle}"><p style="margin:0">${t('prBannerText')}</p></div>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">③ ${t('compAlert')}</h2>
  <div style="${alertInfoStyle}"><strong>ℹ️ Info:</strong> ${t('prAlertInfo')}</div>
  <div style="${alertSuccStyle}"><strong>✅ ${t('alignCenter')}:</strong> ${t('prAlertSucc')}</div>
  <div style="${alertWarnStyle}"><strong>⚠️ ${t('compAlert')}:</strong> ${t('prAlertWarn')}</div>
  <div style="${alertDangStyle}"><strong>🚫 Error:</strong> ${t('prAlertDang')}</div>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">④ ${t('compBadge')}</h2>
  <p><span style="${badgeStyle}">${t('prBadgeNew')}</span> <span style="${badge2Style}">${t('prBadgeFeatured')}</span> <span style="${badge3Style}">${t('prBadgeSoon')}</span> <span style="${badge4Style}">${t('prBadgeDone')}</span></p>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑤ ${t('compCard')}</h2>
  <div style="${gridStyle}">
    <div style="${cardStyle}">${imgHtml1}<div style="${cardInnerStyle}"><h3 style="${cardTitleStyle}">${t('prCard1Title')}</h3><p style="${cardTextStyle}">${t('prCard1Text')}</p></div></div>
    <div style="${cardStyle}">${imgHtml2}<div style="${cardInnerStyle}"><h3 style="${cardTitleStyle}">${t('prCard2Title')}</h3><p style="${cardTextStyle}">${t('prCard2Text')}</p></div></div>
    <div style="${cardStyle}">${imgHtml3}<div style="${cardInnerStyle}"><h3 style="${cardTitleStyle}">${t('prCard3Title')}</h3><p style="${cardTextStyle}">${t('prCard3Text')}</p></div></div>
  </div>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑥ ${t('compButton')}</h2>
  <p style="margin-bottom:12px">
    <a href="#" style="${btnStyle}">${t('prBtnMain')}</a>
    &nbsp;
    <a href="#" style="${css({ background: 'transparent', color: bt.background, 'border-radius': bt.borderRadius, padding: bt.padding, 'font-size': bt.fontSize, 'font-weight': bt.fontWeight, 'text-decoration': 'none', display: 'inline-block', 'font-family': ty.bodyFont, border: `2px solid ${bt.background}` })}">${t('prBtnSec')}</a>
  </p>
  <p>
    <div style="${btnGrpWrap}">
      <a href="#" style="${btnGrpItem(false)}">${t('prOptA')}</a>
      <a href="#" style="${btnGrpItem(true)}">${t('prOptB')}</a>
      <a href="#" style="${btnGrpItem(true)}">${t('prOptC')}</a>
    </div>
  </p>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑦ ${t('compDropdown')}</h2>
  <details style="${dropDetails}">
    <summary style="${dropSummary}">${t('prSelectMod')}</summary>
    <div style="${dropMenu}">
      <a href="#" style="${dropItem}">${t('prMod1Intro')}</a>
      <a href="#" style="${dropItem}">${t('prMod2Dev')}</a>
      <a href="#" style="${dropItem}">${t('prMod3End')}</a>
    </div>
  </details>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑧ ${t('compAccordion')}</h2>
  <details style="${detailsStyle}" open>
    <summary style="${summaryStyle}">${t('prAcc1Title')}</summary>
    <div style="${summaryBodyStyle}">${t('prAcc1Body')}</div>
  </details>
  <details style="${detailsStyle}">
    <summary style="${summaryStyle}">${t('prAcc2Title')}</summary>
    <div style="${summaryBodyStyle}">${t('prAcc2Body')}</div>
  </details>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑨ ${t('compListgroup')}</h2>
  <ul style="${lgStyle}">
    <li style="${lgItem(false)}">${t('prLg1')}</li>
    <li style="${lgItem(true)}">${t('prLg2')}</li>
    <li style="${lgItem(false)}">${t('prLg3')}</li>
    <li style="${lgItem(true)}">${t('prLg4')}</li>
  </ul>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑩ ${t('compProgress')}</h2>
  ${[`${t('prProg1')}:100`, `${t('prProg2')}:60`, `${t('prProg3')}:0`].map(s => {
    const [lbl, p] = s.split(':');
    const pct = parseInt(p);
    const trackStyle2 = `background:${pr.trackBackground};border-radius:${pr.borderRadius};height:${pr.height};overflow:hidden;width:100%`;
    const fillStyle2 = `background:linear-gradient(90deg,${pr.colorFrom || pl.primary},${pr.colorTo || pl.secondary});width:${pct}%;height:${pr.height};border-radius:${pct >= 100 ? pr.borderRadius : `calc(${pr.borderRadius}) 0 0 calc(${pr.borderRadius})`};display:block`;
    return `<div style="margin:14px 0;font-family:${ty.bodyFont}"><table style="width:100%;border-collapse:collapse;margin-bottom:5px"><tbody><tr><td style="font-size:0.9em;font-weight:600;color:${pl.text};text-align:left;padding:0;border:none;background:none">${lbl}</td><td style="font-size:0.9em;font-weight:600;color:${pl.text};text-align:right;padding:0;border:none;background:none">${pct}%</td></tr></tbody></table><div style="${trackStyle2}"><div style="${fillStyle2}">&nbsp;</div></div></div>`;
  }).join('')}

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑪ ${t('compNavbar')}</h2>
  <nav style="${navStyle}">
    <a href="#" style="${navBrand}">${t('prBrandText')}</a>
    <a href="#" style="${navLink}">${t('prHome')}</a>
    <a href="#" style="${navLink}">${t('compPagination')}</a>
    <a href="#" style="${navLink}">${t('prResources')}</a>
    <a href="#" style="${navLink}">${t('prContact')}</a>
  </nav>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑫ ${t('compBreadcrumb')}</h2>
  <nav style="${breadStyle}">
    <a href="#" style="${breadLink}">${t('prHome')}</a>
    <span style="${breadSep}"> ${bc.separator} </span>
    <a href="#" style="${breadLink}">${t('prLg2').replace(/^[^\s]+\s*/, '')}</a>
    <span style="${breadSep}"> ${bc.separator} </span>
    <span style="color:${bc.activeColor || pl.text};font-weight:600">${t('prLesson3')}</span>
  </nav>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑬ ${t('compPagination')}</h2>
  <nav style="${pgNav}">
    <a href="#" style="${pgInactive}">‹</a>
    <a href="#" style="${pgInactive}">1</a>
    <a href="#" style="${pgActive}">2</a>
    <a href="#" style="${pgInactive}">3</a>
    <a href="#" style="${pgInactive}">4</a>
    <a href="#" style="${pgInactive}">›</a>
  </nav>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑭ ${t('compBlockquote')}</h2>
  <blockquote style="${bqStyle}">
    <p style="margin:0">${t('prQuote')}</p>
    <cite style="display:block;font-style:normal;font-weight:600;margin-top:8px;font-size:0.85em;color:${pl.textLight}">— John Dewey</cite>
  </blockquote>

  <hr style="${dividerStyle}">
  <h2 style="${h2Style}">⑮ ${t('compTable')}</h2>
  <table style="${tableStyle}">
    <thead><tr>
      <th style="${thStyle}">${t('prThWeek')}</th><th style="${thStyle}">${t('prThTopic')}</th><th style="${thStyle}">${t('prThDeliver')}</th>
    </tr></thead>
    <tbody>
      <tr><td style="${tdStyle}">1</td><td style="${tdStyle}">${t('prTdIntro')}</td><td style="${tdStyle}">${t('prTdForum')}</td></tr>
      <tr><td style="${tdAltStyle}">2</td><td style="${tdAltStyle}">${t('prTdConcepts')}</td><td style="${tdAltStyle}">${t('prTdQuiz')}</td></tr>
      <tr><td style="${tdStyle}">3</td><td style="${tdStyle}">${t('prTdApp')}</td><td style="${tdStyle}">${t('prTdProject')}</td></tr>
    </tbody>
  </table>

</div>`;

  document.getElementById('preview-canvas').innerHTML = html;
}

// ── Control binding ───────────────────────────────────────────────────────────
function bindControls() {
  // Generic text inputs: id = ctrl-{section}-{key}
  document.querySelectorAll('[id^="ctrl-"]').forEach(el => {
    if (el.type === 'color') return; // handled separately
    const parts = el.id.replace('ctrl-', '').split('-');
    const section = parts[0];
    const key = parts.slice(1).join('-').replace(/-range$/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    if (!lib[section]) return;

    // Set initial value
    if (el.tagName === 'SELECT') {
      el.value = lib[section][key] || '';
    } else if (el.type === 'range') {
      const numVal = parseFloat(lib[section][key]) || parseFloat(lib.typography[key]) || 16;
      el.value = numVal;
      // Update display
      const display = document.getElementById(`val-${section === 'typography' ? key : section + '-' + key}`);
      if (display) display.textContent = lib[section][key] || numVal;
    } else {
      el.value = lib[section]?.[key] ?? DEFAULT[section]?.[key] ?? '';
    }

    el.addEventListener('input', () => {
      if (!lib[section]) lib[section] = {};
      if (el.type === 'range') {
        const unit = key === 'lineHeight' ? '' : 'px';
        lib[section][key] = el.value + unit;
        const display = document.getElementById(`val-${section === 'typography' ? key : section + '-' + key}`);
        if (display) display.textContent = el.value + unit;
      } else {
        lib[section][key] = el.value;
      }
      renderPreview();
    });
  });

  // Color pickers: sync picker ↔ hex text
  document.querySelectorAll('input[type="color"]').forEach(picker => {
    const hexId = picker.id.replace('-picker', '');
    const hexInput = document.getElementById(hexId);
    if (!hexInput) return;

    // Bind hex → model
    const parts = hexId.replace('ctrl-', '').split('-');
    const section = parts[0];
    const key = parts.slice(1).join('-').replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    const setColor = (val) => {
      if (!lib[section]) lib[section] = {};
      lib[section][key] = val;
      renderPreview();
    };

    const initVal = lib[section]?.[key] || DEFAULT[section]?.[key] || '#ffffff';
    if (/^#[0-9a-fA-F]{6}$/i.test(initVal.trim())) {
      picker.value = initVal.trim();
    }
    hexInput.value = initVal;

    picker.addEventListener('input', () => {
      hexInput.value = picker.value;
      setColor(picker.value);
    });
    hexInput.addEventListener('input', () => {
      const v = hexInput.value.trim();
      if (/^#[0-9a-f]{6}$/i.test(v)) { picker.value = v; setColor(v); }
    });
  });

  // Palette tab (injected dynamically)
  renderPaletteTab();
}

function renderPaletteTab() {
  const grid = document.getElementById('palette-grid');
  if (!grid) return;
  const keys = [
    ['primary', 'Color primario / Primary'], ['secondary', 'Secundario / Secondary'],
    ['accent', 'Acento / Accent'], ['background', 'Fondo / Background'],
    ['surface', 'Superficie / Surface'], ['text', 'Texto / Text'], ['textLight', 'Texto dim / Text dim'],
  ];
  grid.innerHTML = keys.map(([k, label]) => `
    <div class="field" style="grid-column:span 2">
      <div class="field-label"><span>${label}</span><span>${lib.palette[k]}</span></div>
      <div class="color-row">
        <input type="color" id="pal-${k}-picker" value="${lib.palette[k]}">
        <input class="color-hex" id="pal-${k}" type="text" value="${lib.palette[k]}">
      </div>
    </div>`).join('');

  keys.forEach(([k]) => {
    const picker = document.getElementById(`pal-${k}-picker`);
    const hex = document.getElementById(`pal-${k}`);
    const setV = v => { lib.palette[k] = v; renderPreview(); };

    if (/^#[0-9a-fA-F]{6}$/i.test(lib.palette[k])) {
      picker.value = lib.palette[k];
    }

    picker.addEventListener('input', () => { hex.value = picker.value; setV(picker.value); });
    hex.addEventListener('input', () => {
      if (/^#[0-9a-f]{6}$/i.test(hex.value.trim())) { picker.value = hex.value.trim(); setV(hex.value.trim()); }
    });
  });
}

// ── Accordion sections ────────────────────────────────────────────────────────
function bindSections() {
  document.querySelectorAll('.ctrl-section-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      hdr.closest('.ctrl-section').classList.toggle('open');
    });
  });
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function bindTabs() {
  document.querySelectorAll('.ctrl-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ctrl-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.ctrl-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`pane-${tab.dataset.tab}`)?.classList.add('active');
    });
  });
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(msg, type = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = msg; el.className = type;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

// ── Language toggle ───────────────────────────────────────────────────────────
function applyLang() {
  document.getElementById('btn-lang').textContent = `🌐 ${lang === 'es' ? 'EN' : 'ES'}`;
  document.getElementById('lbl-save').textContent = t('save');
  document.getElementById('btn-reset').textContent = `↺ ${t('reset')}`;
  document.getElementById('lbl-preview').textContent = t('preview');
  document.getElementById('hdr-sub').textContent = t('sub');

  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const translation = t(key);
    if (translation !== key) {
      el.textContent = translation;
    }
  });

  // Translate all elements with data-i18n-title attribute
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    const translation = t(key);
    if (translation !== key) {
      el.title = translation;
    }
  });
}

function translatePageOnStart() {
  const dictionaryMap = {
    'Plantilla Actual': 'tplActual',
    'Guardar como nueva': 'saveNew',
    'Eliminar plantilla': 'deleteTpl',
    '⬇️ Exportar': 'exportBtn',
    'Descargar plantilla JSON': 'exportTitle',
    '⬆️ Importar': 'importBtn',
    'Cargar plantilla JSON': 'importTitle',
    'Cambiar Tema': 'changeTheme',
    'Fuente de títulos': 'headingFont',
    'Fuente de cuerpo': 'bodyFont',
    'Tamaño base': 'baseSize',
    'Interlineado': 'lineHeight',
    'Héroe': 'compHero',
    'Banner': 'compBanner',
    'Alertas': 'compAlert',
    'Insignias (Badges)': 'compBadge',
    'Tarjeta': 'compCard',
    'Botón': 'compButton',
    'Desplegable': 'compDropdown',
    'Acordeón': 'compAccordion',
    'Lista de grupo': 'compListgroup',
    'Barras de progreso': 'compProgress',
    'Barra de navegación': 'compNavbar',
    'Migas de pan': 'compBreadcrumb',
    'Paginación': 'compPagination',
    'Cita destacada': 'compBlockquote',
    'Tabla': 'compTable',
    'Fondo': 'fieldBackground',
    'Imagen de Fondo (URL)': 'fieldBgImage',
    'Color texto': 'fieldTextColor',
    'Padding': 'fieldPadding',
    'Border-radius': 'fieldBorderRadius',
    'Alineación texto': 'fieldTextAlignment',
    'Tamaño título': 'fieldTitleSize',
    'Color subtítulo': 'fieldSubtitleColor',
    'Tamaño subtítulo': 'fieldSubtitleSize',
    'Borde izquierdo': 'fieldBorderLeft',
    'Tamaño fuente': 'fieldFontSize',
    'Grosor fuente': 'fieldFontWeight',
    'Color borde': 'fieldBorderColor',
    'Borde': 'fieldBorder',
    'Color título': 'fieldTitleColor',
    'Fondo menú': 'fieldMenuBg',
    'Color texto ítem': 'fieldItemColor',
    'Border-radius menú': 'fieldMenuBorderRadius',
    'Fondo cabecera': 'fieldSummaryBg',
    'Color texto cabecera': 'fieldSummaryColor',
    'Fondo contenido': 'fieldContentBg',
    'Color texto contenido': 'fieldContentColor',
    'Fondo ítem par': 'fieldEvenBg',
    'Fondo ítem impar': 'fieldOddBg',
    'Padding ítem': 'fieldItemPadding',
    'Color inicio gradiente': 'fieldColorFrom',
    'Color fin gradiente': 'fieldColorTo',
    'Fondo pista': 'fieldTrackBg',
    'Altura (px)': 'fieldHeight',
    'Color marca': 'fieldBrandColor',
    'Color enlaces': 'fieldLinkColor',
    'Color enlace': 'fieldLinkColorSingle',
    'Color separador': 'fieldSeparatorColor',
    'Color actual': 'fieldActiveColor',
    'Separador': 'fieldSeparator',
    'Fondo activo': 'fieldActiveBg',
    'Color texto activo': 'fieldActiveTextColor',
    'Fondo inactivo': 'fieldInactiveBg',
    'Color texto inactivo': 'fieldInactiveTextColor',
    'Fondo encabezado': 'fieldTableHeaderBg',
    'Color texto encabezado': 'fieldTableHeaderColor',
    'Fila alterna': 'fieldTableAltRowBg',
    'Centro': 'alignCenter',
    'Izquierda': 'alignLeft',
    'Derecha': 'alignRight'
  };

  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
  while(walk.nextNode()) {
    const el = walk.currentNode;
    if (el.children.length === 0 || el.tagName === 'OPTION' || el.tagName === 'SPAN') {
      const txt = el.textContent.trim();
      if (dictionaryMap[txt]) {
        el.dataset.i18n = dictionaryMap[txt];
      }
    }
    const title = el.getAttribute('title');
    if (title && dictionaryMap[title.trim()]) {
      el.dataset.i18nTitle = dictionaryMap[title.trim()];
    }
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  translatePageOnStart();
  const settings = await new Promise(res =>
    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, r => res(r?.settings || {}))
  );
  if (settings.lang) lang = settings.lang;

  lib = await loadLib();
  templates = await loadTemplates();

  // Patch to fix previously corrupted tpl_modern installations
  const tplModern = templates.find(t => t.id === 'tpl_modern');
  if (tplModern && JSON.stringify(tplModern.lib) === JSON.stringify(DEFAULT)) {
    tplModern.lib = deepMerge(DEFAULT, MODERN_THEME);
    await saveTemplatesData();
    if (JSON.stringify(lib) === JSON.stringify(DEFAULT)) {
      lib = deep(tplModern.lib);
      await saveLib();
    }
  }

  // Patch to fix colors if corrupted to white on white background due to previous bug
  const fixCorruptedColor = (obj, key, bgKey, fallback) => {
    if (obj && obj[key] === '#ffffff' && obj[bgKey] === '#ffffff') obj[key] = fallback;
  };
  templates.forEach(t => {
    fixCorruptedColor(t.lib?.listgroup, 'color', 'evenBackground', '#1e293b');
    fixCorruptedColor(t.lib?.dropdown, 'itemColor', 'menuBackground', '#1e293b');
    fixCorruptedColor(t.lib?.accordion, 'contentColor', 'contentBackground', '#4b5563');
  });
  fixCorruptedColor(lib?.listgroup, 'color', 'evenBackground', '#1e293b');
  fixCorruptedColor(lib?.dropdown, 'itemColor', 'menuBackground', '#1e293b');
  fixCorruptedColor(lib?.accordion, 'contentColor', 'contentBackground', '#4b5563');

  if (templates.length === 0 || (templates.length === 1 && templates[0].id === 'default')) {
    templates = []; // Clear array
    // 1. Guardar la plantilla moderna
    templates.push({ id: 'tpl_modern', name: 'Diseño Moderno', lib: deepMerge(DEFAULT, MODERN_THEME) });
    // 2. Guardar la plantilla negra/recta por defecto
    templates.push({ id: 'tpl_basic', name: 'Minimalista Oscuro', lib: deep(DEFAULT) });
    currentTemplateId = 'tpl_modern';
    lib = deepMerge(DEFAULT, MODERN_THEME);
    await saveTemplatesData();
    await saveLib();
  } else {
    // Attempt to match current lib with a template
    const match = templates.find(t => JSON.stringify(t.lib) === JSON.stringify(lib));
    if (match) currentTemplateId = match.id;
    else currentTemplateId = templates[0].id;
  }

  applyLang();
  bindTabs();
  bindSections();
  bindControls();
  renderPreview();
  renderTemplateSelect();

  document.getElementById('btn-save').addEventListener('click', async () => {
    await saveLib();
    // Update current template
    const idx = templates.findIndex(t => t.id === currentTemplateId);
    if (idx !== -1) {
      templates[idx].lib = deep(lib);
      await saveTemplatesData();
    }
    toast(t('saved'), 'ok');
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm(t('confirmReset'))) {
      lib = JSON.parse(JSON.stringify(DEFAULT));
      document.getElementById('ctrl-template-select').value = 'default';
      currentTemplateId = null;
      renderPreview();
      bindControls();
    }
  });

  // --- Theme Toggle ---
  const btnTheme = document.getElementById('btn-theme');
  let currentTheme = localStorage.getItem('builderTheme') || 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      btnTheme.textContent = '🌙';
    } else {
      document.body.classList.remove('light-theme');
      btnTheme.textContent = '☀️';
    }
    localStorage.setItem('builderTheme', theme);
  };

  applyTheme(currentTheme);

  btnTheme.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });

  // --- Language Toggle ---
  document.getElementById('btn-lang').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    chrome.runtime.sendMessage({ type: 'SAVE_SETTINGS', settings: { ...settings, lang } });
    applyLang();
  });

  // Template Managers Events
  document.getElementById('ctrl-template-select')?.addEventListener('change', (e) => {
    currentTemplateId = e.target.value;
    const tpl = templates.find(t => t.id === currentTemplateId);
    if (tpl) {
      lib = deepMerge(DEFAULT, tpl.lib);
      applyLibToUI();
      saveLib(); // auto-save active
    }
  });

  document.getElementById('btn-save-as')?.addEventListener('click', async () => {
    const name = prompt('Nombre de la nueva plantilla:', 'Mi Plantilla');
    if (!name) return;
    const id = 'tpl_' + Date.now();
    templates.push({ id, name, lib: deep(lib) });
    currentTemplateId = id;
    await saveTemplatesData();
    await saveLib();
    renderTemplateSelect();
    toast('Plantilla creada', 'ok');
  });

  document.getElementById('btn-delete-tpl')?.addEventListener('click', async () => {
    if (templates.length <= 1) return;
    if (!confirm('¿Eliminar esta plantilla?')) return;
    templates = templates.filter(t => t.id !== currentTemplateId);
    currentTemplateId = templates[0].id;
    lib = deepMerge(DEFAULT, templates[0].lib);
    await saveTemplatesData();
    await saveLib();
    renderTemplateSelect();
    applyLibToUI();
    toast('Plantilla eliminada', 'ok');
  });

  // Import / Export
  document.getElementById('btn-export')?.addEventListener('click', () => {
    const tpl = templates.find(t => t.id === currentTemplateId) || { name: 'plantilla', lib };
    const blob = new Blob([JSON.stringify(tpl, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tpl.name.replace(/\\s+/g, '_').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btn-import')?.addEventListener('click', () => {
    document.getElementById('file-import').click();
  });

  document.getElementById('file-import')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.lib) throw new Error('Invalid format');
        const id = 'tpl_' + Date.now();
        templates.push({ id, name: parsed.name || 'Importada', lib: deepMerge(DEFAULT, parsed.lib) });
        currentTemplateId = id;
        lib = deep(templates[templates.length - 1].lib);
        await saveTemplatesData();
        await saveLib();
        renderTemplateSelect();
        applyLibToUI();
        toast('Plantilla importada', 'ok');
      } catch (err) {
        toast('Error al importar', 'error');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });
}

init();
