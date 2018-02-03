<?php

	include './conexion.php';
	global $conexion;

	$json_dias = $_REQUEST['json_dias'];
	$idMedico = $_REQUEST['idMedico'];

	$dias = json_decode($json_dias);

	// Separamos los dias y generamos un array con ellos
	$array_dias = explode(",", $dias);

	$aux = "true";

	for ($i=0 ; $i<count($array_dias) ; $i++) {

		$ordenSQL = 'INSERT INTO dias_laborables (id_medico, fecha) VALUES("' . $idMedico . '", "' . $array_dias[$i] . '")';
		
		$res = $conexion->query($ordenSQL);

		if (!$res) {

			$aux = "false";
			break;
		}
	}

	echo $aux;

?>