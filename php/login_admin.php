<?php 
	
	include './conexion.php';
	global $conexion;

	$admin_json = $_REQUEST['admin_json'];
	
	$admin = json_decode($admin_json);

	//print_r($objUsuario->dni);

	$ordenSQL = "SELECT pass FROM administrador WHERE nombre = '" . $admin->nombre . "'";
	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas == 1) {

		$array = $res->fetch_array();
		$pass = $array['pass'];
		//print_r($pass);

		if ($pass == $admin->pass) {

			echo "true";
		} else {

			echo "false";
		}

	} else {
		
		echo "false";
	}
?>