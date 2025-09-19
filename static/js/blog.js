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
                    title: "Bitcoin 2025: 122.000 Dolar Rekoru ve Gelecek Analizi",
                    excerpt: "Bitcoin'in 2025 yılında kırdığı rekorlar ve gelecek için teknik analiz. Kurumsal yatırımların etkisi ve piyasa dinamikleri.",
                    content: `<h2>Bitcoin'in Tarihi Yükselişi</h2>
                    <p>2025 yılı Bitcoin için tarihi bir yıl oldu. Kripto para kralı, 122.000 dolar seviyesini aşarak tüm zamanların en yüksek değerine ulaştı. Bu yükseliş, sadece fiyat açısından değil, aynı zamanda kurumsal kabul açısından da önemli bir dönüm noktası.</p>
                    
                    <h3>Kurumsal Yatırımların Etkisi</h3>
                    <p>Son dönemde MicroStrategy, Tesla ve diğer büyük şirketlerin Bitcoin'e yaptığı yatırımlar, piyasanın yapısını değiştirdi. Bu kurumsal alımlar:</p>
                    <ul>
                        <li>Piyasa likiditesini artırdı</li>
                        <li>Volatiliteyi azalttı</li>
                        <li>Bitcoin'i dijital altın olarak konumlandırdı</li>
                    </ul>
                    
                    <h3>Teknik Analiz ve Destek Seviyeleri</h3>
                    <p>Teknik analiz açısından Bitcoin'in önemli destek seviyeleri:</p>
                    <ul>
                        <li><strong>Güçlü Destek:</strong> 95.000 - 100.000 dolar</li>
                        <li><strong>Orta Destek:</strong> 85.000 - 90.000 dolar</li>
                        <li><strong>Zayıf Destek:</strong> 75.000 - 80.000 dolar</li>
                    </ul>
                    
                    <h3>Gelecek Öngörüleri</h3>
                    <p>Analistler Bitcoin'in geleceği için şu senaryoları öngörüyor:</p>
                    <ol>
                        <li><strong>Bullish Senaryo:</strong> 150.000 dolar hedefi</li>
                        <li><strong>Neutral Senaryo:</strong> 100.000 - 130.000 dolar aralığında konsolidasyon</li>
                        <li><strong>Bearish Senaryo:</strong> 80.000 dolar seviyesine düzeltme</li>
                    </ol>
                    
                    <h3>Yatırım Stratejisi Önerileri</h3>
                    <p>Bitcoin yatırımı yaparken dikkat edilmesi gerekenler:</p>
                    <ul>
                        <li>Portföyünüzün %5-10'unu Bitcoin'e ayırın</li>
                        <li>Dollar-cost averaging stratejisi uygulayın</li>
                        <li>Teknik analiz ve temel analizi birlikte kullanın</li>
                        <li>Risk yönetimini ihmal etmeyin</li>
                    </ul>
                    
                    <p><em>Bu analiz sadece bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Kripto para yatırımları yüksek risk içerir.</em></p>`,
                    category: "kripto",
                    tags: ["bitcoin", "kripto", "analiz", "yatırım"],
                    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
                    date: "2025-01-19",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 2,
                    title: "Ethereum'un Kurumsal Dönüşümü: Arz Daralması ve Fiyat Etkisi",
                    excerpt: "Ethereum'un kurumsal yatırımcılar tarafından keşfedilmesi ve arz daralmasının fiyat üzerindeki etkileri.",
                    content: `<h2>Ethereum'un Kurumsal Kabulü</h2>
                    <p>Ethereum, Bitcoin'in ardından en değerli kripto para olarak kurumsal yatırımcıların radarına girdi. SharpLink gibi büyük şirketler, Ethereum'un toplam arzının %5'ine sahip olmayı hedefliyor.</p>
                    
                    <h3>Arz Daralması ve Etkileri</h3>
                    <p>Ethereum'un arz daralması birkaç faktörden kaynaklanıyor:</p>
                    <ul>
                        <li><strong>Kurumsal Alımlar:</strong> Büyük şirketlerin ETH satın alması</li>
                        <li><strong>Staking:</strong> ETH'nin stake edilmesi ve piyasadan çekilmesi</li>
                        <li><strong>DeFi Kullanımı:</strong> Merkezi olmayan finans protokollerinde ETH'nin kilitlenmesi</li>
                        <li><strong>NFT Pazarı:</strong> NFT işlemlerinde ETH'nin kullanılması</li>
                    </ul>
                    
                    <h3>Ethereum 2.0 ve Staking</h3>
                    <p>Ethereum'un Proof-of-Stake'e geçişi, arz daralmasını hızlandırdı. Şu anda:</p>
                    <ul>
                        <li>32 milyon ETH stake edilmiş durumda</li>
                        <li>Günlük yeni ETH üretimi %90 azaldı</li>
                        <li>Staking ödülleri yıllık %4-6 arasında</li>
                    </ul>
                    
                    <h3>DeFi Ekosistemi</h3>
                    <p>Merkezi olmayan finans protokollerinde kilitlenen ETH miktarı:</p>
                    <ul>
                        <li><strong>Uniswap:</strong> 2.5 milyon ETH</li>
                        <li><strong>Aave:</strong> 1.8 milyon ETH</li>
                        <li><strong>Compound:</strong> 1.2 milyon ETH</li>
                        <li><strong>MakerDAO:</strong> 0.9 milyon ETH</li>
                    </ul>
                    
                    <h3>Fiyat Analizi</h3>
                    <p>Ethereum'un fiyat seviyeleri:</p>
                    <ul>
                        <li><strong>Direnç:</strong> 4.500 - 5.000 dolar</li>
                        <li><strong>Destek:</strong> 3.200 - 3.500 dolar</li>
                        <li><strong>Güçlü Destek:</strong> 2.800 - 3.000 dolar</li>
                    </ul>
                    
                    <h3>Yatırım Stratejisi</h3>
                    <p>Ethereum yatırımı için öneriler:</p>
                    <ol>
                        <li>Staking yaparak pasif gelir elde edin</li>
                        <li>DeFi protokollerini takip edin</li>
                        <li>Layer 2 çözümlerini değerlendirin</li>
                        <li>DCA stratejisi uygulayın</li>
                    </ol>
                    
                    <p><em>Ethereum yatırımları yüksek risk içerir. Yatırım yapmadan önce kendi araştırmanızı yapın.</em></p>`,
                    category: "kripto",
                    tags: ["ethereum", "defi", "staking", "kurumsal"],
                    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800",
                    date: "2025-01-18",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 3,
                    title: "BIST 100 Analizi: Yeni Rekorlar ve Yatırım Fırsatları",
                    excerpt: "Borsa İstanbul'da BIST 100 endeksinin 10.517,72 seviyesine ulaşması ve sektörel analiz.",
                    content: `<h2>BIST 100'ün Tarihi Yükselişi</h2>
                    <p>Borsa İstanbul'da BIST 100 endeksi, 10.517,72 seviyesine ulaşarak yeni bir rekora imza attı. Bu yükseliş, yabancı yatırımcıların Türkiye piyasalarına olan ilgisinin artması ve ekonomik göstergelerin olumlu seyretmesiyle ilişkilendiriliyor.</p>
                    
                    <h3>Sektörel Performans</h3>
                    <p>2025 yılında öne çıkan sektörler:</p>
                    <ul>
                        <li><strong>Teknoloji:</strong> %25 artış</li>
                        <li><strong>Finans:</strong> %18 artış</li>
                        <li><strong>Enerji:</strong> %15 artış</li>
                        <li><strong>Sanayi:</strong> %12 artış</li>
                    </ul>
                    
                    <h3>Yabancı Yatırımcı İlgisi</h3>
                    <p>Yabancı yatırımcıların BIST'e ilgisi artıyor:</p>
                    <ul>
                        <li>Ocak ayında 2.5 milyar TL net alım</li>
                        <li>Yabancı payı %65'e yükseldi</li>
                        <li>ETF alımları %40 arttı</li>
                    </ul>
                    
                    <h3>Öne Çıkan Hisseler</h3>
                    <p>Performansı öne çıkan hisseler:</p>
                    <ol>
                        <li><strong>THYAO:</strong> Havacılık sektöründe liderlik</li>
                        <li><strong>TUPRS:</strong> Petrol fiyatlarındaki artış</li>
                        <li><strong>AKBNK:</strong> Bankacılık sektöründe güçlü performans</li>
                        <li><strong>GARAN:</strong> Kredi büyümesi ve kar artışı</li>
                    </ol>
                    
                    <h3>Teknik Analiz</h3>
                    <p>BIST 100 teknik seviyeleri:</p>
                    <ul>
                        <li><strong>Direnç:</strong> 10.800 - 11.000</li>
                        <li><strong>Destek:</strong> 10.200 - 10.400</li>
                        <li><strong>Güçlü Destek:</strong> 9.800 - 10.000</li>
                    </ul>
                    
                    <h3>Makroekonomik Faktörler</h3>
                    <p>BIST'i etkileyen faktörler:</p>
                    <ul>
                        <li>Enflasyon oranının düşmesi</li>
                        <li>Faiz oranlarının istikrarı</li>
                        <li>Döviz kurlarının kontrolü</li>
                        <li>Ekonomik büyüme beklentileri</li>
                    </ul>
                    
                    <h3>Yatırım Stratejisi</h3>
                    <p>BIST yatırımı için öneriler:</p>
                    <ol>
                        <li>Sektörel çeşitlendirme yapın</li>
                        <li>Fundamental analiz kullanın</li>
                        <li>Risk yönetimini ihmal etmeyin</li>
                        <li>Uzun vadeli perspektif benimseyin</li>
                    </ol>
                    
                    <p><em>Hisse senedi yatırımları risk içerir. Yatırım kararlarınızı kendi araştırmanıza dayandırın.</em></p>`,
                    category: "veri-analizi",
                    tags: ["bist", "borsa", "analiz", "yatırım"],
                    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
                    date: "2025-01-17",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 4,
                    title: "Makine Öğrenmesi ile Kripto Para Fiyat Tahmini",
                    excerpt: "LSTM, Random Forest ve diğer ML algoritmaları kullanarak kripto para fiyat tahminleme teknikleri.",
                    content: `<h2>Makine Öğrenmesi ve Kripto Para Analizi</h2>
                    <p>Kripto para piyasalarının yüksek volatilitesi ve karmaşık yapısı, geleneksel analiz yöntemlerinin yetersiz kalmasına neden oluyor. Bu noktada makine öğrenmesi algoritmaları devreye giriyor.</p>
                    
                    <h3>Kullanılan Algoritmalar</h3>
                    <p>Kripto para fiyat tahmininde en etkili algoritmalar:</p>
                    <ul>
                        <li><strong>LSTM (Long Short-Term Memory):</strong> Zaman serisi analizi için ideal</li>
                        <li><strong>Random Forest:</strong> Çoklu faktör analizi</li>
                        <li><strong>XGBoost:</strong> Gradient boosting ile yüksek doğruluk</li>
                        <li><strong>ARIMA:</strong> Klasik zaman serisi modeli</li>
                    </ul>
                    
                    <h3>Veri Kaynakları</h3>
                    <p>Model eğitimi için kullanılan veri kaynakları:</p>
                    <ul>
                        <li><strong>Fiyat Verileri:</strong> OHLCV (Open, High, Low, Close, Volume)</li>
                        <li><strong>Teknik İndikatörler:</strong> RSI, MACD, Bollinger Bands</li>
                        <li><strong>On-Chain Veriler:</strong> Hash rate, aktif adresler</li>
                        <li><strong>Sentiment Analizi:</strong> Sosyal medya ve haber analizi</li>
                    </ul>
                    
                    <h3>Python ile Uygulama</h3>
                    <p>Örnek LSTM modeli:</p>
                    <pre><code>import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import pandas as pd
import numpy as np

def create_lstm_model(input_shape):
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=input_shape),
        Dropout(0.2),
        LSTM(50, return_sequences=False),
        Dropout(0.2),
        Dense(25),
        Dense(1)
    ])
    
    model.compile(optimizer='adam', 
                  loss='mean_squared_error')
    return model</code></pre>
                    
                    <h3>Model Performansı</h3>
                    <p>Farklı algoritmaların performans karşılaştırması:</p>
                    <ul>
                        <li><strong>LSTM:</strong> %78 doğruluk</li>
                        <li><strong>Random Forest:</strong> %72 doğruluk</li>
                        <li><strong>XGBoost:</strong> %75 doğruluk</li>
                        <li><strong>ARIMA:</strong> %65 doğruluk</li>
                    </ul>
                    
                    <h3>Risk Faktörleri</h3>
                    <p>ML modellerinin sınırları:</p>
                    <ul>
                        <li>Geçmiş veriler geleceği garanti etmez</li>
                        <li>Piyasa şokları modeli etkileyebilir</li>
                        <li>Overfitting riski</li>
                        <li>Veri kalitesi kritik önemde</li>
                    </ul>
                    
                    <h3>Pratik Uygulama</h3>
                    <p>Model geliştirme süreci:</p>
                    <ol>
                        <li>Veri toplama ve temizleme</li>
                        <li>Feature engineering</li>
                        <li>Model eğitimi</li>
                        <li>Backtesting</li>
                        <li>Gerçek zamanlı test</li>
                    </ol>
                    
                    <h3>Sonuç</h3>
                    <p>Makine öğrenmesi, kripto para analizinde güçlü bir araç olmakla birlikte, tek başına yeterli değildir. Temel analiz, teknik analiz ve risk yönetimi ile birlikte kullanılmalıdır.</p>
                    
                    <p><em>Bu analiz sadece eğitim amaçlıdır. Yatırım kararlarınızı kendi araştırmanıza dayandırın.</em></p>`,
                    category: "veri-analizi",
                    tags: ["makine öğrenmesi", "python", "lstm", "tahmin"],
                    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
                    date: "2025-01-16",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 5,
                    title: "Altcoin Portföy Yönetimi: Risk ve Getiri Dengesi",
                    excerpt: "Altcoin yatırımlarında portföy çeşitlendirmesi, risk yönetimi ve getiri optimizasyonu stratejileri.",
                    content: `<h2>Altcoin Portföy Stratejisi</h2>
                    <p>Kripto para portföyünde Bitcoin'in yanında altcoin'lerin doğru şekilde konumlandırılması, risk-getiri dengesini optimize etmek için kritik önem taşıyor.</p>
                    
                    <h3>Portföy Dağılımı</h3>
                    <p>Önerilen portföy dağılımı:</p>
                    <ul>
                        <li><strong>Bitcoin:</strong> %40-50</li>
                        <li><strong>Ethereum:</strong> %20-25</li>
                        <li><strong>Layer 1 Altcoin'ler:</strong> %15-20</li>
                        <li><strong>DeFi Token'ları:</strong> %10-15</li>
                        <li><strong>Emerging Altcoin'ler:</strong> %5-10</li>
                    </ul>
                    
                    <h3>Sektörel Çeşitlendirme</h3>
                    <p>Altcoin sektörleri ve öne çıkan projeler:</p>
                    <ul>
                        <li><strong>Layer 1:</strong> Solana, Avalanche, Cardano</li>
                        <li><strong>DeFi:</strong> Uniswap, Aave, Compound</li>
                        <li><strong>Gaming:</strong> Axie Infinity, Sandbox</li>
                        <li><strong>Storage:</strong> Filecoin, Arweave</li>
                        <li><strong>Oracle:</strong> Chainlink, Band Protocol</li>
                    </ul>
                    
                    <h3>Risk Yönetimi</h3>
                    <p>Altcoin yatırımlarında risk yönetimi:</p>
                    <ul>
                        <li><strong>Position Sizing:</strong> Her altcoin için maksimum %5-10</li>
                        <li><strong>Stop Loss:</strong> %20-30 zarar durumunda çıkış</li>
                        <li><strong>Take Profit:</strong> %100-200 kar durumunda kısmi çıkış</li>
                        <li><strong>DCA:</strong> Düzenli alım stratejisi</li>
                    </ul>
                    
                    <h3>Fundamental Analiz</h3>
                    <p>Altcoin seçiminde dikkat edilecek faktörler:</p>
                    <ul>
                        <li><strong>Tokenomics:</strong> Arz, dağıtım, enflasyon</li>
                        <li><strong>Use Case:</strong> Gerçek dünya kullanımı</li>
                        <li><strong>Team:</strong> Geliştirici ekibi ve deneyim</li>
                        <li><strong>Community:</strong> Topluluk gücü ve aktivite</li>
                        <li><strong>Technology:</strong> Teknik yenilik ve güvenlik</li>
                    </ul>
                    
                    <h3>Teknik Analiz</h3>
                    <p>Altcoin'lerde teknik analiz:</p>
                    <ul>
                        <li><strong>Trend Analizi:</strong> Uzun vadeli trend belirleme</li>
                        <li><strong>Support/Resistance:</strong> Önemli seviyeler</li>
                        <li><strong>Volume Analizi:</strong> İşlem hacmi değerlendirmesi</li>
                        <li><strong>Correlation:</strong> Bitcoin ile korelasyon</li>
                    </ul>
                    
                    <h3>Market Cycle Analizi</h3>
                    <p>Kripto para döngüsünde altcoin stratejisi:</p>
                    <ul>
                        <li><strong>Accumulation:</strong> Düşük fiyatlarda alım</li>
                        <li><strong>Markup:</strong> Trend takibi</li>
                        <li><strong>Distribution:</strong> Kısmi satış</li>
                        <li><strong>Markdown:</strong> Risk azaltma</li>
                    </ul>
                    
                    <h3>Pratik Öneriler</h3>
                    <p>Altcoin portföy yönetimi için:</p>
                    <ol>
                        <li>Maksimum 10-15 altcoin tutun</li>
                        <li>Düzenli portföy gözden geçirmesi yapın</li>
                        <li>Emosyonel kararlardan kaçının</li>
                        <li>Haberleri ve gelişmeleri takip edin</li>
                        <li>Risk toleransınızı belirleyin</li>
                    </ol>
                    
                    <p><em>Altcoin yatırımları yüksek risk içerir. Sadece kaybetmeyi göze alabileceğiniz parayı yatırın.</em></p>`,
                    category: "kripto",
                    tags: ["altcoin", "portföy", "risk", "çeşitlendirme"],
                    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
                    date: "2025-01-15",
                    author: "Baran Yılmaz Yücel"
                },
                {
                    id: 6,
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
                    id: 7,
                    title: "React ile Modern Web Geliştirme",
                    excerpt: "React.js kullanarak modern ve responsive web uygulamaları geliştirme.",
                    content: "React, Facebook tarafından geliştirilen popüler bir JavaScript kütüphanesidir...",
                    category: "yazilim",
                    tags: ["react", "javascript", "web geliştirme"],
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
                    date: "2024-01-05",
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
