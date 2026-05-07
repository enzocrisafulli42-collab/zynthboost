// ZYNTH BOOST - Interactive Scripts

// Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const cols = Math.floor(width / 20);
const ypos = Array(cols).fill(0);

function matrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#00d4ff';
    ctx.font = '15px monospace';
    
    ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}

setInterval(matrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Navigation
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    // Active link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navLinksContainer.classList.remove('active');
    });
});

// Animated counters
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    
    const statsSection = document.querySelector('.hero-stats');
    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight) {
        animated = true;
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
}

window.addEventListener('scroll', animateStats);

// Doc cards toggle
function toggleDoc(card) {
    const isActive = card.classList.contains('active');
    
    // Close all
    document.querySelectorAll('.doc-card').forEach(c => {
        c.classList.remove('active');
    });
    
    // Open clicked if wasn't active
    if (!isActive) {
        card.classList.add('active');
    }
}

// Download modal
function showDownloadModal() {
    document.getElementById('downloadModal').classList.add('active');
}

function closeDownloadModal() {
    document.getElementById('downloadModal').classList.remove('active');
}

// Close modal on outside click
document.getElementById('downloadModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('downloadModal')) {
        closeDownloadModal();
    }
});

// Intersection Observer for animations
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

// Observe cards
document.querySelectorAll('.download-card, .doc-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Glitch effect randomization
setInterval(() => {
    const glitch = document.querySelector('.glitch');
    if (glitch) {
        glitch.style.textShadow = `
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(0, 212, 255, 0.8),
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(255, 0, 255, 0.8)
        `;
    }
}, 100);

// Console easter egg
console.log('%cZYNTH BOOST v3.0', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cSYSTEM OVERRIDE ACTIVATED', 'color: #ff00ff; font-size: 14px;');
console.log('%cMaximum Performance Optimization for Windows', 'color: #888; font-size: 12px;');
