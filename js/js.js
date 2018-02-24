function AJAXCrearObj(){

	if(window.XMLHttpRequest) { 
        // navegadores que siguen los estándares 
        objAjax = new XMLHttpRequest(); 
    } 
    else { 
        // navegadores obsoletos 
        objAjax = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
    return objAjax;
}

// Funcion que se ejecuta al cargar el document, para usar jQuery
$(document).ready(function() {

    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_nombre.php', true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_load;
});

// Funcion que añade el titulo que recibimos del php con Ajax
function responder_load() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

        	var titulo = document.getElementById('titulo');
			var texto_titulo = document.createTextNode(objAjax.responseText);

			titulo.appendChild(texto_titulo);
        } 
    } 
}

// Funcion que ejecuta el boton contacto, que va al servidor y nos muestra la informacion de conacto
function info() {

	objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_info.php', true); // llamamos al php
    objAjax.send();
	objAjax.onreadystatechange=responder_info_1;
}

// Funcion que crea y muestra dinamicamente la informacion de contacto
function responder_info_1() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var obj_json = JSON.parse(objAjax.responseText);
            $('#contenido').children('div').remove();

            $('#contenido').append('<div id="margen"></div>');
            $('#contenido').append('<div id="div_contacto">');
            $('#div_contacto').append('<h2> Información de Contacto </h2>');
            $('#div_contacto').append('<p><b> Nombre : </b> '+obj_json[0].nombre+'</p>');
            $('#div_contacto').append('<p><b> Dirección : </b> '+obj_json[0].direccion+'</p>');
            $('#div_contacto').append('<p><b> Email : </b> '+obj_json[0].email+'</p>');
            $('#div_contacto').append('<p><b> Telf : </b> '+obj_json[0].telefono+'</p>');
            $('#div_contacto').append('<img src="./img/contacto.png">');
        }
    }   
}

// Funcion que se ejecuta tanto en el boton pedir cita, como cuadro mededico. Va al servidor para extraer las especialidades
function especialidad() {
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_especialidad.php', true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_especialidad;
}

// Funcion que crea y muestra dinamicamente las especialidades
function responder_especialidad() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var obj_json = JSON.parse(objAjax.responseText);
            $('#contenido').children('div').remove();
            
            $('#contenido').append('<div id="margen"></div>');
            $('#contenido').append('<div id="div_especialidad" class="div_izquierda">');
            $('#div_especialidad').append('<h2> Especialidades </h2>');

            for (var i=0 ; i<obj_json.length ; i++) {
                $('#div_especialidad').append('<div class="medico"><img src="'+obj_json[i].url_img+'"><a onclick="mostrar_medico('+obj_json[i].id_especialidad+');">'+obj_json[i].nombre+'</div>');
            }          
        }
    }   
}

/*function Medico (idMedico, nombre, apellidos) {

    var obj = {
        idMedico: idMedico,
        nombre: nombre,
        apellidos: apellidos,
    };

    return obj;
} */

function Medico (idMedico, nombre, apellidos) {

    this.idMedico = idMedico;
    this.nombre = nombre;
    this.apellidos = apellidos;
}


// Funcion que se ejecuta al hacer clic en una especialidad y va al servidor para extraer los medicos de dicha especialidad
function mostrar_medico(id_especialidad) {
    
    var json_id_especialidad = JSON.parse(id_especialidad);
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_medico_turno.php?json_id_especialidad='+json_id_especialidad, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_mostrar_medico;
}

