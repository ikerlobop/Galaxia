const container = document.getElementById("stars-container");
const crosshair = document.getElementById("crosshair");

let rayoActivo = false;

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

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 254);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }



function createEnemies() {
    const enemy = document.createElement("div");
    enemy.classList.add("enemies");
    enemy.style.left = `${Math.random() * 100}%`;
    enemy.style.top = `${Math.random() * 100}%`;
    container.appendChild(enemy);
    VideoColorSpace = getRandomColor();
    enemy.style.backgroundColor = VideoColorSpace;
    
    // Elimina la estrella después de 10 segundos
    setTimeout(() => {
        container.removeChild(enemy);
    }, 20000);
}

document.addEventListener("mousemove", (event) => {
    // Obtiene las coordenadas del cursor
    const x = event.clientX;
    const y = event.clientY;

    // Ajusta la posición del punto de mira relativa a la posición del cursor
    crosshair.style.transform = `translate(${x}px, ${y}px)`;
});

function generateStars() {
    createRandomStar();
    setTimeout(generateStars, 75);
}

generateStars();

function generateEnemies() {
    createEnemies();
    setTimeout(generateEnemies, 3000);
}

generateEnemies();


let crosshairVisible = false;

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    // Obtiene las coordenadas del cursor
    const x = event.clientX;
    const y = event.clientY;

    // Ajusta la posición del punto de mira relativa a la posición del cursor
    crosshair.style.transform = `translate(${x}px, ${y}px)`;

    if (crosshairVisible) {
        // Si el punto de mira es visible, lo hacemos invisible
        crosshair.style.display = "none";
    } else {
        // Si el punto de mira es invisible, lo hacemos visible y ajustamos su posición
        const x = event.clientX;
        const y = event.clientY;
        crosshair.style.transform = `translate(${x}px, ${y}px)`;
        crosshair.style.display = "block"; // Otra opción es "inline" o el valor apropiado
    }

    // Alternamos el estado de visibilidad
    crosshairVisible = !crosshairVisible;
   
});



