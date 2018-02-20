<?php

	include './conexion.php';
	global $conexion;

	$obj_json = $_REQUEST['obj_json'];

	$obj_json = json_decode($obj_json);

	// Separamos los dias y generamos un array con ellos
	$array_dias = explode(",", $obj_json->arrayDias);

	$aux = "true";

	for ($i=0 ; $i<count($array_dias) ; $i++) {

		$ordenSQL = 'INSERT INTO dias_laborables (id_medico, fecha) VALUES("' . $obj_json->idMedico . '", "' . $array_dias[$i] . '")';
		
		$res = $conexion->query($ordenSQL);

		if (!$res) {

			$aux = "false";
			break;
		}
	}

	echo $aux;

?>