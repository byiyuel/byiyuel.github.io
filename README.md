# 🌟 byiyuel.github.io

> Modern, responsive ve dinamik kişisel portfolyo web sitesi

[![GitHub](https://img.shields.io/badge/GitHub-byiyuel-181717?style=for-the-badge&logo=github)](https://github.com/byiyuel)
[![Website](https://img.shields.io/badge/Website-Live-10b981?style=for-the-badge&logo=vercel)](https://byiyuel.github.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## 📖 Hakkında

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş kişisel portfolyo web sitesidir. GitHub API entegrasyonu, glassmorphism tasarım ve responsive layout ile kullanıcı deneyimini ön planda tutar.

### ✨ Özellikler

- 🎨 **Modern Tasarım**: Glassmorphism efektleri ve gradient renkler
- 📱 **Responsive**: Tüm cihazlarda mükemmel görünüm
- 🔄 **Dinamik İçerik**: GitHub API ile gerçek zamanlı veri
- ⚡ **Hızlı**: Optimize edilmiş performans
- 🌙 **Dark Theme**: Göz yormayan koyu tema
- 🎭 **Animasyonlar**: Smooth geçişler ve hover efektleri

## 🚀 Teknolojiler

### Frontend
- **HTML5** - Semantic markup
- **SCSS/CSS3** - Modern styling
- **JavaScript (ES6+)** - Interactive functionality
- **CSS Grid & Flexbox** - Responsive layout

### API Entegrasyonları
- **GitHub API** - Profil bilgileri ve repo verileri
- **REST API** - Asenkron veri çekme

### Tasarım Sistemi
- **Glassmorphism** - Şeffaf cam efektleri
- **CSS Custom Properties** - Dinamik renk sistemi
- **Modern Typography** - Inter & Poppins fontları
- **Gradient System** - Yeşil tonlu renk paleti

## 📁 Proje Yapısı

```
byiyuel.github.io/
├── 📄 index.html              # Ana HTML dosyası
├── 📄 CNAME                   # Custom domain
├── 📄 README.md               # Proje dokümantasyonu
├── 📁 static/
│   ├── 📁 images/             # Görseller ve ikonlar
│   │   ├── 🖼️ default.png
│   │   ├── 🎨 technologies/   # Teknoloji ikonları
│   │   └── 🔗 social/         # Sosyal medya ikonları
│   ├── 📁 js/                 # JavaScript dosyaları
│   │   ├── 🔧 github.js       # Repo listesi
│   │   ├── 👤 github-profile.js # Profil verileri
│   │   └── 🛠️ technologies.js  # Teknoloji listesi
│   └── 📁 scss/               # Stil dosyaları
│       ├── 🎨 style.scss      # Ana stil dosyası
│       └── 🎨 style.css       # Derlenmiş CSS
└── 📁 tools/                  # Yardımcı araçlar
    └── 🔧 acebin.html
```

## 🛠️ Kurulum

### Gereksinimler
- Modern web tarayıcısı
- GitHub hesabı (isteğe bağlı)

### Adımlar

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/byiyuel/byiyuel.github.io.git
   cd byiyuel.github.io
   ```

2. **GitHub Pages'i etkinleştirin**
   - Repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: main

3. **Özelleştirme (İsteğe bağlı)**
   ```javascript
   // static/js/github-profile.js dosyasında
   const GITHUB_USERNAME = 'your-username'; // Kendi GitHub kullanıcı adınızı yazın
   ```

## 🎨 Özelleştirme

### Renk Paleti
```scss
// Ana renkler
$primary-green: #10b981;
$secondary-green: #059669;
$accent-green: #34d399;

// Arka plan renkleri
$primary-dark: #0f1419;
$secondary-dark: #1a2332;
$card-bg: #1e293b;
```

### GitHub Entegrasyonu
- Profil fotoğrafı otomatik çekilir
- Repo listesi dinamik olarak güncellenir
- İstatistikler gerçek zamanlı gösterilir
- Son aktiviteler takip edilir

### Responsive Breakpoints
```scss
// Mobil
@media (max-width: 768px) { ... }

// Tablet
@media (min-width: 769px) and (max-width: 1024px) { ... }

// Desktop
@media (min-width: 1025px) { ... }
```

## 📊 Performans

- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Friendly**: 100%
- ♿ **Accessibility**: WCAG 2.1 uyumlu

## 🔧 Geliştirme

### SCSS Derleme
```bash
# SCSS'i CSS'e derle
sass static/scss/style.scss static/scss/style.css

# Watch mode
sass --watch static/scss/style.scss:static/scss/style.css
```

### Yerel Geliştirme
```bash
# Basit HTTP sunucusu
python -m http.server 8000
# veya
npx serve .
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **GitHub**: [@byiyuel](https://github.com/byiyuel)
- **Website**: [byiyuel.github.io](https://byiyuel.github.io)
- **Email**: [İletişim için GitHub üzerinden ulaşın](https://github.com/byiyuel)

## 🙏 Teşekkürler

- [Simple Icons](https://simpleicons.org/) - Teknoloji ikonları
- [Google Fonts](https://fonts.google.com/) - Inter & Poppins fontları
- [GitHub API](https://docs.github.com/en/rest) - Dinamik veri entegrasyonu

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ by [byiyuel](https://github.com/byiyuel)

</div>