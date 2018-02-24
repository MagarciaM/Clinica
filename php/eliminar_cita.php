<?php 
	
	include './conexion.php';
	global $conexion;

	$idCita_json = $_REQUEST['idCita_json'];
	
	$idCita = json_decode($idCita_json);

	$ordenSQL = "DELETE FROM citas WHERE id_cita = '" . $idCita . "';";

	$res = $conexion->query($ordenSQL);

	if ($res) {

		echo "true";

	} else {

		echo "false";
	}

?>