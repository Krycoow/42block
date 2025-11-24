// Datos de OBLOCK
const blockData = {
    discordIds: [
        "1180175634954203256",
        "1424102101797175317",
        "1394055342849134593",
        "833041395463880754",
        "1037064195335786506",
        "1216781228624318617",
        "800211811130933271",
        "1049740764361539644",
        "NUEVO_ID_AQUI"
    ],
    weekdaySchedule: "Lunes a Viernes: 21:00 - 02:00",
    weekendSchedule: "Sábados y Domingos: 15:00 - 03:00",
    neighborhood: {
        location: "Haz clic para ver los posibles barrios de OBLOCK",
        description: "[Descripción del barrio]",
        barrios: [
            "IMG_1296.jpg",
            "IMG_1298.jpg",
            "IMG_1299.jpg"
        ]
    },
    ranks: [
        {
            name: "Jefe (Leader)",
            description: "La máxima autoridad. Guía la O, toma decisiones mayores, marca el futuro del bloque. No gobierna por miedo, sino por respeto y por haber demostrado visión, firmeza y capacidad de unir a la familia."
        },
        {
            name: "Subjefe (Second-in-Command)",
            description: "Su mano izquierda. Coordina todo lo interno, mantiene el orden y equilibra el bloque. Se encarga de coordinar operaciones internas, manejar conflictos y asegurarse de que todas las decisiones del Jefe se cumplan."
        },
        {
            name: "Mano Derecha (Right Hand)",
            description: "El consejero cercano del Jefe. Gestiona tareas delicadas, transmite decisiones y evita conflictos. Es quien tiene la confianza absoluta del líder en momentos críticos."
        },
        {
            name: "OG (Originals)",
            description: "Los veteranos que estuvieron desde el inicio. Memoria, respeto y experiencia pura. Tienen autoridad moral, experiencia y voz en las decisiones importantes, aunque no siempre ocupen cargos formales. Los OG son la memoria del barrio, los que recuerdan por qué existe la hermandad y qué valores no deben perderse."
        },
        {
            name: "Homie (Miembro Activo)",
            description: "El centro de la O. Los que trabajan día a día por el bloque y por el barrio. Organizan actividades, cuidan a la comunidad, ayudan en proyectos, apoyan a los vecinos, protegen la identidad del grupo. El término 'Homie' no es menor: es alguien que se ganó su lugar por lealtad, constancia y compromiso con el barrio."
        },
        {
            name: "Young Homie (Nueva Generación)",
            description: "Los nuevos integrantes. Aprenden, apoyan y crecen bajo la guía de los mayores. Participan en tareas comunitarias y se forman en los valores de OBLOCK: Respeto, Unidad, Lealtad. Son quienes algún día sostendrán el nombre del bloque cuando los veteranos ya no estén."
        }
    ]
};

// Cargar información cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    loadInfo();
    loadNeighborhood();
    loadRanks();
    loadDiscordIds();
    setup3DEffects();
});

