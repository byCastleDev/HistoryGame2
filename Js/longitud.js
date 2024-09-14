const long = document.getElementById("long");
// Función para desordenar aleatoriamente elementos de una lista
function shuffle(containerId) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.children);
    items.sort(() => Math.random() - 0.5); // Desordenar aleatoriamente
    items.forEach(item => container.appendChild(item)); // Reorganizar
} 

// Inicializa Sortable en el contenedor de rutas
new Sortable(long, {
    animation: 150,
    ghostClass: 'sortable-ghost', // Clase para el elemento que se está moviendo
    chosenClass: 'sortable-chosen', // Clase para el elemento seleccionado
    dragClass: 'sortable-drag', // Clase para el elemento arrastrado
    onEnd: (event) => {
        // Aquí puedes manejar el evento de finalizar el arrastre
        console.log(`Moved ${event.item.textContent} from index ${event.oldIndex} to ${event.newIndex}`);
    }
});

// Verificación del orden de longitud
function verificarOrden() {
    const longitudes = Array.from(document.getElementById('long').children);
    let correcto = true;

    // Verificar si están en orden ascendente
    for (let i = 0; i < longitudes.length - 1; i++) {
        if (parseInt(longitudes[i].getAttribute('data-value')) > parseInt(longitudes[i + 1].getAttribute('data-value'))) {
            correcto = false;
            break;
        }
    }

    // Mostrar resultado con SweetAlert
    if (correcto) {
        swal("¡Correcto!", "Has ordenado correctamente las longitudes.", "success");
    } else {
        swal("¡Error!", "Algunas longitudes están mal ordenadas.", "error");
    }
}
// Desordenar longitudes al cargar la página
window.onload = function() {
    shuffle('long');
};

// Verificar orden al hacer clic en el botón
document.getElementById('enviar').addEventListener('click', verificarOrden);
