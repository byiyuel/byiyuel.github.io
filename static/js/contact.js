// Contact Form Management
class ContactManager {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        this.loadMessages();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        const formData = new FormData(document.getElementById('contactForm'));
        const messageData = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            status: 'new',
            ip: this.getClientIP() // Simulated IP
        };

        // Validate required fields
        if (!messageData.name || !messageData.email || !messageData.subject || !messageData.message) {
            this.showNotification('Lütfen tüm gerekli alanları doldurun!', 'error');
            return;
        }

        // Validate email format
        if (!this.isValidEmail(messageData.email)) {
            this.showNotification('Geçerli bir email adresi girin!', 'error');
            return;
        }

        // Add message to storage
        this.messages.unshift(messageData);
        this.saveMessages();

        // Show success message
        this.showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');

        // Reset form
        document.getElementById('contactForm').reset();

        // Log to console for debugging
        console.log('New contact message:', messageData);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getClientIP() {
        // Simulated IP for demo purposes
        return '192.168.1.' + Math.floor(Math.random() * 255);
    }

    loadMessages() {
        const savedMessages = localStorage.getItem('contactMessages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
        }
    }

    saveMessages() {
        localStorage.setItem('contactMessages', JSON.stringify(this.messages));
    }

    getAllMessages() {
        return this.messages;
    }

    getMessageById(id) {
        return this.messages.find(msg => msg.id === id);
    }

    updateMessageStatus(id, status) {
        const message = this.messages.find(msg => msg.id === id);
        if (message) {
            message.status = status;
            this.saveMessages();
            return true;
        }
        return false;
    }

    deleteMessage(id) {
        this.messages = this.messages.filter(msg => msg.id !== id);
        this.saveMessages();
        return true;
    }

    getMessagesByStatus(status) {
        return this.messages.filter(msg => msg.status === status);
    }

    getMessagesBySubject(subject) {
        return this.messages.filter(msg => msg.subject === subject);
    }

    getMessagesByDateRange(startDate, endDate) {
        return this.messages.filter(msg => {
            const msgDate = new Date(msg.timestamp);
            return msgDate >= startDate && msgDate <= endDate;
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Statistics
    getStats() {
        const total = this.messages.length;
        const newMessages = this.getMessagesByStatus('new').length;
        const readMessages = this.getMessagesByStatus('read').length;
        const repliedMessages = this.getMessagesByStatus('replied').length;

        const subjects = {};
        this.messages.forEach(msg => {
            subjects[msg.subject] = (subjects[msg.subject] || 0) + 1;
        });

        return {
            total,
            new: newMessages,
            read: readMessages,
            replied: repliedMessages,
            subjects
        };
    }
}

// Initialize contact manager
let contactManager;
document.addEventListener('DOMContentLoaded', () => {
    contactManager = new ContactManager();
});

