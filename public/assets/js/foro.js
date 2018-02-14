window.addEventListener('load', function () {

    function generar(){
        var contador=0;
        
        var html='';
        
        // var html = '<dl><dt>No hay entradas</dt><dd><p>De momento no hay entradas disponibles.</p>';
        // html += '<input type="text" placeholder="Ingresa un comentario" /><br><input id="btnenviar" type="button" value="Enviar" class="special"></dd><hr></dl>'
        // document.querySelector('#contenidoForo').innerHTML = html;

        $.ajax({
            type: "GET",
            url: "https://sindrome-down.herokuapp.com/datos/foro",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            html +='<dl>'
            for (var dato in msg[0]) {
                var datoNombre = msg[0][contador].nombre
                var datoMensaje = msg[0][contador].mensaje
                var datoTema = msg[0][contador].tema

                html += '<dt><h2>'+datoTema+'</h2> Por: '+datoNombre+'</dt><dd><p>'+datoMensaje+'</p>';

                var contadorRespuestas = 0;
                if(msg[0][contador].respuestas[0]){
                    html += '<dl>'
                    
                    for (var datoRes in msg[0][contador].respuestas) {
                        var datoNombreRespuesta = msg[0][contador].respuestas[contadorRespuestas].nombre
                        var datoMensajeRespuesta = msg[0][contador].respuestas[contadorRespuestas].mensaje
                        console.log(datoRes+" alv ya estoy cansado :v")
                        html += '<dt><h4>' + datoNombreRespuesta + '</h4></dt><dd><p>' + datoMensajeRespuesta + '</p>';
                        html += '</dd><hr>'
                        contadorRespuestas++;
                    }
                    html += '<dl>'
                }

                html += '<input type="text" placeholder="Ingresa tu nombre" /><br>'
                html += '<textarea id="txtmessage" placeholder="Tu opinión cuenta, deja un comentario!" rows="6"></textarea><br>'
                html += '<input id="btnenviar" type="button" value="Enviar" class="special"></dd><hr>'
                contador++;
            }
            html += '<dl>'
            document.querySelector('#contenidoForo').innerHTML = html;
        }).error(function (err) {
            var html = '<dl><dt>No hay entradas</dt><dd><p>De momento no hay entradas disponibles.</p>';
            html += '</dd><hr></dl>'
            document.querySelector('#contenidoForo').innerHTML = html;

        });
    }

    generar();

})