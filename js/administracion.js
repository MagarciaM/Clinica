// Js para la parte de administración

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

// Funcion ejecutada con el boton del menu "asignar dias", llama a getMedicos que recoge del servidor los medicos
function asignar_dias() {
	
	getMedicos();

}


function getMedicos () {

 	objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_medico.php', true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_medico;
}

// Funcion que recoge los medicos y se los pasa en un array a la siguiente funcion
function responder_medico () {
	if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var obj_json = JSON.parse(objAjax.responseText);
            //alert(obj_json);
            genera_formulario_asignar_dias(obj_json);
        }
    }
}

// Funcion que genera el formulario para asignar los dias laborables a los medicos
function genera_formulario_asignar_dias (array_medicos) {

	$('#contenido').children('div').remove();

	$('#contenido').append('<div id="margen"></div>');
	$('#contenido').append("<div id='div_asignar_dias' class='div_unaColumna'>");

		$('#div_asignar_dias').append("<h1> Asignación dias laborables </h1>");

		$('#div_asignar_dias').append("<form id='form_asignar_dias'>");

			/*$('#form_asignar_dias').append("<label> Selecciona Especialidad </label> <br>");

			$('#form_asignar_dias').append("<select id='select_especialidad'>");
				$('#select_especialidad').append("<option selected> Ej: Cardiología </option>");*/

			$('#form_asignar_dias').append("<label> Selecciona Medico </label> <br>");

			$('#form_asignar_dias').append("<select id='select_medicos'>");

			for (var i=0 ; i<array_medicos.length ; i++) {
				$('#select_medicos').append("<option value=" + array_medicos[i].id_medico + "> "+ array_medicos[i].nombre + " " +array_medicos[i].apellidos + " </option>");
			}

			$('#form_asignar_dias').append("<br> <label> Selecciona dias laborables </label> <br>");

			$('#form_asignar_dias').append("<input type='text' id='fechas_seleccionadas' required disabled style='visibility:hidden'> <br>");
			$('#form_asignar_dias').append('<div id="calendario"></div>');

			var date = new Date();

			$('#calendario').multiDatesPicker({
				dateFormat: "yy-mm-dd",
				altField: '#fechas_seleccionadas',
				minDate: 1,
				firstDay: 1,
				beforeShowDay: $.datepicker.noWeekends
			});

		$('#div_asignar_dias').append("<button onclick='enviar();'> Enviar </button>");
}

// Funcion llamada desde el boton de enviar del formulario para asignar los dias
function enviar () {

	var dates = $('#fechas_seleccionadas').val();
	var idMedico = $('#select_medicos').val();

	if (dates == "") {
		alert('Selecione al menos una fecha');
	} else {
		addDias(idMedico, dates);
	}
}

// Contructor de un obj que contiene el idMedico y los diasLaborables
function obj_dias_medico(id_Medico, dias_laborables) {

	var obj = {
		idMedico: id_Medico,
		arrayDias: dias_laborables
	};

	return obj;
}

// Funcion que va al servidor para insertar los dias que el medico trabaja
function addDias (id_Medico, dias_laborables) {

	var obj_diasMedico = obj_dias_medico(id_Medico, dias_laborables);

	var obj_json = JSON.stringify(obj_diasMedico);

	objAjax = AJAXCrearObj();
    //objAjax.open('GET', './php/addDias.php?json_dias='+json_dias+'&idMedico='+idMedico, true); // llamamos al php
    objAjax.open('GET', './php/addDias.php?obj_json='+obj_json, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_addDias;

}

// Funcion que devuelve la confirmacion del guardado de dias
function responder_addDias () {

	if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

           	if (objAjax.responseText == "true") {

            	mensaje("Guardado Correctamente");
            } else {

            	mensaje("¡Error!");
            }
        }
    }
}

// Funcion para sacar mensajes por pantalla
function mensaje (contenido) {

	$('#contenido').children('div').remove();

	$('#contenido').append('<div id="margen"></div>');
	$('#contenido').append("<div id='mensaje' class='div_unaColumna'>");
		$('#mensaje').append("<h4>" + contenido + "</h4>");
}

// Funcion para sacar mensajes por pantalla, con boton que llama a otra funcion
function mensaje_boton (contenido, funcion_boton) {

	$('#contenido').children('div').remove();

	$('#contenido').append('<div id="margen"></div>');
	$('#contenido').append("<div id='mensaje' class='div_unaColumna'>");
		$('#mensaje').append("<h4>" + contenido + "</h4>");
		$('#mensaje').append("<button onclick='" + funcion_boton +"'> Continuar </button>");
}

// Funcino del login de administracion
function div_login_admin() {
	
    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');
    
    $('#contenido').append('<div class="div_unaColumna" id="div_login">');
        $('#div_login').append('<h3> Login </h3>');

        $('#div_login').append('<label> DNI: </label>');
        $('#div_login').append('<input type="text" id="login_dni_admin"> <br>');

        $('#div_login').append('<label> Contraseña: </label>');
        $('#div_login').append('<input type="password" id="login_pass_admin"> <br>');

        $('#div_login').append('<button onclick="login_admin();"> Acceder </button>');
}

// Funcion que comprueba el login de administrador
function login_admin() {

    var value_nombre_login_admin = document.getElementById('login_dni_admin').value;
    var value_pass_login_admin = document.getElementById('login_pass_admin').value;

    if (value_nombre_login_admin && value_pass_login_admin) {

        var objUsuario = Usuario(value_nombre_login_admin, value_pass_login_admin);

        //alert(objUsuario.dni + objUsuario.pass);

        var objUsuario_json = JSON.stringify(objUsuario);
        //alert(objUsuario_json);
    
        objAjax = AJAXCrearObj();
        objAjax.open('GET', './php/login_admin.php?objUsuario_json='+objUsuario_json, true); // llamamos al php
        objAjax.send();
        objAjax.onreadystatechange=responder_login_admin;

    } else {

        alert("Rellene todos los campos");
    }

}

// Funcion para comprobar el login y redireccionarlo
function responder_login_admin() {

	if (objAjax.readyState == 4){
        if (objAjax.status == 200) {
            //alert(objAjax.responseText);

            if (objAjax.responseText == "true") {

                // Redireccion al html de administracion
                window.location.href = "panel.html";

            } else {

                mensaje_boton("Datos Incorrectos", "div_login_admin()");
            }

        }
    }
}