window.addEventListener('load', function () {

    

    function generar(){
        var contador=0;
        var datosArray=[];
        var html='';

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3000/datos/foro",
            // url: "https://sindrome-down.herokuapp.com/datos/foro",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            html +='<dl>'
            for (var dato in msg[0]) {
                datosArray=msg;
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
                        html += '<dt><h4>' + datoNombreRespuesta + '</h4></dt><dd><p>' + datoMensajeRespuesta + '</p>';
                        html += '</dd><hr>'
                        contadorRespuestas++;
                    }
                    html += '<dl>'
                }

                html += '<input id="txtnombre' + contador +'" type="text" placeholder="Ingresa tu nombre" /><br>'
                html += '<textarea id="txtmessage'+contador+'" placeholder="Tu opinión cuenta, deja un comentario!" rows="6"></textarea><br>'
                html += '<input id="btnenviar" name="' + contador +'" type="button" value="Enviar" class="btnEnviarRes special" ></dd><hr>'
                contador++;
            }
            html += '<dl>'
            document.querySelector('#contenidoForo').innerHTML = html;

            [].forEach.call(document.querySelectorAll('.btnEnviarRes'), function (elemento) {
                elemento.addEventListener('click', function () {
                    var identificador = elemento.name;
                    var txtNombreIdentificador = $('#txtnombre' + identificador).val();
                    var txtMensajeIdentificador = $('#txtmessage'+identificador).val();
                    var contadorIdenComentario=0;
                    var contadorIdenRespuesta=0;
                    var contadorBtn=0;

                    if (msg[0][identificador].respuestas[0]) {
                        for (var datoRes in msg[0][identificador].respuestas) {
                            contadorIdenRespuesta++;
                        }
                    }
                    varid = contadorIdenRespuesta;
                    
                    datosRes = { "id": varid, "nombre": txtNombreIdentificador, "mensaje": txtMensajeIdentificador,"idComentario":identificador,"seccion":"respuestas" };
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1:3000/datos/foro",
                        dataType: "text",
                        contentType: "application/json",
                        data: JSON.stringify(datosRes)
                    }).done(function (msg) {
                        console.log(msg)
                        confirm('Comentario registrado con exito!')
                        window.location.reload();
                    }).error(function (err) {
                        console.log(err)
                    });     
                });
            });

        }).error(function (err) {
            var html = '<dl><dt>No hay entradas</dt><dd><p>De momento no hay entradas disponibles.</p>';
            html += '</dd><hr></dl>'
            document.querySelector('#contenidoForo').innerHTML = html;

        });
        
    }

    

    generar();


    
})