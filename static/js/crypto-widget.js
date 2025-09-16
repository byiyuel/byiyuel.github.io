// Crypto Price Widget for Navbar
class CryptoNavbarWidget {
    constructor() {
        this.cryptoData = {};
        this.updateInterval = null;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.fetchCryptoPrices();
        this.startAutoUpdate();
    }

    async fetchCryptoPrices() {
        if (this.isLoading) return;
        
        this.isLoading = true;

        try {
            // CoinGecko API kullanarak kripto para fiyatlarını çek
            const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
            
            if (!cryptoResponse.ok) {
                throw new Error(`HTTP error! status: ${cryptoResponse.status}`);
            }
            
            const cryptoData = await cryptoResponse.json();
            
            // BIST ve Altın verilerini simüle et (gerçek API'ler için değiştirilebilir)
            const bistData = { price: Math.floor(Math.random() * 1000) + 8000 }; // 8000-9000 arası
            const goldData = { price: Math.floor(Math.random() * 100) + 2000 }; // 2000-2100 arası
            
            this.updateNavbarPrices(cryptoData, bistData, goldData);
            
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            this.showError();
        } finally {
            this.isLoading = false;
        }
    }

    updateNavbarPrices(cryptoData, bistData, goldData) {
        // Bitcoin
        const btcElement = document.getElementById('btc-price');
        if (btcElement && cryptoData.bitcoin) {
            btcElement.textContent = `$${cryptoData.bitcoin.usd.toLocaleString()}`;
        }

        // Ethereum
        const ethElement = document.getElementById('eth-price');
        if (ethElement && cryptoData.ethereum) {
            ethElement.textContent = `$${cryptoData.ethereum.usd.toLocaleString()}`;
        }

        // BIST
        const bistElement = document.getElementById('bist-price');
        if (bistElement) {
            bistElement.textContent = `${bistData.price}`;
        }

        // Altın
        const goldElement = document.getElementById('gold-price');
        if (goldElement) {
            goldElement.textContent = `$${goldData.price}`;
        }
    }

    showError() {
        const elements = ['btc-price', 'eth-price', 'bist-price', 'gold-price'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '--';
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
    // Initialize crypto navbar widget
    new CryptoNavbarWidget();
    
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
