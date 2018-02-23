<?php 
	
	include './conexion.php';
	global $conexion;

	$objUsuario_json = $_REQUEST['objUsuario_json'];
	
	$objUsuario = json_decode($objUsuario_json);

	//print_r($objUsuario->dni);

	$ordenSQL = "SELECT * FROM usuario WHERE email = '" . $objUsuario->email . "'";
	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas == 1) {

		$array = $res->fetch_array();
		$num_afiliacion = $array['num_afiliacion'];
		//print_r($ordenSQL);

		if ($num_afiliacion == $objUsuario->num_afiliacion) {

			$array_json = json_encode($array);

			print_r($array_json);

		} else {

			echo "false";
		}

	} else {

		echo "false";
	}
?>