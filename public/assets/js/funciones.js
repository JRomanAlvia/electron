window.addEventListener('load', function () {
    
     
    function mostrarOcultar(id) {
        if (document.getElementById) { //se obtiene el id
            var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
            el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
        }
    }

    $('#moreInfoSD').click(function() {
        mostrarOcultar('contenidoSD');       
    })

    

    $("#btnenviar").click(function () {

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
        
    });
    
    $(function () {
        $("input,textarea").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function ($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function ($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $("input#txtname").val();
                var email = $("input#txtemail").val();
                var message = $("textarea#txtmessage").val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                
            },
            filter: function () {
                return $(this).is(":visible");
            },
        });

        $("a[data-toggle=\"tab\"]").click(function (e) {
            e.preventDefault();
            $(this).tab("show");
        });
    });


    /*When clicking on Full hide fail/success boxes */
    $('#name').focus(function () {
        $('#success').html('');
    });


})