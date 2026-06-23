if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// Estrellas
const container = document.getElementById("stars-container");

for(let i = 0; i < 80; i++){

    const star = document.createElement("div");

    star.classList.add("star");

    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    star.style.animationDuration =
        (Math.random() * 3 + 1) + "s";

    star.style.animationDelay =
        Math.random() * 5 + "s";

    const size =
        Math.random() * 4 + 2;

    star.style.width = size + "px";
    star.style.height = size + "px";

    container.appendChild(star);
}


const eventDate = new Date("2026-07-5 14:30:00");

function updateCountdown(){

    const now = new Date();

    const diff = eventDate - now;

    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    const hours = Math.floor(
        diff / 1000 / 60 / 60 % 24
    );

    const minutes = Math.floor(
        diff / 1000 / 60 % 60
    );

    const seconds = Math.floor(
        diff / 1000 % 60
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown,1000);

updateCountdown();


// Nubes
window.addEventListener("load", () => {

    const cloudsContainer =
    document.getElementById("clouds-container");

    const pageHeight =
    document.documentElement.scrollHeight;

    for(let i = 0; i < 15; i++){

        const cloud =
        document.createElement("div");

        cloud.classList.add("cloud");

        const size =
       Math.random() * 180 + 120;

        cloud.style.width =
        size + "px";

        cloud.style.height =
        size * 0.35 + "px";

        cloud.style.left =
        Math.random() * 100 + "%";

        cloud.style.top =
        Math.random() * pageHeight + "px";

        cloud.style.animationDuration =
        (Math.random() * 8 + 8) + "s";

        cloud.style.animationDelay =
        (Math.random() * 5) + "s";

        cloudsContainer.appendChild(cloud);
    }

 

})



const URL = "https://script.google.com/macros/s/AKfycbx_OC8Lvhqvz3gqvy4YbC2HLoFTvQtfECfb2Ss1_Nm0iv00ODmNg5n9fpPI16cXYpph/exec";

// Mensajes para Vickey
document.getElementById("messageForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const datos = {
        tipo: "mensaje",
        nombre: this.nombre.value,
        mensaje: this.mensaje.value
    };

    await fetch(URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(datos)
    });

    mostrarMensaje("💛 Gracias por tu hermoso mensaje para Vickey 🌸");

    this.reset();
});


// Confirmar asistencia
document.getElementById("rsvpForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const datos = {
        tipo: "asistencia",
        nombre: this.nombre.value,
        asistentes: this.asistentes.value
    };

    await fetch(URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(datos)
    });

    mostrarMensaje("🌙 Gracias por confirmar tu asistencia ✨");

    this.reset();
});

// Musica

const music = document.getElementById("music");
const musicBtn = document.getElementById("music-btn");


musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.textContent = "⏸️ Pausar música";

    } else {

        music.pause();

        musicBtn.textContent = "🎵 Reproducir música";

    }

});


function mostrarMensaje(texto) {

    const mensaje = document.getElementById("mensaje-exito");

    mensaje.textContent = texto;

    mensaje.classList.add("mostrar");

    setTimeout(() => {

        mensaje.classList.remove("mostrar");

    }, 3000);
}