// Funcion que crea y muestra informacion dinamicamente de los medicos con sus turnos
function responder_mostrar_medico() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            $('#div_medico').remove();

            var obj_json = JSON.parse(objAjax.responseText);

            $('#contenido').append('<div id="div_medico" class="div_derecha" >');
            $('#div_medico').append('<h2> Médicos </h2>');

            for (var i=0 ; i<obj_json.length ; i++) {

                // Creamos un objMedico, para enviarlo a la siguiente funcion
                var objMedico = new Medico(obj_json[i].id_medico, obj_json[i].nombre, obj_json[i].apellidos);
    
                var objMedico_json = JSON.stringify(objMedico);
                //alert(objMedico);

                $('#div_medico').append('<div id="medico'+i+'" class="medico">');

                var div_medico = document.getElementById('medico'+i+'');
                div_medico.setAttribute("onclick", "formulario_cita('" + objMedico_json + "')");

                //$('#div_medico').append('<div id="medico'+i+'" class="medico" onclick="formulario_cita(`'+ objMedico.idMedico +'`);">');                              
                $('#medico'+i+'').append('<img src="./img/logo_medico.jpg">');
                $('#medico'+i+'').append('<p class="p_medico">'+objMedico.nombre+' '+objMedico.apellidos+'</p>');
                $('#medico'+i+'').append('<div id="horario'+i+'" class="div_horario">');

                for (var j=0 ; j<obj_json[i].array_turno.length ; j++) {
                    $('#horario'+i+'').append('<p>'+obj_json[i].array_turno[j].dia_turno+': '+obj_json[i].array_turno[j].horario_inicio+' - '+obj_json[i].array_turno[j].horario_final+'</p>');
                }
            }
            
        }
    }
}

// Funcion que se ejecuta al hacer clic en un medico, y genera un formulario para pedir cita
function formulario_cita(objMedico_json) {

    var objMedico = JSON.parse(objMedico_json);

    global_objMedico = objMedico; // pasamos el medico a un obj Globall para poder utilizarlo para insertar la cita

    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');

    $('#contenido').append('<div id="div_elegir_dias" class="div_izquierda">');

        $('#div_elegir_dias').append("<h1> Seleccionar dia </h1>");

        $('#div_elegir_dias').append("<h3> Medico Seleccionado: </h3>");
        $('#div_elegir_dias').append("<p id='nombreMedico'> " + objMedico.nombre + " " + objMedico.apellidos + " </p>");
        $('#div_elegir_dias').append("<p id='idMedico' hidden> " + objMedico.idMedico + " </p>");

        $('#div_elegir_dias').append("<form id='form_asignar_dias'>");

        //$('#form_asignar_dias').append("<br> <label> Selección: </label> <br>");

            $('#form_asignar_dias').append("<input type='text' id='fechas_seleccionadas_cita' required disabled hidden> <br>");
            $('#form_asignar_dias').append('<div id="calendario"></div>');

        $('#div_elegir_dias').append("<button onclick='seleccionarDia();'> Seleccionar </button>");

        mostrar_diasLaborables(objMedico.idMedico);
}

// Funcion que es llamada desde la anterior y que va a servidor para extraer los dias laborables del medico selecionado
function mostrar_diasLaborables (id_medico) {

    var json_idMedico = JSON.parse(id_medico);
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_diasLaborables.php?json_idMedico='+json_idMedico, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_diasLaborables;
}

// Funcion que muestra en el calendario los dias laborables de cada medico, a partir de la fecha actual
// para que el usuario la seleccione
function responder_diasLaborables () {

     if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var obj_json = JSON.parse(objAjax.responseText);

            /* Creamos un array con lo que nos devuelve el php, pero de string no de obj Date, se lo pasamos
            a la funcion para que deshabilite todo menos los dias indicados
            */

            var array = new Array();

            for (var i=0 ; i<obj_json.length ; i++) {

                array.push(obj_json[i].fecha);
            }

            $('#calendario').multiDatesPicker({

                dateFormat: "yy-mm-dd",
                altField: '#fechas_seleccionadas_cita',
                maxPicks: 1,
                minDate: 1,
                firstDay: 1,
                setDefaults: $.datepicker.regional["es"],
                beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [ array.indexOf(string) != -1 ]
                }
            });  
        }
    }
}

// Funcion que hace de contructor de un obj que contiene un idMedico y una fecha
function _dates_idMedico(fecha, dia, idMedico) {
    
    var obj = {
        idMedico: idMedico,
        fecha: fecha,
        dia: dia
    };

    return obj;  
}

// Funcion ejecutada por boton que el usuario usa una vez seleccionado el dia en el calendario
function seleccionarDia () {
    
    var fecha = $('#fechas_seleccionadas_cita').val();
    globalFecha = fecha;
    var idMedico = $('#idMedico').text();

    if (fecha) {
        var date = new Date(fecha);
        //alert(date, idMedico);
        var obj_dates_idMedico = _dates_idMedico(fecha, date.getDay(), idMedico);
        tramosDisponibles(obj_dates_idMedico);

    } else {       
        alert("Selecione una fecha");
    }
}

