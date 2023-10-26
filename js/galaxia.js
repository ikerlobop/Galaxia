const container = document.getElementById("stars-container");

function createRandomStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    container.appendChild(star);
}

function generateStars() {
    createRandomStar();
    setTimeout(generateStars, 25); // Genera una nueva estrella cada 200 milisegundos
}

generateStars();
