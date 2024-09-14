 // Función para desordenar aleatoriamente elementos de una lista
 function shuffle(containerId) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.children);
    items.sort(() => Math.random() - 0.5); // Desordenar aleatoriamente
    items.forEach(item => container.appendChild(item)); // Reorganizar
}

// Verificación de si el inicio y el fin son correctos
function verificarOrden() {
    const inicioContainer = document.getElementById('inicio');
    const finContainer = document.getElementById('fin');

    const inicio = Array.from(inicioContainer.children);
    const fin = Array.from(finContainer.children);

    let inicioCorrecto = true;
    let finCorrecto = true;

    // Verificar si el inicio es correcto
    inicio.forEach((item, index) => {
        const valor = item.getAttribute('data-value');
        if (valor != (index + 1)) {
            inicioCorrecto = false;
        }
    });

    // Verificar si el fin es correcto
    fin.forEach((item, index) => {
        const valor = item.getAttribute('data-value');
        if (valor != (index + 1)) {
            finCorrecto = false;
        }
    });

    // Mostrar resultado con SweetAlert
    if (inicioCorrecto && finCorrecto) {
        swal({
            title: "¡Correcto!",
            text: "Has ordenado las rutas correctamente.",
            icon: "success",
            button: "Aceptar",
        });
    } else {
        swal({
            title: "¡Error!",
            text: "Algunas rutas están mal ordenadas, inténtalo de nuevo.",
            icon: "error",
            button: "Aceptar",
        });
    }
}

// Función Drag and Drop para una lista específica
function dragDropSetup(containerId) {
    const container = document.getElementById(containerId);
    Sortable.create(container, {
        animation: 150, // Añade animación
        ghostClass: "sortable-ghost", // Clase CSS para el elemento fantasma
        onStart: function (evt) {
            evt.item.style.visibility = 'hidden'; // Oculta el item mientras se arrastra
        },
        onEnd: function (evt) {
            evt.item.style.visibility = 'visible'; // Muestra el item cuando se suelta
        }
    });
}

// Desordenar rutas al cargar la página
window.onload = function() {
    shuffle('inicio');
    shuffle('fin');
    dragDropSetup('inicio');
    dragDropSetup('fin');
};

// Verificar orden al hacer clic en el botón
document.getElementById('enviar').addEventListener('click', verificarOrden);