// Funcion que mediante AJAX busca los tramos disponibles para ese medico y esa fecha selecionadas por el usuario
function tramosDisponibles (obj_dates_idMedico) {

    var obj_json_date_idMedico = JSON.stringify(obj_dates_idMedico);
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_tramosDisponibles1.php?obj_json_date_idMedico='+obj_json_date_idMedico, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_tramosDisponibles;
}

// Funcion que muestra y genera dinamicamente los tramos disponibles para que el usuario eliga
function responder_tramosDisponibles () {
    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var obj_json = JSON.parse(objAjax.responseText);

            $('#div_tramos').remove();

            var div_contenido = document.getElementById("contenido");
            var div_tramos = document.createElement("div");
            var h2_div_tramos = document.createElement("h2");

            var text_h2_div_tramos = document.createTextNode("Tramos Disponibles");

            div_tramos.setAttribute("id", "div_tramos");
            div_tramos.setAttribute("class", "div_derecha");

            h2_div_tramos.appendChild(text_h2_div_tramos);
            div_tramos.appendChild(h2_div_tramos);
            div_contenido.appendChild(div_tramos);

            if (obj_json != "error") {

                for (var i=0 ; i<obj_json.length ; i++) {

                    var div_tramo = document.createElement("div");
                    var texto_div_tramo = document.createTextNode(obj_json[i].tramo_inicio + " - " + obj_json[i].tramo_final);

                    var objTramo_json = JSON.stringify(obj_json[i]);

                    div_tramo.setAttribute("onclick", "selec_tramo('" + objTramo_json + "')");
                    div_tramo.setAttribute("class", "tramo");
                    div_tramo.setAttribute("id", "tramo"+obj_json[i].id_tramo);

                    div_tramo.appendChild(texto_div_tramo);
                    div_tramos.appendChild(div_tramo);
                }

                //var form_tramo = document.createElement("form");
                var input_tramo = document.createElement("input");
                var button_form_tramo = document.createElement("button");

                var texto_button_tramo = document.createTextNode("Selecionar Tramo");

                input_tramo.setAttribute("required", "required");
                input_tramo.setAttribute("disabled", "disabled");
                input_tramo.setAttribute("hidden", "hidden");
                input_tramo.setAttribute("id", "input_idTramo");

                button_form_tramo.setAttribute("onclick", "select_tramo();")

                button_form_tramo.appendChild(texto_button_tramo);
                div_tramos.appendChild(input_tramo);
                div_tramos.appendChild(button_form_tramo);
                //div_tramos.appendChild(form_tramo);

            } else {

                var p = document.createElement("p");
                var texto_p = document.createTextNode("No hay tramos disponibles");

                p.appendChild(texto_p);
                div_tramos.appendChild(p);
            }
        }
    }
}

// Funcion que se encarga de decterta que tramo se ha seleccionado y cambiarlo de color y asignale el id del tramos selecionado a un input
function selec_tramo(objTramo_json) {
    
    var objTramo = JSON.parse(objTramo_json);

    global_objTramo = objTramo;

    var div_tramos = document.getElementById("div_tramos");
    var div_tramo = document.getElementById("tramo"+objTramo.id_tramo);
    var input_idTramo = document.getElementById("input_idTramo");

    var tramos = div_tramos.childNodes;

    for (var i=0 ; i<tramos.length ; i++) {
        tramos[i].setAttribute("style", "border-color: #1798F3;");
    }
    
    div_tramo.setAttribute("style", "border-color: #00B362; background-color: silver;");
    //alert(id_tramo);

    input_idTramo.setAttribute("value", objTramo.id_tramo);
}

// Funcion a la que llama el boton al selecionar el tramo, recoge el id del tramo del input
function select_tramo () {

    var valor_input_idTramo = document.getElementById("input_idTramo").value;

    if (valor_input_idTramo) {

        div_login_registro();

    } else {

        alert("Seleciona un tramo");
    }
}

