<?php

	include './conexion.php';
	global $conexion;

	$ordenSQL = 'SELECT * FROM clinica';
	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas > 0) {

		$array = $res->fetch_array();

		$info_clinica['nombre'] = $array['nombre'];
		$info_clinica['telefono'] = $array['telefono'];

		
		$info_clinica_json = json_encode($info_clinica);

		print_r($info_clinica_json);

	} else {

		echo "error";
	}

?>