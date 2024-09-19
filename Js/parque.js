const inicio = document.getElementById("name");

const fin = document.getElementById("ubicaciones");

function shuffle(containerId) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.children);
    items.sort(() => Math.random() - 0.5); // Desordenar aleatoriamente
    items.forEach(item => container.appendChild(item)); // Reorganizar
} 

// Verificación de si el inicio y el fin son correctos
function verificarOrden() {
    const inicioContainer = document.getElementById('name');
    const finContainer = document.getElementById('ubicaciones');

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

function ordenCorrecto(){
    const inicioContainer = document.getElementById('name');
    const finContainer = document.getElementById('ubicaciones');

    const inicio = Array.from(inicioContainer.children);
    const fin = Array.from(finContainer.children);
    inicio.forEach((inicioH, index) => {
        const valor = inicioH.getAttribute('data-value');
        if (valor != (index + 1)) {
            inicioH.style.backgroundColor = "red";
        }else{
            inicioH.style.backgroundColor = "green";
        }
    })
    fin.forEach((finH, index) => {
        const valor = finH.getAttribute('data-value');
        if (valor != (index + 1)) {
            finH.style.backgroundColor = "red";
        }else{
            finH.style.backgroundColor = "green";
        }
    })

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
    shuffle("name");
    shuffle("ubicaciones");
};

// Verificar orden al hacer clic en el botón
document.getElementById('enviar').addEventListener('click', verificarOrden);
document.getElementById('enviar').addEventListener('click', ordenCorrecto);