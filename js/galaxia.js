const container = document.getElementById("stars-container");
const crosshair = document.getElementById("crosshair-container");
const circle = document.querySelector(".circle");

function createRandomStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    container.appendChild(star);

    // Elimina la estrella después de 5 segundos
    setTimeout(() => {
        container.removeChild(star);
    }, 10000);
}


function generateStars() {
    createRandomStar();
    setTimeout(generateStars, 75);
}

generateStars();

