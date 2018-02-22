<?php
 
include 'conexion.php';
global $conexion;

class Tramo {

	public $id_tramo;
	public $tramo_inicio;
	public $tramo_final;
	
	public function __construct ($id_tramo, $tramo_inicio, $tramo_final){

		$this->id_tramo = $id_tramo;
		$this->tramo_inicio = $tramo_inicio;
		$this->tramo_final = $tramo_final;
		
	}

	/*public function getid() {
		return $this->id;
	}
	public function gettramo_inicio() {
		return $this->horainicio;
	}
	public function gethorafinal() {
		return $this->horafinal;
	}*/
		
}	

$obj_json_date_idMedico = $_REQUEST['obj_json_date_idMedico'];

$obj = json_decode($obj_json_date_idMedico);

$id = $obj->idMedico;
$dia = $obj->dia;
$fecha = $obj->fecha;

$ordenSQL = "SELECT * FROM tramo WHERE id_tramo_turno IN (SELECT id_h_turno FROM horario WHERE id_h_medico='$id') AND id_tramo_turno IN(SELECT id_turno FROM turno WHERE dia_turno='$dia') AND id_tramo  NOT IN (SELECT id_tramo FROM citas WHERE id_diasLaborables = (SELECT id_diasLaborables FROM dias_laborables WHERE fecha='$fecha' AND id_medico='$id'))";

//echo $ordenSQL;
$res = $conexion->query($ordenSQL);
$filas = $res->num_rows;

$arraytramos=array();

if ($filas > 0) {
	 
	foreach ($res as $array_fila) {
		
		$objtramo = new Tramo($array_fila["id_tramo"], $array_fila["tramo_inicio"], $array_fila["tramo_final"]);
		$arraytramos[] = $objtramo;
												
	}

	$obj_json = json_encode($arraytramos);

	echo $obj_json;

	} else {

		echo json_encode("error");
	}

?>