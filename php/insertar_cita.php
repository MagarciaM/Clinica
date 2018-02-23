<?php 
	
	include './conexion.php';
	global $conexion;

	$cita_json = $_REQUEST['cita_json'];
	
	$cita = json_decode($cita_json);

	//print_r($cita);

	$ordenSQL1 = "SELECT id_diasLaborables FROM dias_laborables WHERE id_medico ='" . $cita->global_objMedico->idMedico ."' AND fecha = '" . $cita->globalFecha ."';";
	//echo $ordenSQL;

	$res1 = $conexion->query($ordenSQL1);
	$filas1 = $res1->num_rows;

	if ($filas1 == 1) {

		$array = $res1->fetch_array();
		$id_diasLaborables = $array['id_diasLaborables'];
		//print_r($id_diasLaborables);
	}

	// Necesitamos extraer el id_usuario del usuario que acaba de registrarse, lo hacemos con una consulta dentro del INSERT

	$ordenSQL2 = "INSERT INTO citas VALUES(null, '" . $id_diasLaborables . "', '" . $cita->global_objTramo->id_tramo . "', (SELECT id_usuario FROM usuario WHERE dni = '" . $cita->global_objUsuario->dni . "'));";
	//echo $ordenSQL2;

	$res2 = $conexion->query($ordenSQL2);

	// Enviamos el correo al cliente

	$ordenSQL3 = "SELECT * FROM usuario WHERE dni = '" . $cita->global_objUsuario->dni . "'";
	$res3 = $conexion->query($ordenSQL3);
	$filas3 = $res3->num_rows;

	if ($filas3 == 1) {

		$array = $res3->fetch_array();
		$email = $array['email'];
		//print_r($id_diasLaborables);
	}

	echo $ordenSQL3;

	$mail = mail($email, "Cita Clinica Santa Ana", "Le enviamos este email para confirmar su cita del dia: " . $cita->globalFecha . " a las " . $cita->global_objTramo->tramo_inicio . "." );

	if (!$res2 && !$mail) {

		echo "false";

	} else {

		echo "true";
	}

?>