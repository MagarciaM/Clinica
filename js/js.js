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

function obj_Medico (idMedico, nombre, apellidos) {

    var obj = {
        idMedico: idMedico,
        nombre: nombre,
        apellidos: apellidos
    };

    return obj;
} 

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

                $('#div_medico').append('<div id="medico" class="medico" onclick="formulario_cita(`'+ objMedico.idMedico +'`);">');                              
                $('#medico').append('<img src="./img/logo_medico.jpg">');
                $('#medico').append('<p class="p_medico">'+objMedico.nombre+' '+objMedico.apellidos+'</p>');
                $('#medico').append('<div id="horario'+i+'" class="div_horario">');

                for (var j=0 ; j<obj_json[i].array_turno.length ; j++) {
                    $('#horario'+i+'').append('<p>'+obj_json[i].array_turno[j].dia_turno+': '+obj_json[i].array_turno[j].horario_inicio+' - '+obj_json[i].array_turno[j].horario_final+'</p>');
                }
            }
            
        }
    }
}

// Funcion que se ejecuta al hacer clic en un medico, y genera un formulario para pedir cita
function formulario_cita(idMedico) {

    //alert(objMedico.nombre);

    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');

    $('#contenido').append('<div id="div_elegir_dias" class="div_izquierda">');

        $('#div_elegir_dias').append("<h1> Seleccionar dia </h1>");

        $('#div_elegir_dias').append("<h3> Medico Seleccionado: </h3>");
        $('#div_elegir_dias').append("<p id='nombreMedico'> "+ idMedico +" </p>");
        $('#div_elegir_dias').append("<p id='idMedico' hidden> "+ idMedico +" </p>");

        $('#div_elegir_dias').append("<form id='form_asignar_dias'>");

        //$('#form_asignar_dias').append("<br> <label> Selección: </label> <br>");

            $('#form_asignar_dias').append("<input type='text' id='fechas_seleccionadas_cita' required disabled hidden> <br>");
            $('#form_asignar_dias').append('<div id="calendario"></div>');

        $('#div_elegir_dias').append("<button onclick='seleccionarDia();'> Seleccionar </button>");

        mostrar_diasLaborables(idMedico);
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

            //var aux = objAjax.responseText;

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
    objAjax.open('GET', './php/mostrar_tramosDisponibles.php?obj_json_date_idMedico='+obj_json_date_idMedico, true); // llamamos al php
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
            
                    /*$('#div_tramos').append(obj_json[i].tramo_inicio + ' - ');
                    $('#div_tramos').append(obj_json[i].tramo_final + '<br>');*/

                    var div_tramo = document.createElement("div");
                    var texto_div_tramo = document.createTextNode(obj_json[i].tramo_inicio + " - " + obj_json[i].tramo_final);

                    div_tramo.setAttribute("onclick", "selec_tramo('" + obj_json[i].id_tramo + "')");
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
function selec_tramo(id_tramo) {
    
    var div_tramos = document.getElementById("div_tramos");
    var div_tramo = document.getElementById("tramo"+id_tramo);
    var input_idTramo = document.getElementById("input_idTramo");

    var tramos = div_tramos.childNodes;

    for (var i=0 ; i<tramos.length ; i++) {
        tramos[i].setAttribute("style", "border-color: #1798F3;");
    }
    
    div_tramo.setAttribute("style", "border-color: #00B362");
    //alert(id_tramo);

    input_idTramo.setAttribute("value", id_tramo);
}

// Funcion a la que llama el boton al selecionar el tramo, recoge el id del tramo del input
function select_tramo () {

    var valor_input_idTramo = document.getElementById("input_idTramo").value;

    if (valor_input_idTramo) {

        //alert(valor_input_idTramo);
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

        $('#div_login').append('<label> DNI: </label>');
        $('#div_login').append('<input type="text" id="login_dni"> <br>');

        $('#div_login').append('<label> Contraseña: </label>');
        $('#div_login').append('<input type="pass" id="login_pass">');

        $('#div_login').append('<button onclick="login();"> Acceder </button>');

    $('#contenido').append('<div class="div_derecha" id="div_registro">');
        $('#div_registro').append('<h3> Registro </h3>');

        $('#div_registro').append('<label> DNI: </label>');
        $('#div_registro').append('<f type="text" id="re_dni"> <br>');

        $('#div_registro').append('<label> Nombre: </label>');
        $('#div_registro').append('<input type="text" id="re_nombre"> <br>');

        $('#div_registro').append('<label> Apellidos: </label>');
        $('#div_registro').append('<input type="text" id="re_apellidos"> <br>');

        $('#div_registro').append('<label> Contraseña: </label>');
        $('#div_registro').append('<input type="pass" id="re_pass"> <br>');

        $('#div_registro').append('<label> Email: </label>');
        $('#div_registro').append('<input type="emial" id="re_email"> <br>');

        $('#div_registro').append('<label> Dirección: </label>');
        $('#div_registro').append('<input type="text" id="re_direccion"> <br>');

        $('#div_registro').append('<button onclick="registrar();"> Registrar </button>');
}