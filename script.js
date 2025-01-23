$(document).ready(function () {
    let totalItems = 11; // Valor inicial de 11 elementos por defecto
    let items = $('.grid-wrap .item');

    // Función para actualizar la cuadrícula
    function updateGrid() {
        // Configura la cuadrícula como flexbox
        $('.grid-wrap').css({
            display: 'flex',
            'flex-wrap': 'wrap',
            gap: '10px', // Espaciado entre los elementos
        });

        // Verifica el tamaño de la ventana
        let windowWidth = $(window).width();

        if (windowWidth <= 540) {
            // Si la ventana es menor o igual a 540px, cada elemento ocupa el 100%
            items.css('flex', '0 0 100%').css('max-width', '100%');
        } else if (windowWidth <= 992) {
            // Si la ventana es menor o igual a 992px, cada elemento ocupa el 50% menos 10px
            items.css('flex', '0 0 calc(50% - 10px)').css('max-width', 'calc(50% - 10px)');

            // Si la cantidad de elementos es impar, el último elemento ocupa el 100%
            if (totalItems % 2 !== 0) {
                let lastItem = items.last();
                lastItem.css('flex', '0 0 100%').css('max-width', '100%');
            }
        } else {
            // Si la ventana es mayor a 992px, usa el patrón original
            const pattern = [
                [1, 1, 2],  // Fila 1: 25%, 25%, 50%
                [1, 2, 1],  // Fila 2: 25%, 50%, 25%
                [2, 1, 1],  // Fila 3: 50%, 25%, 25%
            ];

            // Itera sobre los elementos en grupos de 3 siguiendo el patrón
            items.each(function (index) {
                let rowIndex = Math.floor(index / 3); // Índice de la fila
                let positionInRow = index % 3; // Posición en la fila (0, 1 o 2)

                // Obtiene la proporción de la fila correspondiente en el patrón
                let proportion = pattern[rowIndex % 3][positionInRow];

                // Aplica el ancho según la proporción (1 -> 25%, 2 -> 50%)
                let width = proportion === 1 ? 'calc(25% - 10px)' : 'calc(50% - 10px)';
                $(this).css('flex', `0 0 ${width}`).css('max-width', width);
            });

            // Resto de elementos fuera de los grupos de 3
            let remaining = totalItems % 3;

            if (remaining === 1) {
                // Encuentra el índice del último elemento
                let startIndex = totalItems - remaining;
                let remainingItems = items.slice(startIndex);

                // Aplica 100% de ancho al único elemento restante
                remainingItems.css('flex', '0 0 100%').css('max-width', '100%');
            } else if (remaining === 2) {
                // Encuentra el índice de los últimos dos elementos
                let startIndex = totalItems - remaining;
                let remainingItems = items.slice(startIndex);

                // Aplica 50% de ancho a cada uno de los elementos restantes
                remainingItems.css('flex', '0 0 calc(50% - 10px)').css('max-width', 'calc(50% - 10px)');
            }
        }

        // Ajusta la altura de los elementos para mantener la proporción
        function adjustItemHeight() {
            let itemHeight = $('.grid-wrap').width() * 0.25; // 25% del ancho del contenedor
            items.css('height', itemHeight); // Cambia la altura de .item
        }

        // Ejecuta la función al cargar y al cambiar el tamaño de la ventana
        adjustItemHeight();
    }

    // Llama a la función inicial de actualización
    updateGrid();

    // Vuelve a ejecutar la función updateGrid cuando se redimensiona la ventana
    $(window).resize(function() {
        // Vuelve a obtener los elementos en la cuadrícula
        items = $('.grid-wrap .item'); // Actualiza la referencia de los items
        updateGrid();
    });

    // Detecta el submit del formulario
    $('#cantidad-form').on('submit', function(e) {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        let cantidad = $('#cantidad').val(); // Obtiene el valor ingresado

        // Verifica si el valor es un número
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor ingrese un número válido.");
            return; // No ejecuta el código si no es un número válido
        }

        // Cambia la cantidad de elementos
        totalItems = parseInt(cantidad); // Actualiza la cantidad de elementos a mostrar

        // Genera o ajusta los elementos en la cuadrícula según la nueva cantidad
        let newItemsHTML = '';
        for (let i = 0; i < totalItems; i++) {
            newItemsHTML += '<div class="item"><img src="https://i0.wp.com/ventureandpleasure.com/wp-content/uploads/2024/05/bariloche-en-argentina-vista-scaled.jpg?fit=2560%2C1608&ssl=1" /></div>';
        }

        // Inserta los elementos generados en el contenedor
        $('.grid-wrap').html(newItemsHTML);

        // Vuelve a ejecutar la función de actualización de la cuadrícula
        items = $('.grid-wrap .item'); // Actualiza la referencia de los items
        updateGrid();
    });
});
