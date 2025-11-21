// Datos de 42 BLOCK
const blockData = {
    discordIds: [
        "1180175634954203256",
        "1424102101797175317",
        "1394055342849134593",
        "833041395463880754",
        "1037064195335786506",
        "1216781228624318617",
        "800211811130933271",
        "1049740764361539644"
    ],
    weekdaySchedule: "Lunes a Viernes: 21:00 - 02:00",
    weekendSchedule: "Sábados y Domingos: 15:00 - 03:00",
    neighborhood: {
        location: "[Ubicación del barrio]",
        description: "[Descripción del barrio]"
    },
    ranks: [
        {
            name: "Jefe (Leader)",
            description: "La figura central de 42 BLOCK. El que toma las decisiones más grandes y marca la dirección del bloque. No gobierna por miedo, sino por respeto y por haber demostrado visión, firmeza y capacidad de unir a la familia. En la historia actual, este rol suele estar asociado a: Anthony 'The Anchor' Brown."
        },
        {
            name: "Subjefe (Second-in-Command)",
            description: "La mano que sostiene al líder. Se encarga de coordinar operaciones internas, manejar conflictos, mantener la estructura en orden y asegurarse de que todas las decisiones del Jefe se cumplan. Es la persona que mantiene el equilibrio cuando el líder no está presente. En el lore, este lugar lo ocupa con frecuencia: Deyont 'Iron Hand' Slayter."
        },
        {
            name: "Mano Derecha (Right Hand)",
            description: "El consejero más cercano del Jefe. No siempre es el segundo al mando, pero es quien tiene la confianza absoluta del líder en momentos críticos. Es el encargado de transmitir mensajes, resolver tensiones delicadas y manejar temas donde la palabra pesa más que la fuerza. En la historia, ese rol encaja perfectamente con: Bryan 'Mindset' Connors."
        },
        {
            name: "OG (Original / Elder)",
            description: "Son los veteranos del bloque. Personas que estuvieron presentes desde los primeros días, cuando 42 BLOCK apenas era una promesa. Tienen autoridad moral, experiencia y voz en las decisiones importantes, aunque no siempre ocupen cargos formales. Los OG son la memoria del barrio, los que recuerdan por qué existe la hermandad y qué valores no deben perderse."
        },
        {
            name: "Homie (Miembro / Hermano)",
            description: "El núcleo del 42. Los que trabajan día a día para mantener vivo el bloque: organizan actividades, cuidan a la comunidad, ayudan en proyectos, apoyan a los vecinos, protegen la identidad del grupo. El término 'Homie' no es menor: es alguien que se ganó su lugar por lealtad, constancia y compromiso con el barrio."
        },
        {
            name: "Young Homie (Nueva Generación)",
            description: "Los más nuevos, generalmente jóvenes del barrio que buscan pertenecer a la hermandad. Aprenden de los mayores, participan en tareas comunitarias y se forman en los valores del 42: Respeto, Honestidad, Unidad, Lealtad. Son quienes algún día sostendrán el nombre del bloque cuando los veteranos ya no estén."
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

// Efectos 3D brutales con el mouse
function setup3DEffects() {
    const heroContent = document.querySelector('.hero-content');
    const cards = document.querySelectorAll('.neighborhood-card-3d, .rank-card-3d, .founder-card-3d, .info-card-3d, .discord-card');
    
    // Efecto 3D en hero con mouse
    if (heroContent) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            heroContent.style.transform = `
                translateZ(0)
                rotateX(${y * 8}deg)
                rotateY(${x * 8}deg)
            `;
        });
    }
    
    // Efecto 3D en tarjetas con mouse
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                translateY(-15px) 
                translateZ(40px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Efecto 3D brutal en la imagen del barrio
    const imageWrapper = document.querySelector('.neighborhood-image-wrapper');
    if (imageWrapper) {
        imageWrapper.addEventListener('mousemove', (e) => {
            const rect = imageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            imageWrapper.style.transform = `
                translateZ(30px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });
        
        imageWrapper.addEventListener('mouseleave', () => {
            imageWrapper.style.transform = '';
        });
    }
    
    // Parallax en scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            section.style.transform = `translateZ(${yPos * 0.1}px)`;
        });
    });
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
            <button class="copy-btn" data-id="${id}">
                <span class="copy-text">Copy</span>
                <span class="copy-check" style="display: none;">✓</span>
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
            const copyText = button.querySelector('.copy-text');
            const copyCheck = button.querySelector('.copy-check');
            
            try {
                await navigator.clipboard.writeText(id);
                
                // Cambiar el texto del botón
                copyText.style.display = 'none';
                copyCheck.style.display = 'inline';
                button.classList.add('copied');
                
                // Restaurar después de 2 segundos
                setTimeout(() => {
                    copyText.style.display = 'inline';
                    copyCheck.style.display = 'none';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
                // Fallback para navegadores antiguos
                const textArea = document.createElement('textarea');
                textArea.value = id;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyText.style.display = 'none';
                copyCheck.style.display = 'inline';
                button.classList.add('copied');
                
                setTimeout(() => {
                    copyText.style.display = 'inline';
                    copyCheck.style.display = 'none';
                    button.classList.remove('copied');
                }, 2000);
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
