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

        function Buscar() {

            $.ajax({
                type: "GET",
                url: `https://superheroapi.com/api.php/1501982276808516/${idHero}`,
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    $('#containerResultados').empty();
                    $('#chartContainer')

                    $('#containerResultados').append(`<div class="card d-flex flex-row me-5" style="width=100%"
                                                        <div style="width=40%;">
                                                            <img src="${data.image.url}" class="card-img-top" alt="imgHero" style="object-fit: cover;width: 100%;height:100%;">
                                                        </div>
                                                        <div style="width:60%;">
                                                        <div class="card-body">
                                                            <h3 class="card-title"><strong>Nombre:</strong> ${data.name}</h3>
                                                        </div>
                                                        <ul class="list-group list-group-flush">
                                                            <li class="list-group-item"><strong>Conexiones:</strong> ${data.connections['group-affiliation']}</li>
                                                            <li class="list-group-item"><strong>Ocupación:</strong> ${data.work.occupation}</li>
                                                            <li class="list-group-item"><strong>Primera Aparición:</strong> ${data.biography['first-appearance']}</li>
                                                            <li class="list-group-item"><strong>Altura:</strong> ${data.appearance.height}</li>
                                                            <li class="list-group-item"><strong>Peso:</strong> ${data.appearance.weight}</li>
                                                            <li class="list-group-item"><strong>Alias:</strong> ${data.biography.aliases}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                    `);

                    let opcion = {
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `Estadísticas Poder ${data.name} :`
                        },
                        legend: {
                            cursor: "pointer"
                        },
                        data: [{
                            type: "pie",
                            showInLegend: true,
                            toolTipContent: "{name}: <strong>{y}%</strong>",
                            indexLabel: "{name} - {y}",
                            dataPoints: [
                                { y: data.powerstats.intelligence, name: "intelligence" },
                                { y: data.powerstats.strength, name: "strength" },
                                { y: data.powerstats.speed, name: "speed" },
                                { y: data.powerstats.durability, name: "durability" },
                                { y: data.powerstats.power, name: "power" },
                                { y: data.powerstats.combat, name: "combat" }
                            ]
                        }]
                    };

                }

            }
            )
        }

    });
});