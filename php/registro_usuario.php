<?php 
	
	include './conexion.php';
	global $conexion;

	$objUsuario_registro_json = $_REQUEST['objUsuario_registro_json'];
	
	$objUsuario = json_decode($objUsuario_registro_json);

	//print_r($objUsuario);

	$ordenSQL = "INSERT INTO usuario VALUES(null, '" . $objUsuario->dni . "', '" . $objUsuario->pass . "', '" . $objUsuario->nombre . "', '" . $objUsuario->apellidos . "', '" . $objUsuario->email . "', '" . $objUsuario->direccion . "');";

	$res = $conexion->query($ordenSQL);

	if (!$res) {

		echo "false";

	} else {

		echo "true";
	}

?>