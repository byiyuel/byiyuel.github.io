// Rich Text Editor
class RichTextEditor {
    constructor() {
        this.editor = null;
        this.hiddenTextarea = null;
        this.init();
    }

    init() {
        this.editor = document.getElementById('post-content');
        this.hiddenTextarea = document.getElementById('post-content-hidden');
        
        if (this.editor) {
            this.setupEditor();
            this.setupToolbar();
        }
    }

    setupEditor() {
        // Focus management
        this.editor.addEventListener('focus', () => {
            this.editor.style.borderColor = '#34d399';
            this.editor.style.boxShadow = '0 0 0 3px rgba(52, 211, 153, 0.1)';
        });

        this.editor.addEventListener('blur', () => {
            this.editor.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.editor.style.boxShadow = 'none';
        });

        // Auto-save content to hidden textarea
        this.editor.addEventListener('input', () => {
            this.saveContent();
        });

        // Handle paste events
        this.editor.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            document.execCommand('insertText', false, text);
        });

        // Handle keyboard shortcuts
        this.editor.addEventListener('keydown', (e) => {
            // Ctrl+B for bold
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                this.executeCommand('bold');
            }
            // Ctrl+I for italic
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                this.executeCommand('italic');
            }
            // Ctrl+U for underline
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                this.executeCommand('underline');
            }
        });
    }

    setupToolbar() {
        const toolbar = document.querySelector('.editor-toolbar');
        if (!toolbar) return;

        toolbar.addEventListener('click', (e) => {
            const btn = e.target.closest('.editor-btn');
            if (!btn) return;

            const command = btn.dataset.command;
            const value = btn.dataset.value;

            if (command === 'createLink') {
                this.showLinkModal();
            } else if (command === 'insertImage') {
                this.showImageModal();
            } else {
                this.executeCommand(command, value);
            }

            this.updateToolbarState();
        });
    }

    executeCommand(command, value = null) {
        if (command === 'removeFormat') {
            document.execCommand('removeFormat', false, null);
        } else if (value) {
            document.execCommand(command, false, value);
        } else {
            document.execCommand(command, false, null);
        }
        
        this.editor.focus();
        this.saveContent();
    }

    updateToolbarState() {
        const buttons = document.querySelectorAll('.editor-btn');
        buttons.forEach(btn => {
            const command = btn.dataset.command;
            if (command && command !== 'createLink' && command !== 'insertImage' && command !== 'removeFormat') {
                const isActive = document.queryCommandState(command);
                btn.classList.toggle('active', isActive);
            }
        });
    }

    saveContent() {
        if (this.hiddenTextarea) {
            this.hiddenTextarea.value = this.editor.innerHTML;
        }
    }

    setContent(content) {
        if (this.editor) {
            this.editor.innerHTML = content;
            this.saveContent();
        }
    }

    getContent() {
        return this.editor ? this.editor.innerHTML : '';
    }

    showLinkModal() {
        const modal = document.createElement('div');
        modal.className = 'editor-modal';
        modal.innerHTML = `
            <div class="editor-modal-content">
                <h3>🔗 Link Ekle</h3>
                <div class="form-group">
                    <label for="link-url">URL:</label>
                    <input type="url" id="link-url" placeholder="https://example.com">
                </div>
                <div class="form-group">
                    <label for="link-text">Link Metni:</label>
                    <input type="text" id="link-text" placeholder="Tıklanabilir metin">
                </div>
                <div class="editor-modal-buttons">
                    <button class="editor-modal-btn secondary" onclick="this.closest('.editor-modal').remove()">İptal</button>
                    <button class="editor-modal-btn primary" onclick="richEditor.insertLink()">Ekle</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Focus on URL input
        setTimeout(() => {
            document.getElementById('link-url').focus();
        }, 100);
    }

    showImageModal() {
        const modal = document.createElement('div');
        modal.className = 'editor-modal';
        modal.innerHTML = `
            <div class="editor-modal-content">
                <h3>🖼️ Resim Ekle</h3>
                <div class="form-group">
                    <label for="image-url">Resim URL:</label>
                    <input type="url" id="image-url" placeholder="https://example.com/image.jpg">
                </div>
                <div class="form-group">
                    <label for="image-alt">Alt Metin:</label>
                    <input type="text" id="image-alt" placeholder="Resim açıklaması">
                </div>
                <div class="editor-modal-buttons">
                    <button class="editor-modal-btn secondary" onclick="this.closest('.editor-modal').remove()">İptal</button>
                    <button class="editor-modal-btn primary" onclick="richEditor.insertImage()">Ekle</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Focus on URL input
        setTimeout(() => {
            document.getElementById('image-url').focus();
        }, 100);
    }

    insertLink() {
        const url = document.getElementById('link-url').value;
        const text = document.getElementById('link-text').value;
        
        if (url) {
            const linkText = text || url;
            const linkHtml = `<a href="${url}" target="_blank">${linkText}</a>`;
            document.execCommand('insertHTML', false, linkHtml);
            this.saveContent();
        }
        
        document.querySelector('.editor-modal').remove();
        this.editor.focus();
    }

    insertImage() {
        const url = document.getElementById('image-url').value;
        const alt = document.getElementById('image-alt').value;
        
        if (url) {
            const imgHtml = `<img src="${url}" alt="${alt || ''}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;">`;
            document.execCommand('insertHTML', false, imgHtml);
            this.saveContent();
        }
        
        document.querySelector('.editor-modal').remove();
        this.editor.focus();
    }

    // Method to get plain text content
    getPlainText() {
        return this.editor ? this.editor.textContent : '';
    }

    // Method to clear editor
    clear() {
        if (this.editor) {
            this.editor.innerHTML = '';
            this.saveContent();
        }
    }

    // Method to insert text at cursor
    insertText(text) {
        document.execCommand('insertText', false, text);
        this.saveContent();
    }
}

// Initialize rich text editor
let richEditor;
document.addEventListener('DOMContentLoaded', () => {
    richEditor = new RichTextEditor();
});
