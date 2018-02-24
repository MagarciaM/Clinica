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

// Variable global de array de medicos, y llamamos a la funcion para que lo rellene
getMedicos();
var array_medicos;

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

            array_medicos = JSON.parse(objAjax.responseText);
            
        }
    }
}

// Funcion que genera el formulario para asignar los dias laborables a los medicos
function asignar_dias () {

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

// Funcion para sacar mensajes por pantalla, con boton que llama a otra funcion y nombre del boton
function mensaje_boton_nombre (contenido, funcion_boton, nombreBoton) {

	$('#contenido').children('div').remove();

	$('#contenido').append('<div id="margen"></div>');
	$('#contenido').append("<div id='mensaje' class='div_unaColumna'>");
		$('#mensaje').append("<h4>" + contenido + "</h4>");
		$('#mensaje').append("<button onclick='" + funcion_boton +"'> " + nombreBoton +" </button>");
}

// Funcion del login de administracion
function div_login_admin() {
	
    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');
    
    $('#contenido').append('<div class="div_unaColumna" id="div_login">');
        $('#div_login').append('<h3> Login Administrador </h3>');

        $('#div_login').append('<label> Nombre: </label>');
        $('#div_login').append('<input type="text" id="login_nombre_admin"> <br>');

        $('#div_login').append('<label> Contraseña: </label>');
        $('#div_login').append('<input type="password" id="login_pass_admin"> <br>');

        $('#div_login').append('<button onclick="login_admin();"> Acceder </button>');
}

// Funcion para generar un objAdministrador
function Administrador (nombre, pass) {
    
    var obj = {
        nombre: nombre,
        pass: pass
    };

    return obj;  
}

// Funcion que comprueba el login de administrador
function login_admin() {

    var value_nombre_login_admin = document.getElementById('login_nombre_admin').value;
    var value_pass_login_admin = document.getElementById('login_pass_admin').value;

    if (value_nombre_login_admin && value_pass_login_admin) {

        var admin = Administrador(value_nombre_login_admin, value_pass_login_admin);

        //alert(objUsuario.dni + objUsuario.pass);

        var admin_json = JSON.stringify(admin);
        //alert(objUsuario_json);
    
        objAjax = AJAXCrearObj();
        objAjax.open('GET', './php/login_admin.php?admin_json='+admin_json, true); // llamamos al php
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

//Funcion que genera un el formulario para elegir medio y dia
function div_listadoCitas_medicoDia() {
	
	$('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');

    $('#contenido').append('<div class="div_izquierda" id="div_listadoCitas">');
    $('#div_listadoCitas').append('<h3> Listado Citas </h3>');

    $('#div_listadoCitas').append("<label> Selecciona Medico </label> <br>");

		$('#div_listadoCitas').append("<select id='select_medicos' onchange='seleccionarMedico()'>");

		for (var i=0 ; i<array_medicos.length ; i++) {
			$('#select_medicos').append("<option value=" + array_medicos[i].id_medico + "> "+ array_medicos[i].nombre + " " +array_medicos[i].apellidos + " </option>");
		}

        //$('#div_listadoCitas').append('<div id="calendario"><br></div>');
        $('#div_listadoCitas').append("<input type='text' id='fechas_seleccionadas_cita' required disabled hidden> <br>");
}

// Funcion que envia el valor del idMedico
function seleccionarMedico() {

	// Volvemos a crear el div del calendario para que se no queden dia prefijados
	$('#calendario').remove();
	$('#div_listadoCitas').append('<div id="calendario"><br></div>');
	
	var idMedico = $('#select_medicos').val();
	mostrar_diasLaborables(idMedico);

	$('#button_selecionarMedico').remove();
	$('#div_listadoCitas').append("<button id='button_selecionarMedico' onclick='seleccionarFecha();'> Seleccionar fecha</button>");  
}

// Funcion que recoge el valor de la fecha selecionada, recibe el idMedico y llama al php para extraer las citas
function seleccionarFecha() {

	$('#div_listadoCitas_derecha').remove();

	var idMedico = $('#select_medicos').val();
	var fecha = $('#fechas_seleccionadas_cita').val();

	var idMedico_dia =  {
		idMedico: idMedico,
		fecha: fecha
	}

	var idMedico_dia_json = JSON.stringify(idMedico_dia);

	objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_citasMedicoDia.php?idMedico_dia_json='+idMedico_dia_json, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_citasMedicoDia;	
}

// Funcion que recibe un array de citas para el medico y en una fecha concreta 
function responder_citasMedicoDia() {
	
	if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var array_citas = JSON.parse(objAjax.responseText);

            if (array_citas != "false") {

                $('#contenido').append('<div class="div_derecha" id="div_listadoCitas_derecha">');
                $('#div_listadoCitas_derecha').append('<h3> Citas </h3>');
                $('#div_listadoCitas_derecha').append('<table id="tabla_bajacitas">');

                $('#tabla_bajacitas').append('<tr id="tr_titulos">')

                $('#tr_titulos').append('<th> Num afiliación </th>');
                $('#tr_titulos').append('<th> Nombre </th>');
                $('#tr_titulos').append('<th> Apellidos </th>');
                $('#tr_titulos').append('<th> Hora Inicio </th>');
                $('#tr_titulos').append('<th> Hora Final </th>');

                for (var i=0 ; i<array_citas.length ; i++) {

                    $('#tabla_bajacitas').append('<tr class="tr_bajacitas" id="tr_' + i + '" onclick="select_bajacita('+ i +',' + array_citas[i].id_cita + ')">');
                    
                    $('#tr_' + i + '').append('<td>' + array_citas[i].num_afiliacion + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].nombre + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].apellidos + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].tramo_inicio + '</td>');
                    $('#tr_' + i + '').append('<td>' + array_citas[i].tramo_final + '</td>');
                }

            } else {

                $('#contenido').append('<div class="div_izquierda" id="div_listadoCitas_derecha">');
                $('#div_listadoCitas_derecha').append('<h3> Citas </h3>');
                $('#div_listadoCitas_derecha').append('<p> Este medico no tiene citas este dia </p>');
            }

        }
    }
}
