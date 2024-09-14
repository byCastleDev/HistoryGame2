document.addEventListener("DOMContentLoaded", () => {
    const rutas = document.querySelectorAll("#rutas p");
    const enviarBtn = document.getElementById("enviar");
    const feedback = document.getElementById("feedback");

    let draggedItem = null;
    let originalParent = null; // Para guardar el contenedor original
    let isTouchDevice = 'ontouchstart' in document.documentElement; // Verifica si es un dispositivo táctil

    // Añade eventos para drag and drop
    rutas.forEach(ruta => {
        ruta.draggable = true;
        ruta.addEventListener('dragstart', dragStart);
        ruta.addEventListener('dragover', dragOver);
        ruta.addEventListener('drop', drop);
        
        if (isTouchDevice) {
            ruta.addEventListener('touchstart', touchStart);
            ruta.addEventListener('touchmove', touchMove);
            ruta.addEventListener('touchend', touchEnd);
        }
    });

    function dragStart(e) {
        draggedItem = e.target;
        originalParent = draggedItem.parentNode; // Guardar el contenedor original
        setTimeout(() => e.target.style.display = 'none', 0);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        if (e.target.tagName === 'P' && e.target !== draggedItem) {
            const rutasContainer = document.getElementById('rutas');
            rutasContainer.insertBefore(draggedItem, e.target);
            draggedItem.style.display = 'block';
            draggedItem = null;
        }
    }

    function touchStart(e) {
        draggedItem = e.target;
        originalParent = draggedItem.parentNode; // Guardar el contenedor original
        draggedItem.classList.add('selected'); // Resaltar el elemento seleccionado
    }

    function touchMove(e) {
        if (!draggedItem) return;
        
        // Mueve el elemento seleccionado a la posición del toque
        const touchLocation = e.touches[0];
        draggedItem.style.position = 'absolute';
        draggedItem.style.left = `${touchLocation.pageX}px`;
        draggedItem.style.top = `${touchLocation.pageY}px`;
    }

    function touchEnd(e) {
        if (!draggedItem) return;

        const rutasContainer = document.getElementById('rutas');
        const target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        
        if (target && target.tagName === 'P' && target !== draggedItem) {
            rutasContainer.insertBefore(draggedItem, target);
        } else {
            originalParent.appendChild(draggedItem); // Volver al contenedor original
        }
        
        draggedItem.classList.remove('selected');
        draggedItem.style.position = 'static'; // Reiniciar estilo
        draggedItem = null; // Limpiar la variable
    }

    // Manejar el caso de soltar fuera del contenedor
    document.addEventListener('dragend', () => {
        if (!draggedItem) return;

        const rutasContainer = document.getElementById('rutas');
        const containerRect = rutasContainer.getBoundingClientRect();

        // Verificar si se suelta fuera del contenedor
        if (
            draggedItem.getBoundingClientRect().top < containerRect.top ||
            draggedItem.getBoundingClientRect().bottom > containerRect.bottom ||
            draggedItem.getBoundingClientRect().left < containerRect.left ||
            draggedItem.getBoundingClientRect().right > containerRect.right
        ) {
            // Volver al contenedor original
            originalParent.appendChild(draggedItem);
        }

        draggedItem.style.display = 'block';
        draggedItem = null; // Limpiar la variable
    });

    function verificarOrden() {
        const rutasContainer = document.getElementById('rutas');
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
        const rutasContainer = document.getElementById('rutas');
        const rutas = Array.from(rutasContainer.children);
        
        rutas.sort(() => Math.random() - 0.5); // Desordena las rutas aleatoriamente

        rutas.forEach(ruta => rutasContainer.appendChild(ruta)); // Actualiza el orden en el DOM
    }
});