// Funcion que genera el login y el registro de usuario
function div_login_registro () {
    
    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');
    
    $('#contenido').append('<div class="div_izquierda" id="div_login">');
        $('#div_login').append('<h3> Login </h3>');

        $('#div_login').append('<label> Email: </label>');
        $('#div_login').append('<input type="text" id="login_email"> <br>');

        $('#div_login').append('<label> Num Afiliacion: </label>');
        $('#div_login').append('<input type="text" id="login_num_afiliacion"> <br>');

        $('#div_login').append('<button onclick="login();"> Acceder </button>');

    $('#contenido').append('<div class="div_derecha" id="div_registro">');
        $('#div_registro').append('<h3> Registro </h3>');

        $('#div_registro').append('<label> DNI: </label>');
        $('#div_registro').append('<input type="text" id="re_dni"> <br>');

        $('#div_registro').append('<label> Nombre: </label>');
        $('#div_registro').append('<input type="text" id="re_nombre"> <br>');

        $('#div_registro').append('<label> Apellidos: </label>');
        $('#div_registro').append('<input type="text" id="re_apellidos"> <br>');

        $('#div_registro').append('<label> Num Afiliacion: </label>');
        $('#div_registro').append('<input type="pass" id="re_num_afiliacion"> <br>');

        $('#div_registro').append('<label> Email: </label>');
        $('#div_registro').append('<input type="emial" id="re_email"> <br>');

        $('#div_registro').append('<label> Dirección: </label>');
        $('#div_registro').append('<input type="text" id="re_direccion"> <br>');

        $('#div_registro').append('<button onclick="registro();"> Registrar </button>');
}

// Funcion para generar un objUsuario
function Usuario (email, num_afiliacion) {
    
    var obj = {
        email: email,
        num_afiliacion: num_afiliacion
    };

    return obj;  
}

// Funcion para el login de cliente
function login () {
    
    var value_email_login = document.getElementById('login_email').value;
    var value_num_afiliacion_login = document.getElementById('login_num_afiliacion').value;

    if (value_email_login && value_num_afiliacion_login) {

        var objUsuario = Usuario(value_email_login, value_num_afiliacion_login);

        var objUsuario_json = JSON.stringify(objUsuario);
    
        objAjax = AJAXCrearObj();
        objAjax.open('GET', './php/login_usuario.php?objUsuario_json='+objUsuario_json, true); // llamamos al php
        objAjax.send();
        objAjax.onreadystatechange=responder_login;

    } else {

        alert("Rellene todos los campos");
    }
}

// Funcion que nos confirma si el usuario es correcto o no, el php devuelve true o false
function responder_login() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            if (objAjax.responseText == "false") {

                alert("Datos introducidos incorrectos");

            } else {

                var obj_json = JSON.parse(objAjax.responseText);
                global_objUsuario = obj_json;
                mensaje_boton("Datos de usuario correctos", "resumen_cita()");                
            }
        }
    }
}

// Funcion para generar un objUsuario con todos los datos
function Usuario_registro (dni, nombre, apellidos, num_afiliacion, email, direccion) {
    
    var obj = {
        dni: dni,
        nombre: nombre,
        apellidos: apellidos,
        num_afiliacion: num_afiliacion,
        email: email,
        direccion: direccion
    };

    return obj;  
}

//Funcion para el registro del cliente
function registro() {

    var value_re_dni = document.getElementById('re_dni').value;
    var value_re_nombre = document.getElementById('re_nombre').value;
    var value_re_apellidos = document.getElementById('re_apellidos').value;
    var value_re_num_afiliacion = document.getElementById('re_num_afiliacion').value;
    var value_re_email = document.getElementById('re_email').value;
    var value_re_direccion = document.getElementById('re_direccion').value;

    if (value_re_dni && value_re_nombre && value_re_apellidos && value_re_num_afiliacion && value_re_email && value_re_direccion) {

        var objUsuario_registro = Usuario_registro(value_re_dni, value_re_nombre, value_re_apellidos, value_re_num_afiliacion, value_re_email, value_re_direccion);

        global_objUsuario = objUsuario_registro;

        var objUsuario_registro_json = JSON.stringify(objUsuario_registro);
    
        objAjax = AJAXCrearObj();
        objAjax.open('GET', './php/registro_usuario.php?objUsuario_registro_json='+objUsuario_registro_json, true); // llamamos al php
        objAjax.send();
        objAjax.onreadystatechange=responder_registro;

    } else {

        alert("Rellene todos los campos de registro");
    } 
}

// Funcion que confirma el registro del usuario
function responder_registro() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            if (objAjax.responseText == "false") {

                alert("Datos introducidos incorrectos");

            } else {

                mensaje_boton("Usuario añadido correctamente", "resumen_cita()");                
            }
        }
    }
}

