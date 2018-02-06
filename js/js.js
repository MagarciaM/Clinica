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

$(document).ready(function() {

    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_nombre.php', true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_load;
});


function responder_load() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

        	var titulo = document.getElementById('titulo');
			var texto_titulo = document.createTextNode(objAjax.responseText);

			titulo.appendChild(texto_titulo);
        } 
    } 
}

function info() {

	objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_info.php', true); // llamamos al php
    objAjax.send();
	objAjax.onreadystatechange=responder_info_1;

}

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

function especialidad() {
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_especialidad.php', true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_especialidad;
}

function responder_especialidad() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            var obj_json = JSON.parse(objAjax.responseText);
            $('#contenido').children('div').remove();
            
            $('#contenido').append('<div id="margen"></div>');
            $('#contenido').append('<div id="div_especialidad">');
            $('#div_especialidad').append('<h2> Especialidades </h2>');

            for (var i=0 ; i<obj_json.length ; i++) {
                $('#div_especialidad').append('<div class="medico"><img src="'+obj_json[i].url_img+'"><a onclick="mostrar_medico('+obj_json[i].id_especialidad+');">'+obj_json[i].nombre+'</div>');
            }
            
        }
    }   
}

function mostrar_medico(id_especialidad) {
    
    var json_id_especialidad = JSON.parse(id_especialidad);
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_medico_turno.php?json_id_especialidad='+json_id_especialidad, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_mostrar_medico;
}

function responder_mostrar_medico() {

    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            //alert(objAjax.responseText);

            $('#div_medico').remove();

            var obj_json = JSON.parse(objAjax.responseText);

            $('#contenido').append('<div id="div_medico">');
            $('#div_medico').append('<h2> Médicos </h2>');

            for (var i=0 ; i<obj_json.length ; i++) {
                $('#div_medico').append('<div class="medico" onclick="formulario_cita(`'+obj_json[i].id_medico +'`);">'+
                                            '<img src="./img/logo_medico.jpg">'+
                                            '<p class="p_medico">'+obj_json[i].nombre+' '+obj_json[i].apellidos+'</p><br>'+
                                            '<div id="horario'+i+'" class="div_horario"></div>'+                                         
                                        '</div>');
                for (var j=0 ; j<obj_json[i].array_turno.length ; j++) {
                    $('#horario'+i+'').append('<p>'+obj_json[i].array_turno[j].dia_turno+': '+obj_json[i].array_turno[j].horario_inicio+' - '+obj_json[i].array_turno[j].horario_final+'</p>');
                }
            }
            
        }
    }
}

function formulario_cita(id_medico) {
   //alert(nombreMedico);

    $('#contenido').children('div').remove();
    $('#contenido').append('<div id="margen"></div>');

    $('#contenido').append('<div id="div_elegir_dias" class="div_unaColumna">');

        $('#div_elegir_dias').append("<h1> Seleccionar dia </h1>");

        $('#div_elegir_dias').append("<h3> Medico Seleccionado: </h3>");
        $('#div_elegir_dias').append("<p> "+ id_medico +" </p>");

        $('#div_elegir_dias').append("<form id='form_asignar_dias'>");

        $('#form_asignar_dias').append("<br> <label> Selección: </label> <br>");

            $('#form_asignar_dias').append("<input type='text' id='fechas_seleccionadas_cita' required disabled> <br>");
            $('#form_asignar_dias').append('<div id="calendario"></div>');

            //var date = new Date();

            /*$('#calendario').multiDatesPicker({
                dateFormat: "yy-mm-dd",
                altField: '#fechas_seleccionadas_cita',
                maxPicks: 1
            });*/

        $('#div_elegir_dias').append("<button onclick='seleccionarDia();'> Seleccionar </button>");

        mostrar_diasLaborables(id_medico);
}

function mostrar_diasLaborables (id_medico) {

    var json_idMedico = JSON.parse(id_medico);
    
    objAjax = AJAXCrearObj();
    objAjax.open('GET', './php/mostrar_diasLaborables.php?json_idMedico='+json_idMedico, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_diasLaborables;
}

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

            $('#calendario').datepicker({

                altField: '#fechas_seleccionadas_cita',
                maxPicks: 1,

                beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [ array.indexOf(string) != -1 ]
                }
            });  
        }
    }
}

function seleccionarDia () {
    
    var fecha = $('#fechas_seleccionadas_cita').val();

    if (fecha) {
        var date = new Date(fecha);
        alert(date);

        // SELECT * FROM tramo WHERE id_tramo_turno IN (SELECT id_h_turno FROM horario WHERE id_h_medico = '3');
    } else {
        alert("Selecione una fecha");
    }
}
