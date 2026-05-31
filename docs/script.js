const i18n = {
  es: {
    nav_features: "Características",
    nav_install: "Instalación",
    hero_badge: "🚀 Versión Beta 1.0.0",
    hero_title: "Crea diseños increíbles en <span class='highlight'>Canvas LMS</span>",
    hero_subtitle: "Una extensión para profesores y diseñadores instruccionales. Añade tarjetas, botones, acordeones y más a tu contenido en segundos sin saber programar.",
    hero_btn_download: "Descargar ZIP (v1.0.0)",
    hero_btn_guide: "Guía de Instalación",
    mockup_title: "Constructor Visual",
    mockup_btn: "Añadir Componente ✨",
    feat_title: "Diseñado para educadores",
    feat_1_title: "15+ Componentes",
    feat_1_desc: "Tarjetas, héroes, acordeones, barras de progreso y más, listos para insertar en tu Rich Content Editor.",
    feat_2_title: "Totalmente Personalizable",
    feat_2_desc: "Ajusta colores, tamaños, bordes y fuentes usando el potente panel de diseño integrado en tu navegador.",
    feat_3_title: "Plantillas Ilimitadas",
    feat_3_desc: "Guarda tus combinaciones favoritas como plantillas, expórtalas y compártelas con tus colegas.",
    feat_4_title: "100% Seguro y Privado",
    feat_4_desc: "Funciona offline. No requiere servidores externos ni bases de datos. Todo se guarda en tu propio navegador.",
    inst_title: "Cómo instalar la Beta (Modo Desarrollador)",
    inst_desc: "Ya que la extensión aún no está en la Chrome Web Store, puedes instalarla manualmente siguiendo estos 4 sencillos pasos:",
    step_1_title: "Descarga y Descomprime",
    step_1_desc: "Descarga el archivo <strong>.zip</strong> usando el botón de arriba y extráelo (descomprímelo) en una carpeta de tu computadora que no vayas a borrar.",
    step_2_title: "Abre las Extensiones",
    step_2_desc: "En tu navegador Chrome (o Edge/Brave), escribe <code>chrome://extensions/</code> en la barra de direcciones y presiona Enter.",
    step_3_title: "Activa el Modo Desarrollador",
    step_3_desc: "En la esquina superior derecha de la pantalla, activa el interruptor que dice <strong>\"Modo de desarrollador\"</strong> (Developer mode).",
    step_4_title: "Carga la Extensión",
    step_4_desc: "Haz clic en el botón <strong>\"Cargar sin empaquetar\"</strong> (Load unpacked) que aparecerá arriba a la izquierda. Selecciona la carpeta que descomprimiste en el paso 1.",
    inst_success: "🎉 <strong>¡Listo!</strong> Abre cualquier página de tu editor en Canvas LMS y verás un nuevo botón flotante \"✨\" en la esquina inferior derecha.",
    footer_copy: "&copy; 2026 Canvas Designer — Desarrollado por <a href='https://www.linkedin.com/in/pablogguizar' target='_blank'>Pablo G. Guízar</a>. Código abierto bajo licencia MIT disponible en GitHub.",
    footer_src: "Repositorio (Código Fuente)",
    footer_bug: "Reportar un Error"
  },
  en: {
    nav_features: "Features",
    nav_install: "Installation",
    hero_badge: "🚀 Beta Version 1.0.0",
    hero_title: "Create amazing designs in <span class='highlight'>Canvas LMS</span>",
    hero_subtitle: "An extension for teachers and instructional designers. Add cards, buttons, accordions, and more to your content in seconds without coding.",
    hero_btn_download: "Download ZIP (v1.0.0)",
    hero_btn_guide: "Installation Guide",
    mockup_title: "Visual Builder",
    mockup_btn: "Add Component ✨",
    feat_title: "Designed for educators",
    feat_1_title: "15+ Components",
    feat_1_desc: "Cards, heroes, accordions, progress bars and more, ready to insert into your Rich Content Editor.",
    feat_2_title: "Fully Customizable",
    feat_2_desc: "Adjust colors, sizes, borders, and fonts using the powerful design panel integrated into your browser.",
    feat_3_title: "Unlimited Templates",
    feat_3_desc: "Save your favorite combinations as templates, export them, and share them with colleagues.",
    feat_4_title: "100% Secure and Private",
    feat_4_desc: "Works offline. No external servers or databases required. Everything is saved in your own browser.",
    inst_title: "How to install the Beta (Developer Mode)",
    inst_desc: "Since the extension is not yet in the Chrome Web Store, you can install it manually by following these 4 simple steps:",
    step_1_title: "Download and Extract",
    step_1_desc: "Download the <strong>.zip</strong> file using the button above and extract it to a folder on your computer that you won't delete.",
    step_2_title: "Open Extensions",
    step_2_desc: "In your Chrome (or Edge/Brave) browser, type <code>chrome://extensions/</code> in the address bar and press Enter.",
    step_3_title: "Enable Developer Mode",
    step_3_desc: "In the top right corner of the screen, toggle the switch that says <strong>\"Developer mode\"</strong>.",
    step_4_title: "Load Extension",
    step_4_desc: "Click the <strong>\"Load unpacked\"</strong> button that will appear on the top left. Select the folder you extracted in step 1.",
    inst_success: "🎉 <strong>Done!</strong> Open any page of your editor in Canvas LMS and you will see a new floating \"✨\" button in the bottom right corner.",
    footer_copy: "&copy; 2026 Canvas Designer — Developed by <a href='https://www.linkedin.com/in/pablogguizar' target='_blank'>Pablo G. Guízar</a>. Open source under MIT license available on GitHub.",
    footer_src: "Repository (Source Code)",
    footer_bug: "Report an Issue"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply initial hidden state and observe elements
  const animateElements = document.querySelectorAll('.feature-card, .step, .install-wrapper h2, .install-desc');
  animateElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    observer.observe(el);
  });

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  let currentTheme = localStorage.getItem('theme') || 'dark';
  
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      themeToggle.textContent = '🌙';
    } else {
      document.body.removeAttribute('data-theme');
      themeToggle.textContent = '☀️';
    }
    localStorage.setItem('theme', theme);
  };
  
  applyTheme(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });

  // --- Language Toggle ---
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('lang') || 'es';

  const applyLang = (lang) => {
    document.documentElement.lang = lang;
    langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });
    localStorage.setItem('lang', lang);
  };

  applyLang(currentLang);

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyLang(currentLang);
  });
});
