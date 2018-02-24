<?php 
	
	include './conexion.php';
	global $conexion;

	/**
	* Clase Medico con turnos
	*/
	class Medico_turno
	{
		// usamos public para que las variables sea visibles desde el js
		public $id_medico;
		public $nif;
		public $nombre;
		public $apellidos;
		public $id_especialidad;

		public $array_turno = array();
		
		function __construct($id_medico, $nif, $nombre, $apellidos, $id_especialidad, $array_turno)
		{
			$this->id_medico = $id_medico;
			$this->nif = $nif;
			$this->nombre = $nombre;
			$this->apellidos = $apellidos;
			$this->id_especialidad = $id_especialidad;
			$this->array_turno = $array_turno;
		}

		public function getId_medico() {
       		return $this->id_medico;
    	}

    	public function setTurno ($array_turno) {
    		$this->array_turno = $array_turno;
    	}
	}

	/**
	* CLase Turno 
	*/
	class Turno
	{
		public $id_turno;
		public $dia_turno;
		public $horario_inicio;
		public $horario_final;
		
		function __construct($id_turno, $n_dia_turno, $horario_inicio, $horario_final) {
			$this->id_turno = $id_turno;
			$this->setDia($n_dia_turno);
			$this->horario_inicio = $horario_inicio;
			$this->horario_final = $horario_final;
		}

		public function setDia($n_dia_turno) {

			$array_dias['1'] = 'Lunes';
			$array_dias['2'] = 'Martes';
			$array_dias['3'] = 'Miércoles';
			$array_dias['4'] = 'Jueves';
			$array_dias['5'] = 'Viernes';


    		$this->dia_turno = $array_dias[$n_dia_turno];
    	}
	}

	// extraemos los datos del medico en funcion a su especialidad

	$json_id_especialidad = $_REQUEST['json_id_especialidad'];

	$id_especialidad = json_decode($json_id_especialidad);

	// extraemos todos los id de medico con coincidan con esa especialidad
	$ordenSQL1 = 'SELECT * FROM medico WHERE id_especialidad="' . $id_especialidad . '";';

	$res1 = $conexion->query($ordenSQL1);
	$filas1 = $res1->num_rows;

	if ($filas1 > 0) {

		// Declaramos varios los array para que no se solapen los datos introducidos anteriormente
		$aux1 = array();
		$arrayMedicos = array();

		for ($i=0 ; $i<$filas1 ; $i++) {
                $aux1[] = $res1->fetch_array();
                $arrayMedicos[]= new Medico_turno($aux1[$i]['id_medico'], 
                                                    $aux1[$i]['nif'], 
                                                    $aux1[$i]['nombre'], 
                                                    $aux1[$i]['apellidos'], 
                                                    $aux1[$i]['id_especialidad'], null);
                // Contruimos los medicos y de momento dejamos el array de turnos que podrian tener a null, por no tener que hacer otra clase
        }

	} else {
		echo "No se han encontado médicos";
	}

	// Extraemos el id de los turnos que le corresponden a cada medico
	$dimension = count($arrayMedicos);

	for ($i=0 ; $i<$dimension ; $i++) {

		$ordenSQL2 = 'SELECT id_h_turno FROM horario WHERE id_h_medico = "' . $arrayMedicos[$i]->getId_medico() . '";';

		$res2 = $conexion->query($ordenSQL2);
		$filas2 = $res2->num_rows;

		if ($filas2 > 0) {

			// Declaramos varios los array para que no se solapen los datos introducidos anteriormente
			$array_id_h_turno = array();
			$aux2 = array();

			for ($x=0 ; $x<$filas2 ; $x++) {

				$aux2[] = $res2->fetch_array();
				
				$array_id_h_turno[] = $aux2[$x]['id_h_turno'];
			}
			
		}

		$dimension3 = count($array_id_h_turno);

		// Declaramos varios los array para que no se solapen los datos introducidos anteriormente
		$array_turno = array();
		$aux3 = array();

		for ($z=0 ; $z<$dimension3 ; $z++) {
			// Sacamos los datos del turno que coincide con el id_turno extraido antes
			$ordenSQL3 = 'SELECT * FROM turno WHERE id_turno = "' .  $array_id_h_turno[$z] . '";';

			$res3 = $conexion->query($ordenSQL3);
			$filas3 = $res3->num_rows;

			if ($filas3 > 0) {

					$aux3 = $res3->fetch_array();
					$array_turno[] = new Turno ($aux3['id_turno'],
												$aux3['dia_turno'],
												$aux3['horario_inicio'],
												$aux3['horario_final']);
			}
		}

		$arrayMedicos[$i]->setTurno($array_turno);
	}

	$obj_JSON = json_encode($arrayMedicos);
	print_r($obj_JSON);

?>