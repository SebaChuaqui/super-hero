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
                    $("#chartContainer").empty();

                    $("#super").text("SuperHeroe Encontrado");

                    $('#containerResultados').append(`<div class="card d-flex flex-row me-5" style="width=100%"
                                                        <div style="width=40%;">
                                                            <img src="${data.image.url}" class="card-img-top" alt="imgHero" style="object-fit: cover;width: 30%;height:80%;">
                                                            <div class="card-body">
                                                            <h6 class="card-title m-3"><strong>Nombre:</strong> ${data.name}</h6>
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
                                                        <div style="width:60%;">
                                                        

                                                    </div>
                                                </div>
                    `);

                    let opciones = {
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `Estadísticas Poder: ${data.name}`
                        },
                        legend: {
                            cursor: "pointer",
                        },
                        data: [{
                            type: "pie",
                            showInLegend: true,
                            toolTipContent: "{name}: <strong>{y}%</strong>",
                            indexLabel: "{name} - {y}",
                            dataPoints: [
                                { y: data.powerstats.intelligence == "null" ? 0 : data.powerstats.intelligence, name: "inteligencia" },
                                { y: data.powerstats.strength, name: "fuerza" },
                                { y: data.powerstats.speed, name: "velocidad" },
                                { y: data.powerstats.durability, name: "durabilidad" },
                                { y: data.powerstats.power, name: "poder" },
                                { y: data.powerstats.combat, name: "combate" }
                            ]
                        }]
                    };
                    if (powercheck(data.powerstats)) {
                        $("#chartContainer").CanvasJSChart(opciones);
                    }
                    else {
                        $("#chartContainer").text("Lo Sentimos: NO SE PUEDE GRAFICAR");
                    }

                },
                error: function (error) {
                    alert('Haz cometido un error... Inténtalo otra vez');
                },
            });
        }
        Programa();
    });
});

function powercheck(powerstat) {
    for (key in powerstat) {
        if (powerstat[key] == "null") {
            return false
        }
    }

    return true
};