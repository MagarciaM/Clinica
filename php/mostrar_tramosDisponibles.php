<?php 

	include './conexion.php';
	global $conexion;

	$obj_json_date_idMedico = $_REQUEST['obj_json_date_idMedico'];
	
	$obj = json_decode($obj_json_date_idMedico);

	// Extraemos los id_turno que corresponden tanto al dia de la semana recibido (expresado en 1=lunes) como para el medico

	$ordenSQL1 = 'SELECT id_turno FROM turno WHERE dia_turno="' . $obj->dia . '";';

	$res1 = $conexion->query($ordenSQL1);
	$filas1 = $res1->num_rows;

	if ($filas1 > 0) {

		for ($i=0 ; $i<$filas1 ; $i++) {

			$aux1[] = $res1->fetch_array();
			$array_turno[] = $aux1[$i]["id_turno"];		
		}

	} else {
		echo "No se han encontado resultados";
	}

	// Ahora los id_turno del medico

	$ordenSQL2 = 'SELECT id_h_turno FROM horario WHERE id_h_medico ="' . $obj->idMedico . '";';

	$res2 = $conexion->query($ordenSQL2);
	$filas2 = $res2->num_rows;

	if ($filas2 > 0) {

		for ($i=0 ; $i<$filas2 ; $i++) {

			$aux2[] = $res2->fetch_array();
			$array_turno[] = $aux2[$i]["id_h_turno"];		
		}

	} else {
		echo "No se han encontado resultados";
	}

	// Genero un array con los id_turno del dia y del medico recibidos, ahora quitamos los duplicados del array para realizar la sigueinte consulta

	$array_turno_final = array_unique($array_turno);

	// Extraemos los tramos del los turnos que tenemos dentro del array

	for ($i=0 ; $i<count($array_turno_final) ; $i++){

	$ordenSQL3 = 'SELECT * FROM tramo WHERE id_tramo_turno ="' . $array_turno_final[$i] . '";';

		$res3 = $conexion->query($ordenSQL3);
		$filas3 = $res3->num_rows;

		if ($filas3 > 0) {

			for ($i=0 ; $i<$filas3 ; $i++) {

				$aux3[] = $res3->fetch_array();
				$array_tramo[$i]["id_tramo"] = $aux3[$i]["id_tramo"];
				$array_tramo[$i]["id_tramo_turno"] = $aux3[$i]["id_tramo_turno"];
				$array_tramo[$i]["tramo_inicio"] = $aux3[$i]["tramo_inicio"];
				$array_tramo[$i]["tramo_final"] = $aux3[$i]["tramo_final"];		
			}

		} else {
			echo "No se han encontado resultados";
			break;
		}
	}

	// Extraemos los tramos que ya estan reservados con una cita, y comparamos con los que ya tenemos. Los tramos libres los añadimos a un array y los devolvemos para mostrarlos al usuario

	$ordenSQL4 = "SELECT id_tramo FROM citas WHERE id_diasLaborables = (SELECT id_diasLaborables FROM dias_laborables WHERE fecha = '" . $obj->fecha . "' AND id_medico = '" . $obj->idMedico ."')";

	$res4 = $conexion->query($ordenSQL4);
	$filas4 = $res4->num_rows;

	if ($filas4 > 0) {

		for ($i=0 ; $i<$filas4 ; $i++) {

				$aux4[] = $res4->fetch_array();
				$array_tramoOcupado[$i]["id_tramo"] = $aux4[$i]["id_tramo"];		
			}

	} else {

		
	}

	if (($filas1 && $filas2 && $filas3 && $filas4) > 0) {

		// Sacamos del array de tramos, los tramos que ya se encuentran dentro de la tabla citas, es decir, los que ya estan ocupados

		for ($i=0 ; $i<count($array_tramo) ; $i++) {

			for ($j=0 ; $j<count($array_tramoOcupado) ; $j++) {

				if ($array_tramoOcupado[$j]["id_tramo"] == $array_tramo[$i]["id_tramo"]) {

				} else {
					$array_tramoLibre[] = $array_tramo[$i];
				}
			}
		}

		print_r(json_encode($array_tramoLibre));

	} else {

		print_r(json_encode("error")); // pasamos a JSON para que al decodificar en el js, no salte error.
	}
	
?>