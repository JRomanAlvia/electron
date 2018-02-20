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
//V1
            // html += '<dl>'
            // for (var dato in msg[0]) {
            //     datosArray = msg;
            //     var datoNombre = msg[0][contador].nombre
            //     var datoMensaje = msg[0][contador].mensaje
            //     var datoTema = msg[0][contador].tema

            //     html += '<dt><h2>' + datoTema + '</h2> Por: ' + datoNombre + '</dt><dd><p>' + datoMensaje + '</p>';

            //     var contadorRespuestas = 0;
            //     if (msg[0][contador].respuestas[0]) {
            //         html += '<dl>'

            //         for (var datoRes in msg[0][contador].respuestas) {
            //             var datoNombreRespuesta = msg[0][contador].respuestas[contadorRespuestas].nombre
            //             var datoMensajeRespuesta = msg[0][contador].respuestas[contadorRespuestas].mensaje
            //             html += '<dt><h4>' + datoNombreRespuesta + '</h4></dt><dd><p>' + datoMensajeRespuesta + '</p>';
            //             html += '</dd><hr>'
            //             contadorRespuestas++;
            //         }
            //         html += '<dl>'
            //     }

            //     html += '<input id="txtnombre' + contador + '" type="text" placeholder="Ingresa tu nombre" /><br>'
            //     html += '<textarea id="txtmessage' + contador + '" placeholder="Tu opinión cuenta, deja un comentario!" rows="6"></textarea><br>'
            //     html += '<input id="btnenviar" name="' + contador + '" type="button" value="Enviar" class="btnEnviarRes special" ></dd><hr>'
            //     contador++;
            // }
            // html += '<dl>'
            // document.querySelector('#contenidoForo').innerHTML = html;

// FIN V1

//V2

            html +='<dl>'
            for (var dato in msg[0]) {
                datosArray=msg;
                var datoNombre = msg[0][contador].nombre
                var datoMensaje = msg[0][contador].mensaje
                var datoTema = msg[0][contador].tema

                html += '<dt><h2>'+datoTema+'</h2> Por: '+datoNombre+'</dt><dd><p>'+datoMensaje+'</p>';

                var contadorRespuestas = 0;
                try {
                    if (msg[0][contador].respuestas[0]) {
                        // alert("holi")
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
                    html += '<input id="txtnombre' + contador + '" type="text" placeholder="Ingresa tu nombre" /><br>'
                    html += '<textarea id="txtmessage' + contador + '" placeholder="Tu opinión cuenta, deja un comentario!" rows="6"></textarea><br>'
                    html += '<input id="btnenviar" name="' + contador + '" type="button" value="Enviar Respuesta" class="btnEnviarRes special" ></dd><hr>'
                    contador++;

                } catch (error) {
                    html += '<dl>'
                    html += '<dt><h4>Administrador</h4></dt><dd><p>No hay respuestas aún, deja la tuya!</p>';
                    html += '</dd><hr>'
                    html += '<dl>'
                    
                    html += '<input id="txtnombre' + contador + '" type="text" placeholder="Ingresa tu nombre" /><br>'
                    html += '<textarea id="txtmessage' + contador + '" placeholder="Tu opinión cuenta, deja un comentario!" rows="6"></textarea><br>'
                    html += '<input id="btnenviar" name="' + contador + '" type="button" value="Enviar Respuesta" class="btnEnviarRes special" ></dd><hr>'
                    contador++;
                }
            }


    // entrada tema nuevo
            html += '<dt>'
            html += '<h2>Quieres dejar un nuevo tema?</h2>'
            html += '<input id="txtTituloTema" type="text" placeholder="Ingresa el tema" /><br>'
            html += '<input id="txtNombreTema" type="text" placeholder="Ingresa tu nombre" /><br>'
            html += '<textarea id="txtMessageTema" placeholder="Aqui deja un comentario!" rows="6"></textarea><br>'
            html += '<input id="btnEnviarTema" type="button" value="Enviar Tema" class="btnEnviarTem special" ></dd><hr>'
            html += '</dt>'

            html += '</dl>'
            document.querySelector('#contenidoForo').innerHTML = html;

// FIN V2

            [].forEach.call(document.querySelectorAll('.btnEnviarRes'), function (elemento) {
                elemento.addEventListener('click', function () {
                    var identificador = elemento.name;
                    var txtNombreIdentificador = $('#txtnombre' + identificador).val();
                    var txtMensajeIdentificador = $('#txtmessage'+identificador).val();
                    var contadorIdenComentario=0;
                    var contadorIdenRespuesta=0;
                    var contadorBtn=0;

                    try {
                        if (msg[0][identificador].respuestas[0]) {
                            for (var datoRes in msg[0][identificador].respuestas) {
                                contadorIdenRespuesta++;
                            }
                        }
                        varid = contadorIdenRespuesta;
                    } catch (error) {
                        varid=0;
                    }
                    
                    
                    
                    datosRes = { "id": varid, "nombre": txtNombreIdentificador, "mensaje": txtMensajeIdentificador,"idComentario":identificador,"seccion":"respuestas" };
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1:3000/datos/foro",
                        dataType: "text",
                        contentType: "application/json",
                        data: JSON.stringify(datosRes)
                    }).done(function (msg) {
                        console.log(msg)
                        confirm('Respuesta registrada con exito!')
                        window.location.reload();
                    }).error(function (err) {
                        console.log(err)
                    });     
                });
            });

            [].forEach.call(document.querySelectorAll('.btnEnviarTem'), function (elemento) {
                elemento.addEventListener('click', function () {
                    var txtTituloTemaIden = $('#txtTituloTema').val();
                    var txtNombreTemaIden = $('#txtNombreTema').val();
                    var txtMensajeTemaIden = $('#txtMessageTema').val();
                    var contadorTema;

                    $.ajax({
                        type: "GET",
                        url: "http://127.0.0.1:3000/datos/foro",
                        // url: "https://sindrome-down.herokuapp.com/datos/foro",
                        dataType: "json",
                        contentType: "text/plain"
                    }).done(function (msg) {
                        for (var dato in msg[0]) {
                            contadorTema++;
                        }
                        var varidTema = contador;

                        var datosTema = { "id": varidTema, "tema": txtTituloTemaIden, "nombre": txtNombreTemaIden, "mensaje": txtMensajeTemaIden, "seccion": "respuestas" };
                        $.ajax({
                            type: "POST",
                            url: "http://127.0.0.1:3000/datos/temas",
                            dataType: "text",
                            contentType: "application/json",
                            data: JSON.stringify(datosTema)
                        }).done(function (msg) {
                            console.log(msg)
                            confirm('Comentario registrado con exito!')
                            window.location.reload();
                        }).error(function (err) {
                            console.log(err)
                        });
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