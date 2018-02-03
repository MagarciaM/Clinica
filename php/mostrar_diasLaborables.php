<?php

	include './conexion.php';
	global $conexion;

	$json_idMedico = $_REQUEST['json_idMedico'];

	$json_idMedico = json_decode($json_idMedico);

	$ordenSQL = 'SELECT * FROM dias_laborables WHERE id_medico = "' . $json_idMedico . '";';
	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas > 0) {

		for ($i=0 ; $i<$filas ; $i++) {

			$array[] = $res->fetch_assoc();
		};
		

		$obj_JSON = json_encode($array);

		echo $obj_JSON;

	} else {

		echo "error";
	}

?>