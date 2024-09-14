document.addEventListener("DOMContentLoaded", () => {
    const departamentos = document.querySelectorAll("#departamentos p");
    const capitales = document.querySelectorAll("#capitales p");
    const enviarBtn = document.getElementById("enviar");

    // Añadir eventos a departamentos y capitales
    setupDragAndDrop(departamentos);
    setupDragAndDrop(capitales);

    // Función para configurar Drag and Drop
    function setupDragAndDrop(items) {
        let draggedItem = null;

        items.forEach(item => {
            item.draggable = true;

            item.addEventListener('dragstart', function () {
                draggedItem = item;
                item.style.opacity = '0.5';
            });

            item.addEventListener('dragend', function () {
                setTimeout(() => {
                    draggedItem.style.opacity = '1';
                    draggedItem = null;
                }, 0);
            });

            item.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            item.addEventListener('drop', function (e) {
                e.preventDefault();
                if (draggedItem !== this) {
                    const container = this.parentElement;
                    container.insertBefore(draggedItem, this);
                }
            });
        });
    }

    // Función para verificar el orden
    function verificarOrden(containerId) {
        const items = Array.from(document.getElementById(containerId).children);
        return items.every((item, index) => parseInt(item.getAttribute('data-value')) === index + 1);
    }

    // Verificar orden al hacer clic en el botón
    enviarBtn.addEventListener('click', function () {
        const correctoDepartamentos = verificarOrden('departamentos');
        const correctoCapitales = verificarOrden('capitales');

        // Mostrar resultados con SweetAlert
        if (correctoDepartamentos) {
            swal({
                title: "¡Correcto!",
                text: "Has ordenado correctamente los departamentos.",
                icon: "success",
                button: "Aceptar",
            });
        } else {
            swal({
                title: "¡Error!",
                text: "Hay errores en el orden de los departamentos. Revisa nuevamente.",
                icon: "error",
                button: "Aceptar",
            });
        }

        if (correctoCapitales) {
            swal({
                title: "¡Correcto!",
                text: "Has ordenado correctamente las capitales.",
                icon: "success",
                button: "Aceptar",
            });
        } else {
            swal({
                title: "¡Error!",
                text: "Hay errores en el orden de las capitales. Revisa nuevamente.",
                icon: "error",
                button: "Aceptar",
            });
        }
    });

    // Función para desordenar elementos
    function shuffle(containerId) {
        const container = document.getElementById(containerId);
        const items = Array.from(container.children);
        items.sort(() => Math.random() - 0.5);
        items.forEach(item => container.appendChild(item));
    }

    // Desordenar elementos al cargar la página
    window.onload = function () {
        shuffle('departamentos');
        shuffle('capitales');
    };
});
