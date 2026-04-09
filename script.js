document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');

    // Generar corazones flotantes
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .gallery-item, .message-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Scroll suave para el indicador del hero
    const scrollIndicator = document.getElementById('scroll-to-content');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('mensajes').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Control de música
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const musicBtnText = musicBtn.querySelector('.text');
    const musicIcon = musicBtn.querySelector('.icon');

    if (musicBtn && music) {
        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicBtn.classList.add('playing');
                musicBtnText.textContent = 'Pausar Música';
                musicIcon.textContent = '⏸️';
            } else {
                music.pause();
                musicBtn.classList.remove('playing');
                musicBtnText.textContent = 'Reproducir Música';
                musicIcon.textContent = '🎵';
            }
        });
    }

    // Lightbox para Zoom de fotos
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-item img, .regalo-image img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Cerrar lightbox al hacer clic fuera de la imagen
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Efecto de Confeti para el Regalo Especial
    let confettiTriggered = false;
    const regaloSection = document.getElementById('regalo-especial');

    if (regaloSection) {
        const confettiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !confettiTriggered) {
                    confettiTriggered = true;
                    launchConfetti();
                }
            });
        }, { threshold: 0.5 });

        confettiObserver.observe(regaloSection);
    }

    function launchConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // Contador de tiempo juntos
    function updateTimer() {
        const startDate = new Date('2026-02-24T00:00:00'); // Fecha de inicio
        const now = new Date();
        const diff = now - startDate;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }
    }

    // Actualizar cada segundo
    setInterval(updateTimer, 1000);
    updateTimer(); // Llamada inicial
});
