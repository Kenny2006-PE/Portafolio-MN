// ===== GLOBAL VARIABLES =====
let isLoaded = false;
let currentFilter = 'all';

// ===== DOM ELEMENTS =====
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const typingText = document.querySelector('.typing-text');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Start typing animation
    startTypingAnimation();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide loader after everything is loaded
    setTimeout(hideLoader, 1500);
    
    // Initialize skill bars animation observer
    observeSkillBars();
    
    // Initialize fade-in animations
    observeFadeInElements();
}

// ===== LOADER =====
function hideLoader() {
    loader.classList.add('hidden');
    isLoaded = true;
    
    // Start animations after loader is hidden
    setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 600);
}

// ===== TYPING ANIMATION =====
function startTypingAnimation() {
    const texts = [
        'UI/UX Designer',
        'Frontend Developer',
        'Creative Thinker',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Navigation events
    navToggle.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleNavClick(e);
            closeMobileMenu();
        });
    });
    
    // Back to top
    backToTop.addEventListener('click', scrollToTop);
    
    // Project filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => handleFilterClick(e));
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Form inputs for floating labels
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('focus', handleInputFocus);
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // Project cards hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SCROLL HANDLING =====
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar scroll effect
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active navigation link
    updateActiveNavLink();
    
    // Parallax effect for hero shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
    });
    
    // Show/hide back to top button
    if (scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ===== NAVIGATION =====
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = 'visible';
    }
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
    document.body.style.overflow = 'visible';
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SKILL BARS ANIMATION =====
function observeSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// ===== PROJECT FILTERING =====
function handleFilterClick(e) {
    const filter = e.target.getAttribute('data-filter');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter projects
    filterProjects(filter);
    currentFilter = filter;
}

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.classList.add('hidden');
            }, 300);
        }
    });
}

// ===== FORM HANDLING =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
        showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 2000);
}

function handleInputBlur(e) {
    const input = e.target;
    const label = input.nextElementSibling;
    
    if (!input.value) {
        label.classList.remove('active');
    }
}

function handleInputFocus(e) {
    const input = e.target;
    const label = input.nextElementSibling;
    label.classList.add('active');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// ===== FADE-IN ANIMATIONS =====
function observeFadeInElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ===== STATS COUNTER ANIMATION =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                animateCounter(stat, finalValue);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    let currentValue = 0;
    const increment = Math.ceil(numericValue / 50);
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        element.textContent = currentValue + (isPercentage ? '%' : '+');
    }, 30);
}

// ===== CURSOR EFFECTS =====
function createCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(217, 70, 239, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(217, 70, 239, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(217, 70, 239, 0.5)';
        });
    });
}

// ===== SMOOTH REVEAL ANIMATIONS =====
function addSmoothRevealAnimations() {
    const revealElements = document.querySelectorAll('.hero-content, .about-text, .contact-info');
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// ===== INITIALIZE ADVANCED FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stats counter animation
    setTimeout(animateStats, 1000);
    
    // Add cursor effects (optional - can be disabled for mobile)
    if (window.innerWidth > 768) {
        createCursorEffects();
    }
    
    // Add smooth reveal animations
    setTimeout(addSmoothRevealAnimations, 500);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16));

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Enter key for back to top
    if (e.key === 'Enter' && e.target === backToTop) {
        scrollToTop();
    }
});

// Focus management for mobile menu
navLinks.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            if (e.shiftKey && index === 0) {
                e.preventDefault();
                navLinks[navLinks.length - 1].focus();
            } else if (!e.shiftKey && index === navLinks.length - 1) {
                e.preventDefault();
                navLinks[0].focus();
            }
        }
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        throttle,
        debounce,
        getRandomFloat,
        getRandomInt
    };
}