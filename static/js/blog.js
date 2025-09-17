// Blog Management System
class BlogManager {
    constructor() {
        this.posts = [];
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.init();
    }

    init() {
        this.loadPosts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.displayPosts();
            });
        });

        // Load more button
        document.getElementById('load-more-btn').addEventListener('click', () => {
            this.loadMorePosts();
        });
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    loadPosts() {
        // Load posts from localStorage or use sample data
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            this.posts = JSON.parse(savedPosts);
        } else {
            // Sample blog posts
            this.posts = [
                {
                    id: 1,
                    title: "Python ile Kripto Para Analizi",
                    excerpt: "Python kullanarak kripto para fiyatlarını analiz etme ve tahminleme teknikleri.",
                    content: "Bu yazıda Python programlama dili kullanarak kripto para fiyatlarını nasıl analiz edebileceğimizi öğreneceğiz...",
                    category: "kripto",
                    tags: ["python", "kripto", "veri analizi"],
                    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
                    date: "2024-01-15",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 2,
                    title: "Ekonometrik Modeller ve Uygulamaları",
                    excerpt: "Ekonometrik modellerin teorik temelleri ve pratik uygulamaları.",
                    content: "Ekonometri, ekonomik teorileri matematiksel ve istatistiksel yöntemlerle test etme bilimidir...",
                    category: "ekonometri",
                    tags: ["ekonometri", "istatistik", "ekonomi"],
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                    date: "2024-01-10",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 3,
                    title: "React ile Modern Web Geliştirme",
                    excerpt: "React.js kullanarak modern ve responsive web uygulamaları geliştirme.",
                    content: "React, Facebook tarafından geliştirilen popüler bir JavaScript kütüphanesidir...",
                    category: "yazilim",
                    tags: ["react", "javascript", "web geliştirme"],
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
                    date: "2024-01-05",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 4,
                    title: "Makine Öğrenmesi ile Veri Analizi",
                    excerpt: "Makine öğrenmesi algoritmaları kullanarak büyük veri setlerini analiz etme.",
                    content: "Makine öğrenmesi, bilgisayarların açık programlama olmadan öğrenme yeteneği kazanmasıdır...",
                    category: "veri-analizi",
                    tags: ["makine öğrenmesi", "python", "veri analizi"],
                    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
                    date: "2024-01-01",
                    author: "Baran Yılmaz Yücel"
                }
            ];
            this.savePosts();
        }
        this.displayPosts();
    }

    savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    }

    displayPosts() {
        const container = document.getElementById('blog-posts');
        container.innerHTML = '';

        const filteredPosts = this.currentCategory === 'all' 
            ? this.posts 
            : this.posts.filter(post => post.category === this.currentCategory);

        const startIndex = 0;
        const endIndex = this.currentPage * this.postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);

        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            container.appendChild(postElement);
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (endIndex >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'blog-post';
        postDiv.innerHTML = `
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'">
                <div class="post-category">${this.getCategoryName(post.category)}</div>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${this.formatDate(post.date)}</span>
                    <span class="post-author">${post.author}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="read-more-btn" onclick="blogManager.readPost(${post.id})">Devamını Oku</button>
            </div>
        `;
        return postDiv;
    }

    getCategoryName(category) {
        const categories = {
            'ekonometri': 'Ekonometri',
            'veri-analizi': 'Veri Analizi',
            'yazilim': 'Yazılım',
            'kripto': 'Kripto'
        };
        return categories[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    readPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            this.showPostModal(post);
        }
    }

    showPostModal(post) {
        const modal = document.createElement('div');
        modal.className = 'post-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${post.title}</h2>
                    <button class="close-modal" onclick="this.closest('.post-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="post-image">
                        <img src="${post.image}" alt="${post.title}" onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'">
                    </div>
                    <div class="post-meta">
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <span class="post-author">${post.author}</span>
                        <span class="post-category">${this.getCategoryName(post.category)}</span>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="post-content-full">
                        ${post.content}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    loadMorePosts() {
        this.currentPage++;
        this.displayPosts();
    }

    // Admin functions
    addPost(postData) {
        const newPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toISOString().split('T')[0],
            author: "Baran Yılmaz Yücel"
        };
        this.posts.unshift(newPost);
        this.savePosts();
        this.displayPosts();
    }

    deletePost(postId) {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.savePosts();
        this.displayPosts();
    }

    updatePost(postId, updatedData) {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            this.posts[index] = { ...this.posts[index], ...updatedData };
            this.savePosts();
            this.displayPosts();
        }
    }
}

// Initialize blog manager
let blogManager;
document.addEventListener('DOMContentLoaded', () => {
    blogManager = new BlogManager();
});
