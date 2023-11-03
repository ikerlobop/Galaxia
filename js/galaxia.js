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

const rayo = document.querySelector(".rayo");

document.addEventListener("click", (event) => {
    if (!rayoActivo) {
        // Marcamos el rayo como activo para evitar clics adicionales
        rayoActivo = true;

        // Obtiene las coordenadas del punto de mira
        const crosshairRect = crosshair.getBoundingClientRect();
        const crosshairX = crosshairRect.left + crosshairRect.width / 2;
        const crosshairY = crosshairRect.top + crosshairRect.height / 2;

        // Obtiene las coordenadas del evento de clic
        const clickX = event.clientX;
        const clickY = event.clientY;

        // Calcula las diferencias en coordenadas
        const diffX = crosshairX - clickX;
        const diffY = crosshairY - clickY;

        // Aplica la transformación para el rayo
        rayo.style.transform = `translate(-50%, -100%) translateX(${diffX}px) translateY(${diffY}px) scaleY(1)`;

        // Restablece los rayos después de un tiempo
        setTimeout(() => {
            rayo.style.transform = "translate(-50%, -100%) translateX(0) translateY(0) scaleY(0)";
            
            // Marcamos el rayo como inactivo después de desaparecer
            rayoActivo = false;
        }, 200);
    }
});



