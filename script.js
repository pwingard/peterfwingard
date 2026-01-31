// Navigation items - desktop uses fixed px, mobile recalculates
const navItemsBase = [
    { label: 'Peter F. Wingard', labelMobile: 'Peter F. Wingard', url: '#', x: 80, y: 120, isName: true },
    { label: 'Writer', star: 'Alcyone', labelMobile: 'Writer', url: 'https://books.peterfwingard.com', x: 80, y: 200 },
    { label: 'Astrophotographer', star: 'Atlas', labelMobile: 'Astrophotographer', url: 'https://gallery.peterfwingard.com', x: 80, y: 270 },
    { label: 'Web Apps (Astro)', star: 'Electra & Pleione', labelMobile: 'Web Apps (Astro)', url: 'https://astro.peterfwingard.com', x: 80, y: 340 },
    { label: 'Musings', star: 'Maia', labelMobile: 'Musings', url: '#', x: 80, y: 410, placeholder: true },
    { label: 'Social Media', star: 'Merope', labelMobile: 'Social Media', url: 'https://github.com/pwingard', x: 80, y: 480 }
];

let navItems = [];

// Shooting star animation
class ShootingStar {
    constructor(target, index) {
        this.target = target;
        this.index = index;

        // Random start position off-screen
        const angle = Math.random() * Math.PI * 2;
        const distance = 800;
        this.startX = target.x + Math.cos(angle) * distance;
        this.startY = target.y + Math.sin(angle) * distance;

        this.x = this.startX;
        this.y = this.startY;
        this.progress = 0;
        this.delay = index * 300; // Stagger arrivals
        this.hasArrived = false;
        this.startTime = null;
    }

    update(timestamp) {
        if (!this.startTime) this.startTime = timestamp + this.delay;
        if (timestamp < this.startTime) return false;

        const elapsed = timestamp - this.startTime;
        const duration = 1200;

        this.progress = Math.min(elapsed / duration, 1);

        // Easing function
        const eased = 1 - Math.pow(1 - this.progress, 3);

        this.x = this.startX + (this.target.x - this.startX) * eased;
        this.y = this.startY + (this.target.y - this.startY) * eased;

        if (this.progress >= 1) {
            this.hasArrived = true;
            return true;
        }

        return false;
    }

    draw(ctx) {
        if (this.hasArrived) return;

        const trailLength = 60;
        const angle = Math.atan2(this.target.y - this.startY, this.target.x - this.startX);

        const gradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x - Math.cos(angle) * trailLength,
            this.y - Math.sin(angle) * trailLength
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.progress})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(angle) * trailLength,
            this.y - Math.sin(angle) * trailLength
        );
        ctx.stroke();

        // Star head
        ctx.fillStyle = `rgba(255, 255, 255, ${this.progress})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize
const frame = document.getElementById('main-frame');
const canvas = document.getElementById('shooting-stars-canvas');
const navContainer = document.getElementById('nav-container');
const ctx = canvas.getContext('2d');

let shootingStars = [];
let animationStarted = false;

function resizeCanvas() {
    const rect = frame.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const isMobile = window.innerWidth <= 480;

    // Use base positions from navItemsBase
    navItems = navItemsBase.map(item => ({
        ...item,
        x: isMobile ? 20 : item.x,
        y: item.y
    }));
}

function createNavElements() {
    const isMobile = window.innerWidth <= 480;

    navItems.forEach((item, index) => {
        const link = document.createElement('a');
        link.href = item.url;
        link.className = item.isName ? 'nav-link name' : 'nav-link';

        // For items with star names, create two lines (on both desktop and mobile)
        if (item.star) {
            link.innerHTML = `${isMobile ? item.labelMobile : item.label}<br><span class="star-name">(${item.star})</span>`;
        } else {
            link.textContent = isMobile ? item.labelMobile : item.label;
        }

        link.style.position = 'absolute';
        link.style.left = `${item.x}px`;
        link.style.top = `${item.y}px`;
        link.style.opacity = '0';

        if (item.isName || item.placeholder) {
            link.addEventListener('click', (e) => e.preventDefault());
        }

        if (item.placeholder) {
            link.style.opacity = '0.5';
        }

        navContainer.appendChild(link);
        item.element = link;
    });
}

function animateShootingStars(timestamp) {
    if (!animationStarted) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shootingStars.forEach(star => {
        const arrived = star.update(timestamp);
        if (!arrived) {
            star.draw(ctx);
        } else if (star.target.element && star.target.element.style.opacity === '0') {
            // Fade in the label
            star.target.element.style.transition = 'opacity 0.5s ease';
            star.target.element.style.opacity = '1';
        }
    });

    requestAnimationFrame(animateShootingStars);
}

function startAnimation() {
    shootingStars = navItems.map((item, index) => new ShootingStar(item, index));
    animationStarted = true;
    requestAnimationFrame(animateShootingStars);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    createNavElements();

    // Start animation after short delay
    setTimeout(startAnimation, 800);

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Update existing element positions
        navItems.forEach(item => {
            if (item.element) {
                item.element.style.left = `${item.x}px`;
                item.element.style.top = `${item.y}px`;
            }
        });
    });
});
