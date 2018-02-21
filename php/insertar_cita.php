<?php 
	
	include './conexion.php';
	global $conexion;

	$cita_json = $_REQUEST['cita_json'];
	
	$cita = json_decode($cita_json);

	//print_r($cita);

	$ordenSQL1 = "SELECT id_diasLaborables FROM dias_laborables WHERE id_medico ='" . $cita->global_objMedico ."' AND fecha = '" . $cita->globalFecha ."';";
	//echo $ordenSQL;

	$res1 = $conexion->query($ordenSQL1);
	$filas1 = $res1->num_rows;

	if ($filas1 == 1) {

		$array = $res1->fetch_array();
		$id_diasLaborables = $array['id_diasLaborables'];
		//print_r($id_diasLaborables);
	}

	$ordenSQL2 = "INSERT INTO citas VALUES(null, '" . $id_diasLaborables . "', '" . $cita->global_objTramo . "', '" . $cita->global_objUsuario->id_usuario . "');";
	//echo $ordenSQL2;

	$res2 = $conexion->query($ordenSQL2);

	if (!$res2) {

		echo "false";

	} else {

		echo "true";
	}

?>