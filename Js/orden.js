document.addEventListener("DOMContentLoaded", () => {
    const rutasContainer = document.getElementById("rutas");
    const enviarBtn = document.getElementById("enviar");
    const feedback = document.getElementById("feedback");

    // Inicializa Sortable en el contenedor de rutas
    new Sortable(rutasContainer, {
        animation: 150,
        ghostClass: 'sortable-ghost', // Clase para el elemento que se está moviendo
        chosenClass: 'sortable-chosen', // Clase para el elemento seleccionado
        dragClass: 'sortable-drag', // Clase para el elemento arrastrado
        onEnd: (event) => {
            // Aquí puedes manejar el evento de finalizar el arrastre
            console.log(`Moved ${event.item.textContent} from index ${event.oldIndex} to ${event.newIndex}`);
        }
    });

    function verificarOrden() {
        const rutas = Array.from(rutasContainer.children);
    
        let ordenCorrecto = true;
    
        rutas.forEach((ruta, index) => {
            const valor = ruta.getAttribute('data-value');
            if (valor != (index + 1)) {
                ordenCorrecto = false;
            }
        });
    
        // Mostrar resultado con SweetAlert
        if (ordenCorrecto) {
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
    
    // Asocia la verificación con el botón "Enviar"
    document.getElementById('enviar').addEventListener('click', verificarOrden);
    
    // Llama a la función cuando se carga la página
    window.onload = function() {
        shuffleRutas();
    };

    // Función para desordenar rutas
    function shuffleRutas() {
        const rutas = Array.from(rutasContainer.children);
        
        rutas.sort(() => Math.random() - 0.5); // Desordena las rutas aleatoriamente

        rutas.forEach(ruta => rutasContainer.appendChild(ruta)); // Actualiza el orden en el DOM
    }
});
