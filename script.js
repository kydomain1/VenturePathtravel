// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
});

// ==========================================
// CATEGORY FILTER FUNCTIONALITY
// ==========================================
const categoryBtns = document.querySelectorAll('.category-btn');
const articlesGrid = document.getElementById('articlesGrid');
const articles = document.querySelectorAll('.article-card');

let currentCategory = 'all';

// Filter functionality
function filterArticles() {
    let visibleCount = 0;
    
    articles.forEach(article => {
        const category = article.dataset.category;
        const matchesCategory = currentCategory === 'all' || category === currentCategory;
        
        if (matchesCategory) {
            article.style.display = 'block';
            article.style.animation = 'fadeInUp 0.6s ease-out forwards';
            article.style.animationDelay = `${visibleCount * 0.1}s`;
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });

    // Show message if no results
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (visibleCount === 0 && articlesGrid) {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.style.cssText = 'text-align: center; padding: 4rem 0; color: #666; font-size: 1.1rem;';
        message.textContent = 'No articles found in this category.';
        articlesGrid.appendChild(message);
    }
}

// Category filter event
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update current category
        currentCategory = btn.dataset.category;
        
        // Filter articles
        filterArticles();

        // Smooth scroll to articles
        if (articlesGrid) {
            articlesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================
// SMOOTH SCROLL FOR FOOTER LINKS
// ==========================================
document.querySelectorAll('.footer-section a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.dataset.category;
        
        // Navigate to home page if not already there
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
            sessionStorage.setItem('filterCategory', category);
        } else {
            // Find and click the corresponding category button
            const categoryBtn = Array.from(categoryBtns).find(btn => btn.dataset.category === category);
            if (categoryBtn) {
                categoryBtn.click();
            }
        }
    });
});

// Check for stored category filter on page load
window.addEventListener('load', () => {
    const storedCategory = sessionStorage.getItem('filterCategory');
    if (storedCategory) {
        const categoryBtn = Array.from(categoryBtns).find(btn => btn.dataset.category === storedCategory);
        if (categoryBtn) {
            categoryBtn.click();
        }
        sessionStorage.removeItem('filterCategory');
    }
});

// ==========================================
// FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = 'background-color: #f0f0f0; padding: 1.5rem; border-radius: 8px; text-align: center; margin-top: 1rem; animation: fadeIn 0.5s;';
            successMessage.innerHTML = '<p style="color: #1a1a1a; margin: 0; font-weight: 500;">Thank you for your message! We\'ll get back to you soon.</p>';
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.animation = 'fadeOut 0.5s';
                setTimeout(() => successMessage.remove(), 500);
            }, 5000);
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.article-card, .product-card, .product-item').forEach(el => {
    observer.observe(el);
});

// ==========================================
// BACK TO TOP BUTTON (Optional)
// ==========================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 500) {
            // Could add a back-to-top button here if needed
        }
    }, 100);
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PREVENT ANIMATION ON PAGE LOAD
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// ACTIVE NAV LINK HIGHLIGHT
// ==========================================
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

