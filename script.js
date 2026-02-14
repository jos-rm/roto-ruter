const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if(hamburger && navMenu){
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    //cerrar menu al darle clic a un link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('link', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

//smoth scroll
document.querySelector('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientReact().top;
            const offsetPosition = elementPosition + window.pageXOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

//header scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageXOffset;

    if(currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';

    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

//animacion de scroll
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

//elementos para animacion
const animateOnScroll = document.querySelectorAll('.servicio-card, .feature-box, .info-card, .galeria-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

//enviar form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //obtener informacion del form
        const formData = {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            servicio: document.getElementById('servicio').value,
            mensaje: document.getElementById('mensaje').value
        };

        //crear mensaje en whatsapp
        const whatsappNumber = '50683825055';
        let message = `*Nueva Solicitud de Cotización*%0A%0A`;
        message += `*Nombre:* ${formData.nombre}%0A`;
        message += `*Teléfono:* ${formData.telefono}%0A`;
        if (formData.email) {
            message += `*Email:* ${formData.email}%0A`;
        }
        message += `*Servicio:* ${formData.servicio}%0A`;
        if (formData.mensaje) {
            message += `*Mensaje:* ${formData.mensaje}%0A`;
        }

        //abrir whatsapp con el mensaje
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

        alert('¡Gracias por su solicitud! Lo redirigiremos a WhatsApp para completar su cotización.');

        //resetear form
        contactForm.reset();
    });
}

//animacion de carga en los botones
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    buttons.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

//efecto fondo
window.addEventListener('scroll', () => {
    const scrolled = window.pageXOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

//año dinamico en footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
}

//efecto cards de servicio
const servicioCards = document.querySelectorAll('.servicio-card');
servicioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#FFD000';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});

//animacion stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

//observe stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text.replace('+', ''));
                    stat.textContent = '0';
                    animateCounter(stat, number);
                    setTimeout(() => {
                        stat.textContent = text; //restuara texto original con +
                    }, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.nosotros-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

//carga de imagenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

//efecto a los botones
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientReact();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

//mensaje en consola
console.log('%c🔧 Roto Ruter - Destaqueos y Fontanería 24/7', 'font-size: 16px; font-weight: bold; color: #FFD000;');
console.log('%cServicio profesional en todo Costa Rica', 'font-size: 12px; color: #666;');
console.log('%cContacto: 8382-5055', 'font-size: 12px; color: #DC2626; font-weight: bold;');