// Efectos 3D BRUTALES y dramáticos
function setup3DEffects() {
    const heroContent = document.querySelector('.hero-content');
    const cards = document.querySelectorAll('.neighborhood-card-3d, .rank-card-3d, .founder-card-3d, .info-card-3d, .discord-card, .lore-item');
    const sectionTitles = document.querySelectorAll('.section-title-3d');
    
    // Efecto 3D BRUTAL en hero con mouse - más pronunciado
    if (heroContent) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
        
        function animateHero() {
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;
            
            heroContent.style.transform = `
                translateZ(0)
                rotateX(${currentY * 12}deg)
                rotateY(${currentX * 12}deg)
                perspective(1000px)
            `;
            
            requestAnimationFrame(animateHero);
        }
        
        animateHero();
    }
    
    // Efecto 3D BRUTAL en títulos de sección
    sectionTitles.forEach(title => {
        title.addEventListener('mousemove', (e) => {
            const rect = title.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            title.style.transform = `
                translateZ(30px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
            `;
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.transform = '';
        });
    });
    
    // Efecto 3D BRUTAL en tarjetas con mouse - más dramático
    cards.forEach(card => {
        let cardMouseX = 0;
        let cardMouseY = 0;
        let cardCurrentX = 0;
        let cardCurrentY = 0;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            cardMouseX = (x - centerX) / centerX;
            cardMouseY = (y - centerY) / centerY;
        });
        
        function animateCard() {
            cardCurrentX += (cardMouseX - cardCurrentX) * 0.2;
            cardCurrentY += (cardMouseY - cardCurrentY) * 0.2;
            
            const rotateX = cardCurrentY * 15;
            const rotateY = cardCurrentX * 15;
            
            if (Math.abs(cardMouseX) > 0.01 || Math.abs(cardMouseY) > 0.01) {
                card.style.transform = `
                    translateY(-20px)
                    translateZ(60px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.03)
                    perspective(1000px)
                `;
            }
            
            requestAnimationFrame(animateCard);
        }
        
        animateCard();
        
        card.addEventListener('mouseleave', () => {
            cardMouseX = 0;
            cardMouseY = 0;
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });
    
    // Efecto 3D BRUTAL en la imagen del barrio
    const imageWrapper = document.querySelector('.neighborhood-image-wrapper');
    if (imageWrapper) {
        let imgMouseX = 0;
        let imgMouseY = 0;
        let imgCurrentX = 0;
        let imgCurrentY = 0;
        
        imageWrapper.addEventListener('mousemove', (e) => {
            const rect = imageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            imgMouseX = (x - centerX) / centerX;
            imgMouseY = (y - centerY) / centerY;
        });
        
        function animateImage() {
            imgCurrentX += (imgMouseX - imgCurrentX) * 0.15;
            imgCurrentY += (imgMouseY - imgCurrentY) * 0.15;
            
            const rotateX = imgCurrentY * 12;
            const rotateY = imgCurrentX * 12;
            
            if (Math.abs(imgMouseX) > 0.01 || Math.abs(imgMouseY) > 0.01) {
                imageWrapper.style.transform = `
                    translateY(-15px)
                    translateZ(60px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.03)
                    perspective(1000px)
                `;
            }
            
            requestAnimationFrame(animateImage);
        }
        
        animateImage();
        
        imageWrapper.addEventListener('mouseleave', () => {
            imgMouseX = 0;
            imgMouseY = 0;
            setTimeout(() => {
                imageWrapper.style.transform = '';
            }, 300);
        });
    }
    
    // Parallax BRUTAL en scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                const sections = document.querySelectorAll('section');
                
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px) translateZ(${-scrolled * 0.3}px)`;
                }
                
                sections.forEach((section, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrolled * speed;
                    section.style.transform = `translateZ(${-yPos * 0.2}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Intersection Observer mejorado para animaciones
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -150px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateZ(0) rotateX(0deg)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones y elementos
    document.querySelectorAll('.history-section-3d, .neighborhood-card-3d, .rank-card-3d, .founder-card-3d, .info-card-3d, .discord-card, .lore-item, .section-title-3d').forEach(el => {
        observer.observe(el);
    });
    
    // Efecto de partículas en el fondo (simulado con elementos)
    createParticleEffect();
}

