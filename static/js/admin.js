// Admin Panel Management
class AdminPanel {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupEventListeners();
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

        // Simple authentication (in real app, use proper authentication)
        if (username === 'admin' && password === 'admin123') {
            this.isLoggedIn = true;
            this.currentUser = username;
            
            // Save login session (expires in 24 hours)
            const loginData = {
                username: username,
                expires: Date.now() + (24 * 60 * 60 * 1000)
            };
            localStorage.setItem('adminLogin', JSON.stringify(loginData));
            
            this.showDashboard();
            this.showNotification('Giriş başarılı!', 'success');
        } else {
            this.showNotification('Kullanıcı adı veya şifre hatalı!', 'error');
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
            this.showNotification('Blog yöneticisi bulunamadı!', 'error');
        }
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
            }
        }
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
