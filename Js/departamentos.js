document.addEventListener("DOMContentLoaded", () => {
    const departamentos = document.getElementById("departamentos");
    const capitales = document.getElementById("capitales");
    const enviarBtn = document.getElementById("enviar");

    new Sortable(departamentos, {
        animation: 150,
        ghostClass: 'sortable-ghost', // Clase para el elemento que se está moviendo
        chosenClass: 'sortable-chosen', // Clase para el elemento seleccionado
        dragClass: 'sortable-drag', // Clase para el elemento arrastrado
        onEnd: (event) => {
            // Aquí puedes manejar el evento de finalizar el arrastre
            console.log(`Moved ${event.item.textContent} from index ${event.oldIndex} to ${event.newIndex}`);
        }
    });

    new Sortable(capitales, {
        animation: 150,
        ghostClass: 'sortable-ghost', // Clase para el elemento que se está moviendo
        chosenClass: 'sortable-chosen', // Clase para el elemento seleccionado
        dragClass: 'sortable-drag', // Clase para el elemento arrastrado
        onEnd: (event) => {
            // Aquí puedes manejar el evento de finalizar el arrastre
            console.log(`Moved ${event.item.textContent} from index ${event.oldIndex} to ${event.newIndex}`);
        }
    });

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
