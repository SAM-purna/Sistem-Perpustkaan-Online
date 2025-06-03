// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the clicked link
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Form Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validatePassword(password) {
    return password.length >= 6;
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        alert('Mohon lengkapi semua field yang diperlukan!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Format email tidak valid!');
        return;
    }

    // Simulate form submission
    showLoadingMessage('Mengirim pesan...');
    
    setTimeout(() => {
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.');
        document.getElementById('contact-form').reset();
    }, 1500);
}

// Sign Up Form Handler
function handleSignUpForm(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const memberType = document.getElementById('member-type').value;

    // Validation
    if (!fullname || !email || !phone || !password || !confirmPassword || !memberType) {
        alert('Mohon lengkapi semua field yang diperlukan!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Format email tidak valid!');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Format nomor telepon tidak valid!');
        return;
    }

    if (!validatePassword(password)) {
        alert('Password minimal 6 karakter!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Konfirmasi password tidak cocok!');
        return;
    }

    // Simulate registration
    showLoadingMessage('Mendaftarkan akun...');
    
    setTimeout(() => {
        alert('Selamat! Akun Anda berhasil dibuat. Silakan login untuk melanjutkan.');
        document.getElementById('signup-form').reset();
        showPage('home');
    }, 2000);
}

// Utility Functions
function showLoadingMessage(message) {
    // Create loading overlay
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-overlay';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        color: white;
        font-size: 1.2rem;
    `;
    loadingDiv.textContent = message;
    
    document.body.appendChild(loadingDiv);
    
    // Remove loading overlay after delay
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }, 1500);
}

// Smooth Scrolling for Internal Links
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Search Functionality (for future implementation)
function searchBooks(query) {
    const books = document.querySelectorAll('.book-card');
    const searchTerm = query.toLowerCase();
    
    books.forEach(book => {
        const title = book.querySelector('h3').textContent.toLowerCase();
        const author = book.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

// Book Status Toggle (for admin functionality)
function toggleBookStatus(bookCard) {
    const statusElement = bookCard.querySelector('.book-status');
    
    if (statusElement.classList.contains('available')) {
        statusElement.classList.remove('available');
        statusElement.classList.add('borrowed');
        statusElement.textContent = 'Dipinjam';
    } else {
        statusElement.classList.remove('borrowed');
        statusElement.classList.add('available');
        statusElement.textContent = 'Tersedia';
    }
}

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Form event listeners
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUpForm);
    }

    // Book card click handlers (for future book detail functionality)
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            // Future: Show book details modal
            console.log('Book clicked:', this.querySelector('h3').textContent);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        // ESC key to close modals or return to home
        if (event.key === 'Escape') {
            showPage('home');
        }
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add subtle loading effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Window scroll effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.style.backgroundColor = '#ffffff';
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    } else {
        header.style.backgroundColor = '#f8f9fa';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Responsive menu toggle (for mobile)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add mobile menu styles dynamically
const mobileStyles = `
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);