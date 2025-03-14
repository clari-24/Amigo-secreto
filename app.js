let intervalo;
let animacionActiva = false;
let amigos = [];
const sonidoRuleta = document.getElementById('sonidoRuleta');

document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") agregarAmigo();
});

function agregarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nombre = inputAmigo.value.trim();
    const error = document.getElementById('error');

    if (!nombre) {
        error.textContent = "⚠️ Escribe un nombre válido";
    } else if (amigos.includes(nombre)) {
        error.textContent = "⚠️ Nombre ya existe";
    } else {
        amigos.push(nombre);
        inputAmigo.value = "";
        actualizarLista();
        error.textContent = "";
    }
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(nombre => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${nombre}
            <button class="remove-btn" onclick="eliminarAmigo('${nombre}')">&times;</button>
        `;
        const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        li.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        lista.appendChild(li);
    });
}

function eliminarAmigo(nombre) {
    amigos = amigos.filter(a => a !== nombre);
    actualizarLista();
}

function iniciarSorteo() {
    if (animacionActiva) return;
    animacionActiva = true;
    
    const display = document.getElementById("nombreGanador");
    let contador = 0;
    const duracion = 4000; // 5 segundos
    
    // sonido de ruleta
    sonidoRuleta.volume = 0.2; // 50% de volumen

    // Reiniciar y reproducir el sonido
    sonidoRuleta.currentTime = 0; // Reiniciar al inicio
    sonidoRuleta.play();
    
    intervalo = setInterval(() => {
        display.textContent = amigos[Math.floor(Math.random() * amigos.length)];
        display.style.animation = 'none';
        void display.offsetWidth; // Reiniciar animación
        display.style.animation = 'aparece 0.2s';
    }, 100);
    
    setTimeout(() => {
        clearInterval(intervalo);
        const ganador = amigos[Math.floor(Math.random() * amigos.length)];
        display.textContent = `🎉 ${ganador} 🎉`;
        setTimeout(() => {
            sonidoRuleta.pause(); // Pausar el sonido después de 0.5 segundos
            sonidoRuleta.currentTime = 0; // Reiniciar el audio
            animacionActiva = false;
        }, 500); // 0.5 segundos adicionales
    }, duracion);
}

function mostrarVentana() {
    if (amigos.length < 2) {
        mostrarError("⚠️ Mínimo 2 participantes");
        return;
    }
    document.getElementById("ventanaTragamonedas").style.display = 'flex';
    iniciarSorteo();
}

function reiniciarTodo() {
    amigos = [];
    actualizarLista();
    cerrarVentana();
    document.getElementById("amigo").value = "";
    sonidoRuleta.pause(); // Asegurarse de que el sonido se detenga al reiniciar
    sonidoRuleta.currentTime = 0; // Reiniciar el audio
}

function cerrarVentana() {
    document.getElementById("ventanaTragamonedas").style.display = 'none';
    clearInterval(intervalo);
    sonidoRuleta.pause(); // Detener el sonido al cerrar
    sonidoRuleta.currentTime = 0; // Reiniciar el audio
    animacionActiva = false;
}
