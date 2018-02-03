<?php

	include './conexion.php';
	global $conexion;

	$ordenSQL = 'SELECT * FROM clinica';
	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas > 0) {

		$array[] = $res->fetch_array();

		$info_clinica = $array[0][1];
		echo $info_clinica;

	} else {

		echo "error";
	}

?>