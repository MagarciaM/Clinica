<?php 

	include './conexion.php';
	global $conexion;

	$idMedico_dia_json = $_REQUEST['idMedico_dia_json'];
	
	$idMedico_dia = json_decode($idMedico_dia_json);

	//print_r($idMedico_dia);

	$ordenSQL = "SELECT * FROM citas c, usuario u, tramo t WHERE id_diasLaborables = (SELECT id_diasLaborables FROM dias_laborables WHERE id_medico = '" . $idMedico_dia->idMedico . "' AND fecha = '" . $idMedico_dia->fecha . "') AND c.id_usuario = u.id_usuario AND c.id_tramo = t.id_tramo;";

	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas > 0) {

		for ($i=0 ; $i<$filas ; $i++) {

			$array[$i] = $res->fetch_array();
			$array_final[$i]['id_cita'] = $array[$i]['id_cita'];
			$array_final[$i]['dni'] = $array[$i]['dni'];
			$array_final[$i]['num_afiliacion'] = $array[$i]['num_afiliacion'];
			$array_final[$i]['nombre'] = $array[$i]['nombre'];
			$array_final[$i]['apellidos'] = $array[$i]['apellidos'];
			$array_final[$i]['tramo_inicio'] = $array[$i]['tramo_inicio'];
			$array_final[$i]['tramo_final'] = $array[$i]['tramo_final'];
		}

		$array_final_json = json_encode($array_final);
		print_r($array_final_json);

	} else {

		print_r(json_encode("false"));
	}
?>