// Crear efecto de partículas flotantes
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 0, 0, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px rgba(255, 0, 0, 0.6)`;
        particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.zIndex = '1';
        hero.appendChild(particle);
    }
    
    // Agregar keyframes para partículas
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) translateZ(0);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) translateZ(${Math.random() * 50}px);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) translateZ(${Math.random() * 50}px);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) translateZ(${Math.random() * 50}px);
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function loadInfo() {
    const weekdayElement = document.getElementById('weekday-schedule');
    const weekendElement = document.getElementById('weekend-schedule');
    
    if (weekdayElement) {
        weekdayElement.textContent = blockData.weekdaySchedule;
    }
    
    if (weekendElement) {
        weekendElement.textContent = blockData.weekendSchedule;
    }
}

function loadDiscordIds() {
    const discordGrid = document.getElementById('discord-grid');
    if (!discordGrid) return;
    
    discordGrid.innerHTML = '';
    
    blockData.discordIds.forEach((id, index) => {
        const discordCard = document.createElement('div');
        discordCard.className = 'discord-card';
        discordCard.style.animationDelay = `${(index + 1) * 0.1}s`;
        discordCard.innerHTML = `
            <div class="discord-icon">💬</div>
            <p class="discord-id">${id}</p>
            <button class="copy-btn" data-id="${id}" title="Copiar ID">
                <span class="copy-icon">📋</span>
                <span class="copy-text">Copiar</span>
            </button>
        `;
        discordGrid.appendChild(discordCard);
    });
    
    // Agregar event listeners a los botones de copiar
    setupCopyButtons();
}

function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = button.getAttribute('data-id');
            
            try {
                await navigator.clipboard.writeText(id);
                
                // Cambiar el texto del botón temporalmente
                const copyText = button.querySelector('.copy-text');
                const originalText = copyText.textContent;
                copyText.textContent = '¡Copiado!';
                button.classList.add('copied');
                
                // Restaurar el texto después de 2 segundos
                setTimeout(() => {
                    copyText.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                // Fallback para navegadores que no soportan clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = id;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    const copyText = button.querySelector('.copy-text');
                    const originalText = copyText.textContent;
                    copyText.textContent = '¡Copiado!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        copyText.textContent = originalText;
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar:', err);
                }
                
                document.body.removeChild(textArea);
            }
        });
    });
}

function loadNeighborhood() {
    const locationElement = document.getElementById('neighborhood-location');
    const descriptionElement = document.getElementById('neighborhood-description');
    
    if (locationElement) {
        locationElement.textContent = blockData.neighborhood.location;
    }
    
    if (descriptionElement) {
        descriptionElement.textContent = blockData.neighborhood.description;
    }
    
    // Configurar botón para mostrar galería
    setupBarriosGallery();
}

function setupBarriosGallery() {
    const showBtn = document.getElementById('show-barrios-btn');
    const closeBtn = document.getElementById('close-gallery-btn');
    const gallery = document.getElementById('barrios-gallery');
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!showBtn || !gallery || !galleryGrid) return;
    
    // Mostrar galería
    showBtn.addEventListener('click', () => {
        gallery.style.display = 'block';
        loadBarriosImages();
        
        // Scroll suave a la galería
        setTimeout(() => {
            gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });
    
    // Cerrar galería
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            gallery.style.display = 'none';
        });
    }
}

function loadBarriosImages() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Limpiar galería
    galleryGrid.innerHTML = '';
    
    const barrios = blockData.neighborhood.barrios;
    
    if (barrios.length === 0) {
        galleryGrid.innerHTML = `
            <div class="no-images-message">
                <p>Las imágenes de los barrios se agregarán próximamente</p>
            </div>
        `;
        return;
    }
    
    // Crear cards para cada imagen
    barrios.forEach((imagePath, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'barrio-image-card';
        imageCard.style.animationDelay = `${index * 0.1}s`;
        imageCard.innerHTML = `
            <div class="barrio-image-wrapper">
                <img src="${imagePath}" alt="Barrio ${index + 1} de OBLOCK" class="barrio-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="image-error" style="display:none; padding: 40px; text-align: center; color: var(--text-gray);">
                    Imagen no encontrada: ${imagePath}
                </div>
            </div>
        `;
        galleryGrid.appendChild(imageCard);
    });
}

function loadRanks() {
    const ranksGrid = document.getElementById('ranks-grid');
    if (!ranksGrid) return;
    
    ranksGrid.innerHTML = '';
    
    if (blockData.ranks.length === 0) {
        ranksGrid.innerHTML = '<p style="text-align: center; color: var(--text-gray); grid-column: 1 / -1;">[Los rangos se agregarán aquí]</p>';
        return;
    }
    
    blockData.ranks.forEach(rank => {
        const rankCard = document.createElement('div');
        rankCard.className = 'rank-card-3d';
        rankCard.innerHTML = `
            <h3 class="rank-name">${rank.name}</h3>
            <p class="rank-description">${rank.description}</p>
        `;
        ranksGrid.appendChild(rankCard);
    });
}
