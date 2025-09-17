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
        this.loadPopularPosts();
        this.loadTagCloud();
        this.updateCategoryCounts();
    }

    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveCategory(e.target);
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.displayPosts();
            });
        });

        // Load more button
        document.getElementById('load-more-btn').addEventListener('click', () => {
            this.loadMorePosts();
        });

        // Search functionality
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }

        // Tag clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-item')) {
                this.filterByTag(e.target.textContent);
            }
        });
    }

    setActiveCategory(activeBtn) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    updateCategoryCounts() {
        const categories = ['all', 'ekonometri', 'veri-analizi', 'yazilim', 'kripto'];
        
        categories.forEach(category => {
            const countElement = document.getElementById(`count-${category}`);
            if (countElement) {
                let count = 0;
                if (category === 'all') {
                    count = this.posts.length;
                } else {
                    count = this.posts.filter(post => post.category === category).length;
                }
                countElement.textContent = count;
            }
        });
    }

    loadPopularPosts() {
        const popularContainer = document.getElementById('popular-posts');
        if (!popularContainer) return;

        // Get most recent 3 posts as popular
        const popularPosts = this.posts.slice(0, 3);
        
        popularContainer.innerHTML = popularPosts.map(post => `
            <div class="popular-post" onclick="blogManager.readPost(${post.id})">
                <img src="${post.image}" alt="${post.title}" class="popular-post-image" onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'">
                <div class="popular-post-content">
                    <h4>${post.title}</h4>
                    <p>${this.formatDate(post.date)}</p>
                </div>
            </div>
        `).join('');
    }

    loadTagCloud() {
        const tagContainer = document.getElementById('tag-cloud');
        if (!tagContainer) return;

        // Get all unique tags
        const allTags = [...new Set(this.posts.flatMap(post => post.tags))];
        
        tagContainer.innerHTML = allTags.map(tag => `
            <span class="tag-item">${tag}</span>
        `).join('');
    }

    searchPosts(query) {
        if (!query.trim()) {
            this.displayPosts();
            return;
        }

        const filteredPosts = this.posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        this.displayFilteredPosts(filteredPosts);
    }

    filterByTag(tag) {
        const filteredPosts = this.posts.filter(post => 
            post.tags.includes(tag)
        );

        this.displayFilteredPosts(filteredPosts);
    }

    displayFilteredPosts(posts) {
        const container = document.getElementById('blog-posts');
        container.innerHTML = '';

        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            container.appendChild(postElement);
        });

        // Hide load more button for filtered results
        document.getElementById('load-more-btn').style.display = 'none';
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
        postDiv.className = 'blog-post-card';
        postDiv.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-post-image" onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'">
            <div class="blog-post-content">
                <div class="blog-post-meta">
                    <span class="blog-post-category">${this.getCategoryName(post.category)}</span>
                    <span class="blog-post-date">${this.formatDate(post.date)}</span>
                </div>
                <h3 class="blog-post-title">${post.title}</h3>
                <p class="blog-post-excerpt">${post.excerpt}</p>
                <div class="blog-post-tags">
                    ${post.tags.map(tag => `<span class="blog-post-tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="blog-post-read-more" onclick="blogManager.readPost(${post.id}); return false;">
                    Devamını Oku →
                </a>
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
