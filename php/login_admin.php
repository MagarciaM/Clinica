<?php 
	
	include './conexion.php';
	global $conexion;

	$objUsuario_json = $_REQUEST['objUsuario_json'];
	
	$objUsuario = json_decode($objUsuario_json);

	//print_r($objUsuario->dni);

	$ordenSQL = "SELECT pass FROM administrador WHERE nombre = '" . $objUsuario->dni . "'";
	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas == 1) {

		$array = $res->fetch_array();
		$pass = $array['pass'];
		//print_r($pass);

		if ($pass == $objUsuario->pass) {

			echo "true";
		} else {

			echo "false";
		}

	} else {
		
		echo "false";
	}
?>