// variables para guardar la cita
var global_objUsuario;
var global_objMedico;
var globalFecha;
var global_objTramo;


// Funcion que genera un div de resumen de la cita y la confirma
function resumen_cita () {

    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');

    $('#contenido').append('<div id="resumen_cita" class="div_unaColumna">');

    $('#resumen_cita').append('<h3> Resumen cita </h3>');
    //$('#resumen_cita').append('<p> Datos Cliente </p>');
    $('#resumen_cita').append('<p><b> DNI: </b> ' + global_objUsuario.dni + '</p>');
    $('#resumen_cita').append('<p><b> Nombre: </b> ' + global_objUsuario.nombre + '</p>');
    $('#resumen_cita').append('<p><b> Apellidos: </b> ' + global_objUsuario.apellidos + '</p>');

    $('#resumen_cita').append('<p><b> Medico: </b>' + global_objMedico.nombre + ' ' + global_objMedico.apellidos + '</p>');

    $('#resumen_cita').append('<p><b> Fecha: </b>' + globalFecha + '</p>');

    $('#resumen_cita').append('<p><b> Horario: </b>' + global_objTramo.tramo_inicio + ' </p>');

    $('#resumen_cita').append('<button onclick="confirmarCita();"> Confirmar cita </button>'); 
}

// Funcion para guardar la cita
function confirmarCita() {

    var cita =  {
        global_objUsuario: global_objUsuario,
        global_objMedico: global_objMedico,
        globalFecha: globalFecha,
        global_objTramo: global_objTramo
    };

    var cita_json = JSON.stringify(cita)

    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/insertar_cita.php?cita_json='+cita_json, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_confirmarCita;
    
}

// Funcion para confirmar que se ha guardado la cita
function responder_confirmarCita() {
    
    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            if (objAjax.responseText == "false") {

                mensaje("Error al guardar la cita");

            } else {

                mensaje_boton_nombre("Cita guardada correctamente, se enviará un email.", "imprimir()", "Imprimir PDF");                
            }
        }
    }
}

// Funcion para imprimir
function imprimir() {
    
    var obj = new jsPDF('p', 'mm', 'A4');

    obj.text(20, 20, 'Cita - Clinica Santa Ana');
    obj.text(20, 30, 'Fecha: ' + globalFecha);
    obj.text(20, 40, 'Hora:' + global_objTramo.tramo_inicio);
    obj.text(20, 50, 'Medico: ' + global_objMedico.nombre + ' ' + global_objMedico.apellidos);
    obj.text(20, 60, 'Paciente: ' + global_objUsuario.nombre + ' ' + global_objUsuario.apellidos);

    obj.save("Cita - CLinica Santa Ana.pdf");

}

// Funcion del login de usuario
function div_login_user() {
    
    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');
    
    $('#contenido').append('<div class="div_unaColumna" id="div_login">');
        $('#div_login').append('<h3> Login Usuario </h3>');

        $('#div_login').append('<label> Email: </label>');
        $('#div_login').append('<input type="text" id="login_email"> <br>');

        $('#div_login').append('<label> Num Afiliación: </label>');
        $('#div_login').append('<input type="text" id="login_num_afiliacion"> <br>');

        $('#div_login').append('<button onclick="login_user();"> Acceder </button>');
}

// Funcion que comprueba el login de administrador
function login_user() {

    var value_login_email = document.getElementById('login_email').value;
    var value_login_num_afiliacion = document.getElementById('login_num_afiliacion').value;

    if (value_login_email && value_login_num_afiliacion) {

        var objUsuario = Usuario(value_login_email, value_login_num_afiliacion);

        var objUsuario_json = JSON.stringify(objUsuario);   
    
        objAjax = AJAXCrearObj();
        objAjax.open('GET', './php/login_usuario.php?objUsuario_json='+objUsuario_json, true); // llamamos al php
        objAjax.send();
        objAjax.onreadystatechange=responder_login_user;

    } else {

        alert("Rellene todos los campos");
    }
}

