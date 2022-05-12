$(document).ready(function () {

    $('#btnBuscar').on('click', function (event) {
        event.preventDefault();

        let idHero = $('#numeroHero').val()

        function Programa() {
            let expreg = /^[0-9-\s]+$/i;

            if (expreg.test(idHero) == true) {
                if ((idHero > 0 && idHero < 732)) {
                    Buscar();
                } else {
                    alert('Debe ser un número mayor que cero y menor que 732');
                }
            } else {
                alert('Debe ingresar un número.');
            }
        }

    });
});