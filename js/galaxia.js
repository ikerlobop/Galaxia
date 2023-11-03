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