// Funcion para comprobar el login y redireccionarlo
function responder_login_user() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {
           //alert(objAjax.responseText);
            if (objAjax.responseText == "false") {

                mensaje_boton("Datos Incorrectos", "div_login_user()");

            } else {

                //div_baja_citas(objAjax.responseText);

                var objUsuario_json = objAjax.responseText;
                var objUsuario = JSON.parse(objUsuario_json);
                global_objUsuario = objUsuario;

                // Enviamos a un php un objUsuario para que extraiga un array de citas del mismo
                objAjax = AJAXCrearObj();
                objAjax.open('GET', './php/mostrar_citasUsuario.php?objUsuario_json='+objUsuario_json, true); // llamamos al php
                objAjax.send();
                objAjax.onreadystatechange=responder_login_user_baja_citas;              
            }
        }
    }
}

// Funcion que genera la interfaz de baja citas
function responder_login_user_baja_citas() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var array_citas = JSON.parse(objAjax.responseText);

            $('#contenido').children('div').remove();
            $('#contenido').append('<div id="margen"></div>');

            $('#contenido').append('<div class="div_izquierda" id="div_infoUsuario">');
            $('#div_infoUsuario').append('<h3> Datos Usuario </h3>');
            $('#div_infoUsuario').append('<p><b> DNI: </b>' + global_objUsuario.dni + '</p>');
            $('#div_infoUsuario').append('<p><b> Nombre: </b>' + global_objUsuario.nombre + '</p>');
            $('#div_infoUsuario').append('<p><b> Apellidos: </b>' + global_objUsuario.apellidos + '</p>');
            $('#div_infoUsuario').append('<p><b> Num Afiliación: </b>' + global_objUsuario.num_afiliacion + '</p>');

            if (array_citas != "false") {

                $('#contenido').append('<div class="div_izquierda" id="div_bajacitas">');
                $('#div_bajacitas').append('<h3> Citas </h3>');
                $('#div_bajacitas').append('<table id="tabla_bajacitas">');

                $('#tabla_bajacitas').append('<tr id="tr_titulos">')

                $('#tr_titulos').append('<th> Fecha </th>');
                $('#tr_titulos').append('<th> Nombre </th>');
                $('#tr_titulos').append('<th> Apellidos </th>');
                $('#tr_titulos').append('<th> Hora Inicio </th>');
                $('#tr_titulos').append('<th> Hora Final </th>');

                for (var i=0 ; i<array_citas.length ; i++) {

                    $('#tabla_bajacitas').append('<tr class="tr_bajacitas" id="tr_' + i + '" onclick="select_bajacita('+ i +',' + array_citas[i].id_cita + ')">');
                    
                    $('#tr_' + i + '').append('<td>' + array_citas[i].fecha + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].nombre + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].apellidos + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].tramo_inicio + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].tramo_final + '</td>');
                }

                $('#div_bajacitas').append('<input type="text" id="input_bajacita" disabled hidden>');
                $('#div_bajacitas').append('<button onclick="eliminar_cita()"> Eliminar Cita </button>');

            } else {

                $('#contenido').append('<div class="div_izquierda" id="div_bajacitas">');
                $('#div_bajacitas').append('<h3> Citas </h3>');
                $('#div_bajacitas').append('<p> Este usuario no tiene citas </p>');

           }
            
        }
    }
}

function select_bajacita(idTr, idCita) {
    
    // Extraemos la cantidad de hijos que tiene la tabla, y le quitamos uno por el th del titulo
    var table_bajacitas = document.getElementById('tabla_bajacitas');   
    var num_tr = table_bajacitas.childNodes;

    for (var i=0 ; i<num_tr.length-1 ; i++) {

        $('#tr_'+i).attr("style", "background: none");

    }

    // Asignamos el valor 
    $('#input_bajacita').val(idCita);
    $('#tr_'+idTr).attr("style", "background: silver");
}

function eliminar_cita() {
    
    // Recuperamos el valor selecionado, el idCita para eliminarla

    var idCita = $('#input_bajacita').val();

    if (idCita != "") {

        var idCita_json = JSON.stringify(idCita);

        objAjax = AJAXCrearObj();
        objAjax.open('GET', './php/eliminar_cita.php?idCita_json='+idCita_json, true); // llamamos al php
        objAjax.send();
        objAjax.onreadystatechange=responder_eliminar_cita;  

    } else {

        alert("Selecione una cita");
    }
}

function responder_eliminar_cita() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var res = objAjax.responseText;

            if (res == "true") {

                mensaje_boton("Cita eliminada correctamente", "div_login_user()");
            }
        }
    }
}