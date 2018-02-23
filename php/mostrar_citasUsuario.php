<?php 

	include './conexion.php';
	global $conexion;

	$objUsuario_json = $_REQUEST['objUsuario_json'];
	
	$objUsuario = json_decode($objUsuario_json);

	$ordenSQL = "SELECT * FROM citas c, dias_laborables d, medico m, tramo t WHERE id_usuario = (SELECT id_usuario FROM usuario WHERE dni = '" . $objUsuario->dni . "') AND c.id_diasLaborables = d.id_diasLaborables AND d.id_medico = m.id_medico AND c.id_tramo = t.id_tramo;";

	$res = $conexion->query($ordenSQL);
	$filas = $res->num_rows;

	if ($filas > 0) {

		for ($i=0 ; $i<$filas ; $i++) {

			$array[$i] = $res->fetch_array();
			$array_final[$i]['id_cita'] = $array[$i]['id_cita'];
			$array_final[$i]['fecha'] = $array[$i]['fecha'];
			$array_final[$i]['nif'] = $array[$i]['nif'];
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