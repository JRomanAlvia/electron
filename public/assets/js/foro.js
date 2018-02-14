window.addEventListener('load', function () {

    function generar(){
        var contador=0;
        $.ajax({
            type: "GET",
            url: "https://sindrome-down.herokuapp.com/datos/foro",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            for (var dato in msg[0]) {
                console.log(msg[0][contador].nombre)
                contador++;
            }
        }).error(function (err) {
            console.log(err)
        });
    }

    generar();

})