// Crypto Price Widget
class CryptoWidget {
    constructor() {
        this.cryptoData = {};
        this.updateInterval = null;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.fetchCryptoPrices();
        this.startAutoUpdate();
    }

    bindEvents() {
        const refreshBtn = document.getElementById('refresh-crypto');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.fetchCryptoPrices();
            });
        }
    }

    async fetchCryptoPrices() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const refreshBtn = document.getElementById('refresh-crypto');
        if (refreshBtn) {
            refreshBtn.style.opacity = '0.5';
            refreshBtn.style.transform = 'rotate(360deg)';
        }

        try {
            // CoinGecko API kullanarak kripto para fiyatlarını çek
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano&vs_currencies=usd&include_24hr_change=true');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateCryptoCards(data);
            this.updateLastUpdateTime();
            
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            this.showError();
        } finally {
            this.isLoading = false;
            if (refreshBtn) {
                refreshBtn.style.opacity = '1';
                refreshBtn.style.transform = 'rotate(0deg)';
            }
        }
    }

    updateCryptoCards(data) {
        const cryptoMapping = {
            'bitcoin': 'bitcoin',
            'ethereum': 'ethereum', 
            'binancecoin': 'binancecoin',
            'cardano': 'cardano'
        };

        Object.entries(cryptoMapping).forEach(([coinId, elementId]) => {
            const card = document.querySelector(`[data-coin="${elementId}"]`);
            if (card && data[coinId]) {
                const coinData = data[coinId];
                const priceElement = card.querySelector('.price');
                const changeElement = card.querySelector('.change');
                
                if (priceElement) {
                    priceElement.textContent = `$${coinData.usd.toLocaleString()}`;
                }
                
                if (changeElement && coinData.usd_24h_change !== undefined) {
                    const change = coinData.usd_24h_change;
                    changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
                    changeElement.className = `change ${change >= 0 ? 'positive' : 'negative'}`;
                }
            }
        });
    }

    updateLastUpdateTime() {
        const lastUpdateElement = document.getElementById('last-update');
        if (lastUpdateElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            lastUpdateElement.textContent = `Son güncelleme: ${timeString}`;
        }
    }

    showError() {
        const cards = document.querySelectorAll('.crypto-card');
        cards.forEach(card => {
            const priceElement = card.querySelector('.price');
            const changeElement = card.querySelector('.change');
            
            if (priceElement) {
                priceElement.textContent = 'Hata';
            }
            if (changeElement) {
                changeElement.textContent = '--';
                changeElement.className = 'change';
            }
        });
    }

    startAutoUpdate() {
        // Her 30 saniyede bir güncelle
        this.updateInterval = setInterval(() => {
            this.fetchCryptoPrices();
        }, 30000);
    }

    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// CV Download Function
function downloadCV() {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#'; // Gerçek CV dosyasının URL'si buraya gelecek
    link.download = 'Baran_Yilmaz_Yucel_CV.pdf';
    
    // Show loading state
    const btn = document.querySelector('.download-btn');
    const originalText = btn.textContent;
    btn.textContent = '📥 İndiriliyor...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('CV indirme özelliği yakında aktif olacak! Şimdilik iletişim formu üzerinden CV talebinde bulunabilirsiniz.');
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize crypto widget
    new CryptoWidget();
    
    // Add smooth scrolling to blog links
    document.querySelectorAll('.blog-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Blog yazıları yakında yayınlanacak! Şimdilik GitHub profilimdeki projelerimi inceleyebilirsiniz.');
        });
    });
    
    // Add smooth scrolling to code links
    document.querySelectorAll('.code-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Kod örnekleri GitHub profilimde mevcut! Detaylı inceleme için GitHub\'a yönlendiriliyorsunuz.');
            window.open('https://github.com/byiyuel', '_blank');
        });
    });
});

// Export for global access
window.downloadCV = downloadCV;
