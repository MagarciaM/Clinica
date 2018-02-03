<?php
	//Configuracion de la conexion a base de datos
	$bd_host = "localhost"; 
	$bd_usuario = "root"; 
	$bd_password = "root"; 
	$bd_base = "bd_clinica_magm"; 

	$conexion = new mysqli($bd_host, $bd_usuario, $bd_password);
	if ($conexion) {
	    $conexion->select_db($bd_base);
	}
?>