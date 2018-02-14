window.addEventListener('load', function () {
    
     
    function mostrarOcultar(id) {
        if (document.getElementById) { //se obtiene el id
            var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
            el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
        }
    }

    function validar() {
        var varnombre = $("#txtname").val();
        var varemail = $("#txtemail").val();
        var varmessage = $("#txtmessage").val();
        var humano = $("#demo-human").is(":checked");

        if (!humano) {
            alert("Debe aceptar las condiciones");
            return false;
        }

        if (varnombre.length == 0) {
            return false;
        }
        if (varemail.length == 0) {
            return false;
        }
        if (varmessage.length == 0) {
            return false;
        }
        return true;
    }

    $('#moreInfoSD').click(function() {
        mostrarOcultar('contenidoSD');       
    })

    

    $("#btnenviar").click(function () {
        if (validar()) {
            var contador = 0;
            var varnombre = $("#txtname").val();
            var varemail = $("#txtemail").val();
            var varmessage = $("#txtmessage").val();
            var varid=0;

            if (varnombre=="") {
                varnombre=="anonimo"
            }
            if (varemail == "") {
                varemail == "anonimo"
            }

            $.ajax({
                type: "GET",
                url: "https://sindrome-down.herokuapp.com/datos/mensajes",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (msg) {
                for (var dato in msg[0]) {
                    contador++;
                }

                varid=contador;
                datos = { "id": varid, "nombre": varnombre, "correo": varemail, "mensaje": varmessage };

                $.ajax({
                    type: "POST",
                    url: "https://sindrome-down.herokuapp.com/datos/mensajes",
                    dataType: "text",
                    contentType: "application/json",
                    data: JSON.stringify(datos)
                }).done(function (msg) {
                    console.log(msg)
                    confirm('Hemos recibido tu mensaje, nos contactaremos contigo!')
                }).error(function (err) {
                    console.log(err)
                }); 
            });
        }
    });
    
})