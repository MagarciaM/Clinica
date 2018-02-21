<?php 
	
	include './conexion.php';
	global $conexion;

	$objUsuario_json = $_REQUEST['objUsuario_json'];
	
	$objUsuario = json_decode($objUsuario_json);

	print_r($objUsuario);
?>