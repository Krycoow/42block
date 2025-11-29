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
        "771708899598008370",
        "325188874049425453"
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
    try {
        loadInfo();
        loadNeighborhood();
        loadRanks();
        loadDiscordIds();
        setup3DEffects();
        createAdvancedParticles();
        setupMouseTracking();
    } catch (error) {
        console.error('Error al cargar la página:', error);
    }
});

// Efectos 3D avanzados e interactivos
function setup3DEffects() {
    // Parallax 3D mejorado
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                try {
                    const scrolled = window.pageYOffset || window.scrollY || 0;
                    const hero = document.querySelector('.hero');
                    const sections = document.querySelectorAll('section');
                    
                    if (hero) {
                        const parallax = scrolled * 0.4;
                        hero.style.transform = `translateY(${parallax}px) translateZ(${-parallax * 0.3}px)`;
                    }
                    
                    sections.forEach((section, index) => {
                        if (section) {
                            const speed = 0.1 + (index * 0.05);
                            const yPos = scrolled * speed;
                            section.style.transform = `translateZ(${-yPos * 0.2}px)`;
                        }
                    });
                } catch (error) {
                    console.error('Error en parallax:', error);
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Intersection Observer mejorado
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateZ(0) rotateX(0deg)';
                entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.history-section-3d, .neighborhood-card-3d, .rank-card-3d, .founder-card-3d, .info-card-3d, .discord-card, .lore-item, .barrio-image-card').forEach(el => {
        observer.observe(el);
    });
    
    // Efectos 3D en hover para cards
    const cards = document.querySelectorAll('.rank-card-3d, .founder-card-3d, .info-card-3d, .discord-card, .lore-item, .neighborhood-card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                translateY(-15px) 
                translateZ(50px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Seguimiento del mouse para efectos 3D
function setupMouseTracking() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        heroContent.style.transform = `
            translateZ(0)
            rotateX(${currentY * 8}deg)
            rotateY(${currentX * 8}deg)
        `;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Partículas avanzadas con movimiento 3D - Azul marino
function createAdvancedParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    try {
        // Crear más partículas con diferentes tamaños y velocidades - colores azul marino
        for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        // Colores azul marino variados
        const colorType = Math.random();
        let r, g, b;
        if (colorType < 0.3) {
            r = 0; g = 31; b = 63; // Navy dark
        } else if (colorType < 0.6) {
            r = 0; g = 51; b = 102; // Navy bright
        } else if (colorType < 0.8) {
            r = 0; g = 34; b = 68; // Navy medium
        } else {
            r = 0; g = 64; b = 128; // Navy light
        }
        const alpha = Math.random() * 0.5 + 0.4;
        const duration = Math.random() * 25 + 18;
        const delay = Math.random() * 6;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(${r}, ${g}, ${b}, ${alpha}) 0%, rgba(${r}, ${g}, ${b}, 0) 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            box-shadow: 
                0 0 ${size * 4}px rgba(${r}, ${g}, ${b}, 0.9),
                0 0 ${size * 8}px rgba(${r}, ${g}, ${b}, 0.5),
                0 0 ${size * 12}px rgba(${r}, ${g}, ${b}, 0.3);
            animation: particleFloat3D ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            z-index: 1;
        `;
        
            hero.appendChild(particle);
        }
    } catch (error) {
        console.error('Error al crear partículas:', error);
        return;
    }
    
    // Agregar keyframes dinámicos
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat3D {
                0%, 100% {
                    transform: translate(0, 0) translateZ(0) scale(1);
                    opacity: 0.4;
                }
                25% {
                    transform: translate(50px, -50px) translateZ(30px) scale(0.9);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-50px, 50px) translateZ(60px) scale(1.1);
                    opacity: 0.5;
                }
                75% {
                    transform: translate(30px, 30px) translateZ(40px) scale(0.95);
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Añadir partículas que siguen el mouse
    let mouseParticleCount = 0;
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95 && mouseParticleCount < 5) { // Crear partícula ocasionalmente, máximo 5
            mouseParticleCount++;
            createMouseParticle(e.clientX, e.clientY);
            setTimeout(() => {
                mouseParticleCount--;
            }, 1000);
        }
    });
}

// Crear partícula que sigue el mouse - Azul marino
function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 5 + 3;
    // Colores azul marino
    const colorType = Math.random();
    let r, g, b;
    if (colorType < 0.5) {
        r = 0; g = 51; b = 102; // Navy bright
    } else {
        r = 0; g = 34; b = 68; // Navy medium
    }
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.9) 0%, rgba(${r}, ${g}, ${b}, 0) 70%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        box-shadow: 
            0 0 ${size * 6}px rgba(${r}, ${g}, ${b}, 1),
            0 0 ${size * 12}px rgba(${r}, ${g}, ${b}, 0.6);
        z-index: 9999;
        animation: mouseParticleFade 1.2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1200);
    
    // Agregar keyframe si no existe
    if (!document.getElementById('mouse-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'mouse-particle-styles';
        style.textContent = `
            @keyframes mouseParticleFade {
                0% {
                    opacity: 1;
                    transform: scale(1) translate(0, 0);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) translate(30px, -30px);
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
                
                const copyText = button.querySelector('.copy-text');
                const originalText = copyText.textContent;
                copyText.textContent = '¡Copiado!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    copyText.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
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
    
    setupBarriosGallery();
}

function setupBarriosGallery() {
    const showBtn = document.getElementById('show-barrios-btn');
    const closeBtn = document.getElementById('close-gallery-btn');
    const gallery = document.getElementById('barrios-gallery');
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!showBtn || !gallery || !galleryGrid) return;
    
    showBtn.addEventListener('click', () => {
        gallery.style.display = 'block';
        loadBarriosImages();
        
        setTimeout(() => {
            gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            gallery.style.display = 'none';
        });
    }
}

function loadBarriosImages() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
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
    
    barrios.forEach((imagePath, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'barrio-image-card';
        imageCard.style.animationDelay = `${index * 0.1}s`;
        imageCard.innerHTML = `
            <div class="barrio-image-wrapper">
                <img src="${imagePath}" alt="Barrio ${index + 1} de OBLOCK" class="barrio-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="image-error" style="display:none; padding: 40px; text-align: center; color: var(--text-dim);">
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
        ranksGrid.innerHTML = '<p style="text-align: center; color: var(--text-dim); grid-column: 1 / -1;">[Los rangos se agregarán aquí]</p>';
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
