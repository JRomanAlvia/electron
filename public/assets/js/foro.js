window.addEventListener('load', function () {

    function generar(){
        var contador=0;
        $.ajax({
            type: "GET",
            url: "https://sindrome-down.herokuapp.com/usuarios/datos",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            for (var dato in msg[0]) {
                contador++;
                console.log(msg[0][contador].id)
            }
        }).error(function (err) {
            console.log(err)
        });
    }

    generar();

    function mostrarOcultar(id) {
        if (document.getElementById) { //se obtiene el id
            var el = document.getElementById(id); //se define la variable 
            el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
        }
    }

    $('#moreInfoSD').click(function () {
        mostrarOcultar('contenidoSD');
    })

    $("#btnenviar").click(function () {
        $.ajax({
            type: "GET",
            url: "https://sindrome-down.herokuapp.com/usuarios/datos",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            for (var dato in msg[0]) {
                console.log(dato)
            }
        }).error(function (err) {
            console.log(err)
        });

    });
})