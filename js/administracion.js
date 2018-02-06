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

// Funcion ejecutada con el boton del menu asignar dias, llama a getMedicos que recoge del servidor 
//	los medicos y se los pasa en un array a la funcion "genera_formulario_asignar_dias" que genera un form.
function asignar_dias() {
	
	getMedicos();

}

function getMedicos () {

 	objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_medico.php', true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_medico;
}

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
				//addDisabledDates: [date.setDate(15)],
				altField: '#fechas_seleccionadas',
				beforeShowDay: $.datepicker.noWeekends
			});

		$('#div_asignar_dias').append("<button onclick='enviar();'> Enviar </button>");
}

// Funcion llamada desde el boton de enviar del formulario
function enviar () {

	var dates = $('#fechas_seleccionadas').val();
	var idMedico = $('#select_medicos').val();

	if (dates == "") {
		alert('Selecione al menos una fecha');
	} else {
		addDias(idMedico, dates);
	}
}

function addDias (idMedico, dias_laborables) {

	var json_dias = JSON.stringify(dias_laborables);

	//alert(json_dias);

	objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/addDias.php?json_dias='+json_dias+'&idMedico='+idMedico, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_addDias;
}

function responder_addDias () {

	if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            //alert(objAjax.responseText);

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