// Canvas Designer — RCE Bridge (PAGE WORLD)
// Este script se inyecta en el contexto de la página para acceder a window.tinymce.
// Comunica con el content script vía window.postMessage.

(function () {
  const PREFIX = 'CD_BRIDGE_';

  function reply(id, payload) {
    window.postMessage({ type: PREFIX + 'RESPONSE', id, ...payload }, '*');
  }

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    const msg = event.data;
    if (!msg || !msg.type || !msg.type.startsWith(PREFIX + 'REQ_')) return;

    const editor = window.tinymce?.activeEditor;
    const id = msg.id;

    switch (msg.type) {

      case PREFIX + 'REQ_GET_CONTENT':
        if (!editor) return reply(id, { error: 'NO_EDITOR' });
        reply(id, { content: editor.getContent() });
        break;

      case PREFIX + 'REQ_SET_CONTENT':
        if (!editor) return reply(id, { error: 'NO_EDITOR' });
        editor.setContent(msg.html);
        editor.undoManager.add();
        reply(id, { ok: true });
        break;

      case PREFIX + 'REQ_INSERT_CONTENT':
        if (!editor) return reply(id, { error: 'NO_EDITOR' });
        editor.insertContent(msg.html);
        editor.undoManager.add();
        reply(id, { ok: true });
        break;

      case PREFIX + 'REQ_GET_SELECTION':
        if (!editor) return reply(id, { error: 'NO_EDITOR' });
        reply(id, {
          content: editor.selection.getContent({ format: 'html' }),
          text:    editor.selection.getContent({ format: 'text' }),
        });
        break;

      case PREFIX + 'REQ_REPLACE_SELECTION':
        if (!editor) return reply(id, { error: 'NO_EDITOR' });
        
        let finalHtml = msg.html;
        editor.selection.setContent(finalHtml);
        
        // Find the injected elements if they have our temporary class and force them open
        const tempEls = editor.dom.select('.cd-temp-insertion');
        if (tempEls && tempEls.length > 0) {
          tempEls.forEach((el, index) => {
            el.open = true;
            el.setAttribute('open', 'open');
            
            // Also try to place the cursor inside to mimic a real user selection
            if (index === 0) {
              try {
                 const innerDiv = el.querySelector('div');
                 if (innerDiv) {
                   editor.selection.select(innerDiv);
                   editor.selection.collapse(true);
                 }
              } catch(e) {}
            }
            
            editor.dom.removeClass(el, 'cd-temp-insertion');
          });
        }
        
        editor.undoManager.add();
        reply(id, { ok: true });
        break;

      case PREFIX + 'REQ_CHECK_EDITOR':
        reply(id, { active: !!(editor && !editor.isHidden()) });
        break;
    }
  });

  // Signal that the bridge is ready
  window.postMessage({ type: PREFIX + 'READY' }, '*');
})();
