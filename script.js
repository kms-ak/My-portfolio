// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
});

// Netflix-Style Particle System for Hero Section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;
    const colors = ['rgba(229, 9, 20, 0.6)', 'rgba(178, 7, 16, 0.5)', 'rgba(229, 9, 20, 0.4)', 'rgba(178, 7, 16, 0.3)'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.4 + 0.2;
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 ${Math.random() * 8 + 3}px ${particle.style.background}`;
        particle.style.filter = 'blur(0.5px)';
        
        const animationDuration = Math.random() * 15 + 15;
        const animationDelay = Math.random() * 5;
        
        particle.style.animation = `netflixParticleFloat ${animationDuration}s ${animationDelay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// Add Netflix-style particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes netflixParticleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(60px, -60px) scale(1.1);
            opacity: 0.5;
        }
        50% {
            transform: translate(-40px, -100px) scale(0.9);
            opacity: 0.2;
        }
        75% {
            transform: translate(40px, -50px) scale(1.05);
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(style);

// Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blink cursor
            setTimeout(() => {
                const cursor = element.parentElement.querySelector('.cursor-blink');
                if (cursor) cursor.style.display = 'inline';
            }, 500);
        }
    }
    
    type();
}

// Initialize typing effect
const typingText = document.getElementById('typingText');
if (typingText) {
    const texts = ['Full Stack Developer', 'Creative Designer', 'Problem Solver', 'Code Enthusiast'];
    let currentTextIndex = 0;
    let isTyping = false;
    
    function startTyping() {
        if (isTyping) return;
        isTyping = true;
        
        const cursor = document.querySelector('.cursor-blink');
        if (cursor) cursor.style.display = 'none';
        
        const currentText = texts[currentTextIndex];
        typeWriter(typingText, currentText, 80);
        
        const typingDuration = currentText.length * 80;
        
        setTimeout(() => {
            isTyping = false;
            if (cursor) cursor.style.display = 'inline';
            
            // Wait before erasing
            setTimeout(() => {
                // Erase text
                let eraseIndex = currentText.length;
                const eraseInterval = setInterval(() => {
                    if (eraseIndex > 0) {
                        typingText.textContent = currentText.substring(0, eraseIndex - 1);
                        eraseIndex--;
                    } else {
                        clearInterval(eraseInterval);
                        // Move to next text
                        currentTextIndex = (currentTextIndex + 1) % texts.length;
                        setTimeout(startTyping, 500);
                    }
                }, 30);
            }, 2000);
        }, typingDuration);
    }
    
    // Start typing after a delay
    setTimeout(() => {
        startTyping();
    }, 1000);
}

// Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target >= 100 ? '+' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target >= 100 ? '+' : '+');
        }
    }, 16);
}

// Observe stat items for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItem = entry.target;
            const numberElement = statItem.querySelector('.stat-number');
            const targetNumber = parseInt(statItem.getAttribute('data-number'));
            
            if (numberElement && !statItem.classList.contains('counted')) {
                statItem.classList.add('counted');
                animateCounter(numberElement, targetNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// Progress Bar Animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = parseInt(progressBar.getAttribute('data-progress'));
            
            if (!progressBar.classList.contains('animated')) {
                progressBar.classList.add('animated');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
});

// Scroll Animation for Elements
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

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .about-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Create particles
    createParticles();
});

// Contact Form Handling with Animation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Create success animation
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.style.background = 'linear-gradient(135deg, #06ffa5, #3a86ff)';
            
            // Create particle effect
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.position = 'absolute';
                    particle.style.width = '10px';
                    particle.style.height = '10px';
                    particle.style.background = '#ffd700';
                    particle.style.borderRadius = '50%';
                    particle.style.left = submitBtn.offsetLeft + submitBtn.offsetWidth / 2 + 'px';
                    particle.style.top = submitBtn.offsetTop + submitBtn.offsetHeight / 2 + 'px';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '1000';
                    document.body.appendChild(particle);
                    
                    const angle = (Math.PI * 2 * i) / 10;
                    const distance = 100;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    particle.animate([
                        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
                    ], {
                        duration: 1000,
                        easing: 'ease-out'
                    }).onfinish = () => particle.remove();
                }, i * 50);
            }
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #06ffa5, #3a86ff)';
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        } else {
            // Shake animation for error
            contactForm.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 500,
                easing: 'ease-in-out'
            });
        }
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && scrolled < hero.offsetHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
        }
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Mouse Move Parallax for Cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Netflix-style Dynamic Background Intensity on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const animatedBg = document.querySelector('.animated-bg');
    const floatingShapes = document.querySelector('.floating-shapes');
    
    if (animatedBg && floatingShapes) {
        // Subtle intensity change based on scroll
        const intensity = Math.min(scrolled / 1000, 0.3);
        floatingShapes.style.opacity = 0.6 + intensity;
    }
});

// Add active class to nav links on page load
window.addEventListener('load', () => {
    activateNavLink();
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    if (section.id !== 'home') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    }
});

// Cursor Trail Effect (Optional - can be disabled for performance)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '10px';
        trail.style.height = '10px';
        trail.style.background = `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5), transparent)`;
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.zIndex = '9999';
        trail.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.style.opacity = '0';
            setTimeout(() => oldTrail.remove(), 500);
        }
        
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                if (trail.parentNode) trail.remove();
                cursorTrail = cursorTrail.filter(t => t !== trail);
            }, 500);
        }, 300);
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
