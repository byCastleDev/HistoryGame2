const inicio = document.getElementById("Inicio");

const fin = document.getElementById("Fin");

function shuffle(containerId) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.children);
    items.sort(() => Math.random() - 0.5); // Desordenar aleatoriamente
    items.forEach(item => container.appendChild(item)); // Reorganizar
} 

// Verificación de si el inicio y el fin son correctos
function verificarOrden() {
    const inicioContainer = document.getElementById('Inicio');
    const finContainer = document.getElementById('Fin');

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

// Inicializa Sortable en el contenedor de rutas
new Sortable(inicio, {
    animation: 150,
    ghostClass: 'sortable-ghost', // Clase para el elemento que se está moviendo
    chosenClass: 'sortable-chosen', // Clase para el elemento seleccionado
    dragClass: 'sortable-drag', // Clase para el elemento arrastrado
    onEnd: (event) => {
        // Aquí puedes manejar el evento de finalizar el arrastre
        console.log(`Moved ${event.item.textContent} from index ${event.oldIndex} to ${event.newIndex}`);
    }
});

// Inicializa Sortable en el contenedor de rutas
new Sortable(fin, {
    animation: 150,
    ghostClass: 'sortable-ghost', // Clase para el elemento que se está moviendo
    chosenClass: 'sortable-chosen', // Clase para el elemento seleccionado
    dragClass: 'sortable-drag', // Clase para el elemento arrastrado
    onEnd: (event) => {
        // Aquí puedes manejar el evento de finalizar el arrastre
        console.log(`Moved ${event.item.textContent} from index ${event.oldIndex} to ${event.newIndex}`);
    }
});

// Desordenar rutas al cargar la página
window.onload = function() {
    shuffle("Inicio");
    shuffle("Fin");
};

// Verificar orden al hacer clic en el botón
document.getElementById('enviar').addEventListener('click', verificarOrden);
