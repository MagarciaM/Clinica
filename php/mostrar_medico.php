<?php

	include './conexion.php';
	global $conexion;

	$ordenSQL = 'SELECT * FROM medico';
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