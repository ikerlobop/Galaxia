const container = document.getElementById("stars-container");
const crosshair = document.getElementById("crosshair");
const circle = document.querySelector(".circle");

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
