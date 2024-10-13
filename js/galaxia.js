const container = document.getElementById("stars-container");
const crosshair = document.getElementById("crosshair");
const ship = document.getElementById("ship");

let crosshairVisible = false;
let rayoActivo = false; // Para controlar cuando hay un rayo activo

// Función para crear una estrella aleatoria
function createRandomStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    container.appendChild(star);

    // Elimina la estrella después de 10 segundos
    setTimeout(() => {
        container.removeChild(star);
    }, 10000);
}

// Función para obtener un color aleatorio
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 254);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Función para crear enemigos
function createEnemies() {
    const enemy = document.createElement("div");
    enemy.classList.add("enemies");
    enemy.style.left = `${Math.random() * 100}%`;
    enemy.style.top = `${Math.random() * 100}%`;
    container.appendChild(enemy);

    // Asigna un color aleatorio al enemigo
    const enemyColor = getRandomColor();
    enemy.style.backgroundColor = enemyColor;

    // Elimina el enemigo después de 20 segundos
    setTimeout(() => {
        if (enemy.parentElement) {
            container.removeChild(enemy);
        }
    }, 20000);
}

// Función para crear una bala
function createBullet(targetX, targetY) {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");

    // La bala se posiciona inicialmente donde está la nave
    const shipRect = ship.getBoundingClientRect();
    bullet.style.left = `${shipRect.left + shipRect.width / 2}px`;
    bullet.style.top = `${shipRect.top}px`;

    container.appendChild(bullet);

    // Movimiento de la bala hacia el puntero
    const angle = Math.atan2(targetY - shipRect.top, targetX - (shipRect.left + shipRect.width / 2));
    const velocityX = Math.cos(angle) * 5; // Velocidad en X
    const velocityY = Math.sin(angle) * 5; // Velocidad en Y

    function moveBullet() {
        const bulletRect = bullet.getBoundingClientRect();

        bullet.style.left = `${bulletRect.left + velocityX}px`;
        bullet.style.top = `${bulletRect.top + velocityY}px`;

        // Detectar colisión con enemigos
        const enemies = document.querySelectorAll(".enemies");
        enemies.forEach(enemy => {
            const enemyRect = enemy.getBoundingClientRect();
            if (
                bulletRect.left < enemyRect.left + enemyRect.width &&
                bulletRect.left + bulletRect.width > enemyRect.left &&
                bulletRect.top < enemyRect.top + enemyRect.height &&
                bulletRect.top + bulletRect.height > enemyRect.top
            ) {
                // Si colisiona con un enemigo, eliminamos ambos y creamos la explosión
                createExplosion(enemyRect.left + enemyRect.width / 2, enemyRect.top + enemyRect.height / 2); // Explosión en el centro del enemigo
                container.removeChild(bullet);
                container.removeChild(enemy);
            }
        });

        // Eliminar la bala si sale de la pantalla
        if (
            bulletRect.left < 0 ||
            bulletRect.top < 0 ||
            bulletRect.left > window.innerWidth ||
            bulletRect.top > window.innerHeight
        ) {
            container.removeChild(bullet);
        } else {
            requestAnimationFrame(moveBullet);
        }
    }

    moveBullet();
}

// Función para crear una explosión con partículas
function createExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.classList.add("explosion-particle");
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = getRandomColor(); // Colores aleatorios para las partículas

        container.appendChild(particle);

        // Movimiento aleatorio de las partículas
        const velocityX = (Math.random() - 0.5) * 10;
        const velocityY = (Math.random() - 0.5) * 10;

        function moveParticle() {
            particle.style.left = `${parseFloat(particle.style.left) + velocityX}px`;
            particle.style.top = `${parseFloat(particle.style.top) + velocityY}px`;
            particle.style.opacity = 0; // La partícula se desvanece

            setTimeout(() => {
                container.removeChild(particle);
            }, 500); // Elimina la partícula después de 0.5 segundos
        }

        moveParticle();
    }
}

// Evento de disparo al hacer clic izquierdo
document.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    createBullet(x, y); // Dispara hacia el punto donde se hizo clic
});

// Movimiento del punto de mira
document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    crosshair.style.transform = `translate(${x - 30}px, ${y - 30}px)`;
});

// Alternar visibilidad del punto de mira con clic derecho
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    crosshair.style.display = crosshairVisible ? "none" : "block";
    crosshairVisible = !crosshairVisible;
});

// Generación continua de estrellas
function generateStars() {
    createRandomStar();
    setTimeout(generateStars, 75);
}

generateStars();

// Generación continua de enemigos
function generateEnemies() {
    createEnemies();
    setTimeout(generateEnemies, 3000);
}

generateEnemies();
