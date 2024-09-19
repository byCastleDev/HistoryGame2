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
    const rutas = Array.from(document.getElementById("long").children);

    let ordenCorrecto = true;

    rutas.forEach((ruta, index) => {
        const valor = ruta.getAttribute('data-value');
        if (valor != (index + 1)) {
            ordenCorrecto = false;
        }
    });

   

    // Mostrar resultado con SweetAlert
    if (ordenCorrecto) {
        swal("¡Correcto!", "Has ordenado correctamente las longitudes.", "success");
    } else {
        swal("¡Error!", "Algunas longitudes están mal ordenadas.", "error");
    }
}

function ordenCorrecto(){
    const rutas = Array.from(document.getElementById("long").children);
    rutas.forEach((ruta, index) => {
        const valor = ruta.getAttribute('data-value');
        if (valor != (index + 1)) {
            ruta.style.backgroundColor = "red";
        }else{
            ruta.style.backgroundColor = "green";
        }
    })

}
// Desordenar longitudes al cargar la página
window.onload = function() {
    shuffle('long');
};

// Verificar orden al hacer clic en el botón
document.getElementById('enviar').addEventListener('click', verificarOrden);
document.getElementById('enviar').addEventListener('click', ordenCorrecto);
