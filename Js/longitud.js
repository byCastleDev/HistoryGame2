// Función para desordenar aleatoriamente elementos de una lista
function shuffle(containerId) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.children);
    items.sort(() => Math.random() - 0.5); // Desordenar aleatoriamente
    items.forEach(item => container.appendChild(item)); // Reorganizar
} 

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

// Función Drag and Drop
function dragDropSetup() {
    const dragItems = document.querySelectorAll('#long p');
    let draggedItem = null;
    const originalPositions = new Map();

    dragItems.forEach(item => {
        item.draggable = true;
        // Guardar la posición original
        originalPositions.set(item, item.parentNode);

        item.addEventListener('dragstart', function() {
            draggedItem = item;
            setTimeout(() => item.style.visibility = 'hidden', 0); // Ocultar temporalmente
        });

        item.addEventListener('dragend', function() {
            setTimeout(() => {
                item.style.visibility = 'visible'; // Mostrar de nuevo
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        item.addEventListener('drop', function(e) {
            e.preventDefault();
            const container = this.parentElement;
            if (draggedItem !== this) {
                container.insertBefore(draggedItem, this);
            }
        });
    });

    // Manejar el caso cuando el elemento es soltado fuera del contenedor
    document.addEventListener('dragend', function() {
        if (!draggedItem) return;

        const dropContainer = document.getElementById('long');
        const dropZone = dropContainer.getBoundingClientRect();
        const itemRect = draggedItem.getBoundingClientRect();

        if (itemRect.bottom < dropZone.top || itemRect.top > dropZone.bottom) {
            // Volver al lugar original
            originalPositions.get(draggedItem).appendChild(draggedItem);
        }
    });
}

// Desordenar longitudes al cargar la página
window.onload = function() {
    shuffle('long');
    dragDropSetup();
};

// Verificar orden al hacer clic en el botón
document.getElementById('enviar').addEventListener('click', verificarOrden);
