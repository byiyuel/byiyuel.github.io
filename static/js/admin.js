// Admin Panel Management
class AdminPanel {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.securityCode = this.generateSecurityCode();
        this.currentMessageFilter = 'all';
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupEventListeners();
        this.updateSecurityCode();
    }

    generateSecurityCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    updateSecurityCode() {
        this.securityCode = this.generateSecurityCode();
        const displayElement = document.getElementById('security-display');
        const currentCodeElement = document.getElementById('current-code');
        
        if (displayElement) {
            displayElement.textContent = this.securityCode;
        }
        if (currentCodeElement) {
            currentCodeElement.textContent = this.securityCode;
        }
        
        // Update security code every 5 minutes
        setTimeout(() => {
            this.updateSecurityCode();
        }, 300000);
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Add post form
        document.getElementById('add-post-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddPost();
        });
    }

    checkLoginStatus() {
        const savedLogin = localStorage.getItem('adminLogin');
        if (savedLogin) {
            const loginData = JSON.parse(savedLogin);
            if (loginData.expires > Date.now()) {
                this.isLoggedIn = true;
                this.currentUser = loginData.username;
                this.showDashboard();
            } else {
                localStorage.removeItem('adminLogin');
            }
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const securityCode = document.getElementById('security-code').value;

        // Enhanced authentication with security code
        if (username === 'admin' && password === 'admin123' && securityCode === this.securityCode) {
            this.isLoggedIn = true;
            this.currentUser = username;
            
            // Save login session (expires in 24 hours)
            const loginData = {
                username: username,
                expires: Date.now() + (24 * 60 * 60 * 1000),
                securityCode: this.securityCode
            };
            localStorage.setItem('adminLogin', JSON.stringify(loginData));
            
            this.showDashboard();
            this.showNotification('Giriş başarılı! Hoş geldiniz.', 'success');
        } else {
            let errorMessage = 'Giriş başarısız! ';
            if (username !== 'admin') {
                errorMessage += 'Kullanıcı adı hatalı. ';
            }
            if (password !== 'admin123') {
                errorMessage += 'Şifre hatalı. ';
            }
            if (securityCode !== this.securityCode) {
                errorMessage += 'Güvenlik kodu hatalı. ';
            }
            this.showNotification(errorMessage.trim(), 'error');
        }
    }

    handleLogout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('adminLogin');
        this.showLoginForm();
        this.showNotification('Çıkış yapıldı!', 'info');
    }

    showLoginForm() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('admin-dashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        document.getElementById('admin-username').textContent = this.currentUser;
        this.loadPostsList();
        this.loadMessagesList();
        this.setupMessageFilters();
    }

    setupMessageFilters() {
        document.querySelectorAll('.messages-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                document.querySelectorAll('.messages-filter .filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                this.currentMessageFilter = e.target.dataset.status;
                this.loadMessagesList();
            });
        });
    }

    handleAddPost() {
        const formData = new FormData(document.getElementById('add-post-form'));
        const postData = {
            title: formData.get('title'),
            category: formData.get('category'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            image: formData.get('image') || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'
        };

        // Validate required fields
        if (!postData.title || !postData.category || !postData.excerpt || !postData.content) {
            this.showNotification('Lütfen tüm gerekli alanları doldurun!', 'error');
            return;
        }

        // Add post using blog manager
        if (window.blogManager) {
            window.blogManager.addPost(postData);
            this.showNotification('Blog yazısı başarıyla eklendi!', 'success');
            document.getElementById('add-post-form').reset();
        } else {
            // Fallback: Save directly to localStorage
            this.savePostDirectly(postData);
            this.showNotification('Blog yazısı başarıyla eklendi!', 'success');
            document.getElementById('add-post-form').reset();
        }
    }

    savePostDirectly(postData) {
        // Get existing posts from localStorage
        let posts = [];
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            posts = JSON.parse(savedPosts);
        }

        // Create new post
        const newPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toISOString().split('T')[0],
            author: "Baran Yılmaz Yücel",
            image: postData.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'
        };

        // Add to beginning of array
        posts.unshift(newPost);

        // Save back to localStorage
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        // Reload posts list
        this.loadPostsList();
    }

    loadPostsList() {
        const postsList = document.getElementById('posts-list');
        postsList.innerHTML = '';

        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        
        if (posts.length === 0) {
            postsList.innerHTML = '<p>Henüz blog yazısı bulunmuyor.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'admin-post-item';
            postElement.innerHTML = `
                <div class="post-info">
                    <h4>${post.title}</h4>
                    <p class="post-meta">${post.category} • ${new Date(post.date).toLocaleDateString('tr-TR')}</p>
                </div>
                <div class="post-actions">
                    <button class="btn btn-small btn-secondary" onclick="adminPanel.editPost(${post.id})">Düzenle</button>
                    <button class="btn btn-small btn-danger" onclick="adminPanel.deletePost(${post.id})">Sil</button>
                </div>
            `;
            postsList.appendChild(postElement);
        });
    }

    deletePost(postId) {
        if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
            if (window.blogManager) {
                window.blogManager.deletePost(postId);
                this.loadPostsList();
                this.showNotification('Yazı silindi!', 'success');
            } else {
                // Fallback: Delete directly from localStorage
                this.deletePostDirectly(postId);
                this.loadPostsList();
                this.showNotification('Yazı silindi!', 'success');
            }
        }
    }

    deletePostDirectly(postId) {
        let posts = [];
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            posts = JSON.parse(savedPosts);
        }

        posts = posts.filter(post => post.id !== postId);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    editPost(postId) {
        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            // Fill form with existing data
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-excerpt').value = post.excerpt;
            document.getElementById('post-content').value = post.content;
            document.getElementById('post-tags').value = post.tags.join(', ');
            document.getElementById('post-image').value = post.image;

            // Scroll to form
            document.getElementById('add-post-form').scrollIntoView({ behavior: 'smooth' });
            
            // Change form title
            const formTitle = document.querySelector('.admin-section h4');
            formTitle.textContent = `📝 Blog Yazısını Düzenle (ID: ${postId})`;
            
            // Add update button
            const submitBtn = document.querySelector('#add-post-form button[type="submit"]');
            submitBtn.textContent = 'Güncelle';
            submitBtn.onclick = (e) => {
                e.preventDefault();
                this.updatePost(postId);
            };
        }
    }

    updatePost(postId) {
        const formData = new FormData(document.getElementById('add-post-form'));
        const updatedData = {
            title: formData.get('title'),
            category: formData.get('category'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            image: formData.get('image') || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'
        };

        if (window.blogManager) {
            window.blogManager.updatePost(postId, updatedData);
            this.showNotification('Yazı güncellendi!', 'success');
            this.loadPostsList();
            this.resetForm();
        } else {
            // Fallback: Update directly in localStorage
            this.updatePostDirectly(postId, updatedData);
            this.showNotification('Yazı güncellendi!', 'success');
            this.loadPostsList();
            this.resetForm();
        }
    }

    updatePostDirectly(postId, updatedData) {
        let posts = [];
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            posts = JSON.parse(savedPosts);
        }

        const index = posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...updatedData };
            localStorage.setItem('blogPosts', JSON.stringify(posts));
        }
    }

    resetForm() {
        document.getElementById('add-post-form').reset();
        const formTitle = document.querySelector('.admin-section h4');
        formTitle.textContent = '📝 Yeni Blog Yazısı Ekle';
        const submitBtn = document.querySelector('#add-post-form button[type="submit"]');
        submitBtn.textContent = 'Yazıyı Kaydet';
        submitBtn.onclick = null;
    }

    loadMessagesList() {
        const messagesList = document.getElementById('messages-list');
        messagesList.innerHTML = '';

        // Get messages from contact manager
        let messages = [];
        if (window.contactManager) {
            messages = window.contactManager.getAllMessages();
        } else {
            // Fallback: load from localStorage
            const savedMessages = localStorage.getItem('contactMessages');
            messages = savedMessages ? JSON.parse(savedMessages) : [];
        }

        // Filter messages
        let filteredMessages = messages;
        if (this.currentMessageFilter !== 'all') {
            filteredMessages = messages.filter(msg => msg.status === this.currentMessageFilter);
        }

        // Update stats
        this.updateMessageStats(messages);

        if (filteredMessages.length === 0) {
            messagesList.innerHTML = '<p class="no-messages">Henüz mesaj bulunmuyor.</p>';
            return;
        }

        filteredMessages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesList.appendChild(messageElement);
        });
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `admin-message-item ${message.status}`;
        
        const statusIcon = {
            'new': '🆕',
            'read': '👁️',
            'replied': '✅'
        };

        const statusText = {
            'new': 'Yeni',
            'read': 'Okundu',
            'replied': 'Yanıtlandı'
        };

        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-info">
                    <h4>${message.name}</h4>
                    <p class="message-meta">
                        ${message.email} • ${this.formatDate(message.timestamp)} • 
                        <span class="message-subject">${this.getSubjectText(message.subject)}</span>
                    </p>
                </div>
                <div class="message-status">
                    <span class="status-badge ${message.status}">
                        ${statusIcon[message.status]} ${statusText[message.status]}
                    </span>
                </div>
            </div>
            <div class="message-content">
                <p>${message.message}</p>
                ${message.phone ? `<p class="message-phone">📞 ${message.phone}</p>` : ''}
            </div>
            <div class="message-actions">
                <button class="btn btn-small btn-secondary" onclick="adminPanel.viewMessage(${message.id})">Görüntüle</button>
                <button class="btn btn-small btn-primary" onclick="adminPanel.markAsRead(${message.id})">Okundu</button>
                <button class="btn btn-small btn-success" onclick="adminPanel.markAsReplied(${message.id})">Yanıtlandı</button>
                <button class="btn btn-small btn-danger" onclick="adminPanel.deleteMessage(${message.id})">Sil</button>
            </div>
        `;
        return messageDiv;
    }

    getSubjectText(subject) {
        const subjects = {
            'proje-teklifi': 'Proje Teklifi',
            'işbirliği': 'İşbirliği',
            'soru': 'Soru',
            'geri-bildirim': 'Geri Bildirim',
            'diğer': 'Diğer'
        };
        return subjects[subject] || subject;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    updateMessageStats(messages) {
        const stats = {
            total: messages.length,
            new: messages.filter(m => m.status === 'new').length,
            read: messages.filter(m => m.status === 'read').length,
            replied: messages.filter(m => m.status === 'replied').length
        };

        document.getElementById('total-messages').textContent = stats.total;
        document.getElementById('new-messages').textContent = stats.new;
        document.getElementById('replied-messages').textContent = stats.replied;
    }

    viewMessage(messageId) {
        const messages = window.contactManager ? window.contactManager.getAllMessages() : [];
        const message = messages.find(m => m.id === messageId);
        
        if (message) {
            this.showMessageModal(message);
        }
    }

    showMessageModal(message) {
        const modal = document.createElement('div');
        modal.className = 'message-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📧 Mesaj Detayı</h2>
                    <button class="close-modal" onclick="this.closest('.message-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="message-details">
                        <div class="detail-row">
                            <strong>Gönderen:</strong> ${message.name}
                        </div>
                        <div class="detail-row">
                            <strong>Email:</strong> ${message.email}
                        </div>
                        ${message.phone ? `<div class="detail-row"><strong>Telefon:</strong> ${message.phone}</div>` : ''}
                        <div class="detail-row">
                            <strong>Konu:</strong> ${this.getSubjectText(message.subject)}
                        </div>
                        <div class="detail-row">
                            <strong>Tarih:</strong> ${this.formatDate(message.timestamp)}
                        </div>
                        <div class="detail-row">
                            <strong>Durum:</strong> <span class="status-badge ${message.status}">${message.status}</span>
                        </div>
                    </div>
                    <div class="message-text">
                        <h4>Mesaj:</h4>
                        <p>${message.message}</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    markAsRead(messageId) {
        if (window.contactManager) {
            window.contactManager.updateMessageStatus(messageId, 'read');
            this.loadMessagesList();
            this.showNotification('Mesaj okundu olarak işaretlendi!', 'success');
        }
    }

    markAsReplied(messageId) {
        if (window.contactManager) {
            window.contactManager.updateMessageStatus(messageId, 'replied');
            this.loadMessagesList();
            this.showNotification('Mesaj yanıtlandı olarak işaretlendi!', 'success');
        }
    }

    deleteMessage(messageId) {
        if (confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
            if (window.contactManager) {
                window.contactManager.deleteMessage(messageId);
                this.loadMessagesList();
                this.showNotification('Mesaj silindi!', 'success');
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize admin panel
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});
