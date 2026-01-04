// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all class cards
document.querySelectorAll('.class-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ========================================
// FORM HANDLING
// ========================================

// Replace this URL with your Google Apps Script web app URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIC2ygsHrQdIMIqSjrBTrrjH9peqIyS3Ijv1aihqFRdJP1rrvnSTijVKrCufomv8kQ-A/exec';

const enquiryForm = document.getElementById('enquiry-form');
const submitButton = enquiryForm.querySelector('button[type="submit"]');

// Input sanitization function
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML.trim();
}

// Validation functions
function validateName(name) {
    const sanitized = sanitizeInput(name);
    if (sanitized.length < 2 || sanitized.length > 50) {
        return { valid: false, message: 'Name must be between 2 and 50 characters' };
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(sanitized)) {
        return { valid: false, message: 'Name contains invalid characters' };
    }
    return { valid: true, value: sanitized };
}

function validateEmail(email) {
    const sanitized = sanitizeInput(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    if (sanitized.length > 100) {
        return { valid: false, message: 'Email is too long' };
    }
    return { valid: true, value: sanitized.toLowerCase() };
}

function validatePhone(phone) {
    const sanitized = sanitizeInput(phone);
    // Remove spaces, dashes, and parentheses
    const cleaned = sanitized.replace(/[\s\-()]/g, '');
    
    // Check for valid Indian phone number (10 digits)
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
        return { valid: false, message: 'Please enter a valid 10-digit Indian phone number' };
    }
    return { valid: true, value: cleaned };
}

function validateMessage(message) {
    const sanitized = sanitizeInput(message);
    if (sanitized.length < 5) {
        return { valid: false, message: 'Message must be at least 5 characters long' };
    }
    if (sanitized.length > 1000) {
        return { valid: false, message: 'Message is too long (max 1000 characters)' };
    }
    return { valid: true, value: sanitized };
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(244, 67, 54, 0.4);
        z-index: 10000;
        font-weight: 600;
        animation: slideDown 0.5s ease;
        max-width: 80%;
        text-align: center;
    `;
    errorDiv.textContent = '✗ ' + message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideDown 0.5s ease reverse';
        setTimeout(() => errorDiv.remove(), 500);
    }, 4000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
        z-index: 10000;
        font-weight: 600;
        animation: slideDown 0.5s ease;
    `;
    successDiv.textContent = '✓ ' + message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    if (!document.querySelector('style[data-form-animations]')) {
        style.setAttribute('data-form-animations', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideDown 0.5s ease reverse';
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}

// Form submission handler
enquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const danceType = document.getElementById('dance-type').value;
    const message = document.getElementById('message').value;
    
    // Validate all inputs
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
        showError(nameValidation.message);
        return;
    }
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        showError(emailValidation.message);
        return;
    }
    
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
        showError(phoneValidation.message);
        return;
    }
    
    if (!danceType) {
        showError('Please select a dance form');
        return;
    }
    
    const messageValidation = validateMessage(message);
    if (!messageValidation.valid) {
        showError(messageValidation.message);
        return;
    }
    
    // Prepare sanitized data
    const formData = {
        name: nameValidation.value,
        email: emailValidation.value,
        phone: phoneValidation.value,
        danceType: danceType,
        message: messageValidation.value,
        timestamp: new Date().toISOString()
    };
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    
    try {
        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Show success message
        showSuccess('Thank you! We will contact you soon.');
        
        // Reset form
        enquiryForm.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showError('Something went wrong. Please try again or call us directly.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========================================
// ADD HOVER EFFECT TO CLASS CARDS
// ========================================
document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// ========================================
// GALLERY LIGHTBOX EFFECT
// ========================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Get the image source
        const img = this.querySelector('img');
        if (!img) return;
        
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
            padding: 20px;
        `;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: transparent;
            border: none;
            color: white;
            font-size: 50px;
            cursor: pointer;
            z-index: 10001;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'scale(1.2)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'scale(1)';
        });
        
        // Create enlarged image
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.src;
        enlargedImg.alt = img.alt;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;
        
        // Prevent image click from closing lightbox
        enlargedImg.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(enlargedImg);
        document.body.appendChild(lightbox);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Function to close lightbox
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeIn 0.3s ease reverse';
            document.body.style.overflow = '';
            setTimeout(() => lightbox.remove(), 300);
        };
        
        // Close on background click
        lightbox.addEventListener('click', closeLightbox);
        
        // Close on button click
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
        
        // Close on Escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// ========================================
// FORM VALIDATION ENHANCEMENTS
// ========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Real-time validation
    input.addEventListener('input', function() {
        if (this.checkValidity()) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#ff6b6b';
        }
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.style.borderColor = 'transparent';
        }
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS (Optional)
// ========================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
}

// ========================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ========================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D4145A 0%, #8B2F97 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(212, 20, 90, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ========================================
// LIGHTBOX GALLERY FUNCTIONALITY
// ========================================

// Gallery images array
const galleryImages = [
    { src: 'assets/1.jpeg', caption: 'Dance Performance 1' },
    { src: 'assets/2.jpeg', caption: 'Dance Performance 2' },
    { src: 'assets/3.jpeg', caption: 'Dance Performance 3' },
    { src: 'assets/4.jpeg', caption: 'Dance Performance 4' },
    { src: 'assets/5.jpeg', caption: 'Dance Performance 5' },
    { src: 'assets/6.jpeg', caption: 'Dance Performance 6' },
    { src: 'assets/7.jpeg', caption: 'Dance Performance 7' },
    { src: 'assets/8.jpeg', caption: 'Dance Performance 8' },
    { src: 'assets/9.jpeg', caption: 'Dance Performance 9' },
    { src: 'assets/10.jpeg', caption: 'Dance Performance 10' },
    { src: 'assets/11.jpeg', caption: 'Dance Performance 11' },
    { src: 'assets/12.jpeg', caption: 'Dance Performance 12' },
    { src: 'assets/13.jpeg', caption: 'Dance Performance 13' },
    { src: 'assets/14.jpeg', caption: 'Dance Performance 14' },
    { src: 'assets/15.jpeg', caption: 'Dance Performance 15' },
    { src: 'assets/16.jpeg', caption: 'Dance Performance 16' },
    { src: 'assets/17.jpeg', caption: 'Dance Performance 17' },
    { src: 'assets/18.jpeg', caption: 'Dance Performance 18' },
    { src: 'assets/19.jpeg', caption: 'Dance Performance 19' },
    { src: 'assets/20.jpeg', caption: 'Dance Performance 20' },
    { src: 'assets/21.jpeg', caption: 'Dance Performance 21' }
];

let currentImageIndex = 0;

// Update counter display
function updateCounter() {
    const counter = document.getElementById('lightbox-counter');
    if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].caption;
    updateCounter();
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

// Change image in lightbox
function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at the beginning or end
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Add fade effect
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
        lightboxImg.style.opacity = '1';
        updateCounter();
    }, 200);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});

console.log('✨ Bhavayami Nrithalaya website loaded successfully!');

