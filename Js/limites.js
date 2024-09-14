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

// Función para mostrar el alert de SweetAlert
function showAlert(message) {
    swal("Atención!", message, "warning");
}

// Función Drag and Drop para una lista específica
function dragDropSetup(containerId) {
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('p');
    let draggedItem = null;

    items.forEach(item => {
        item.draggable = true;

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
            if (draggedItem !== this) {
                container.insertBefore(draggedItem, this);
            }
        });
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

// Función para manejar el drop fuera del contenedor
document.querySelectorAll('#inicio, #fin').forEach(container => {
    container.addEventListener('dragleave', function(e) {
        if (e.target === container && draggedItem) {
            showAlert("¡Suelta el elemento dentro del contenedor!");
            container.appendChild(draggedItem); // Regresar al contenedor
            draggedItem = null; // Reiniciar la variable
        }
    });
});
