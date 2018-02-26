-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.21-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bd_clinica_magm
CREATE DATABASE IF NOT EXISTS `bd_clinica_magm` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_clinica_magm`;

-- Volcando estructura para tabla bd_clinica_magm.administrador
CREATE TABLE IF NOT EXISTS `administrador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `pass` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.administrador: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
REPLACE INTO `administrador` (`id`, `nombre`, `pass`) VALUES
	(1, 'admin', 'admin');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.citas
CREATE TABLE IF NOT EXISTS `citas` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `id_diasLaborables` int(11) DEFAULT NULL,
  `id_tramo` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cita`),
  UNIQUE KEY `id_diasLaborables_id_tramo` (`id_diasLaborables`,`id_tramo`),
  KEY `FK_citas_tramo` (`id_tramo`),
  KEY `FK_citas_usuario` (`id_usuario`),
  CONSTRAINT `FK_citas_dias_laborables` FOREIGN KEY (`id_diasLaborables`) REFERENCES `dias_laborables` (`id_diasLaborables`),
  CONSTRAINT `FK_citas_tramo` FOREIGN KEY (`id_tramo`) REFERENCES `tramo` (`id_tramo`),
  CONSTRAINT `FK_citas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.citas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
REPLACE INTO `citas` (`id_cita`, `id_diasLaborables`, `id_tramo`, `id_usuario`) VALUES
	(36, 65, 13, 1),
	(37, 67, 83, 17);
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.clinica
CREATE TABLE IF NOT EXISTS `clinica` (
  `id_clinica` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_clinica`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.clinica: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `clinica` DISABLE KEYS */;
REPLACE INTO `clinica` (`id_clinica`, `nombre`, `direccion`, `email`, `telefono`) VALUES
	(1, 'Clínica Santa Ana', 'Plaza San Jose', 'contacto@clinicasantana.com', '967472523');
/*!40000 ALTER TABLE `clinica` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.dias_laborables
CREATE TABLE IF NOT EXISTS `dias_laborables` (
  `id_diasLaborables` int(11) NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_diasLaborables`),
  UNIQUE KEY `id_medico_fecha` (`id_medico`,`fecha`),
  CONSTRAINT `FK_dias_laborables_medico` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.dias_laborables: ~33 rows (aproximadamente)
/*!40000 ALTER TABLE `dias_laborables` DISABLE KEYS */;
REPLACE INTO `dias_laborables` (`id_diasLaborables`, `id_medico`, `fecha`) VALUES
	(65, 1, '2018-03-05'),
	(66, 1, '2018-03-06'),
	(67, 1, '2018-03-08'),
	(68, 1, '2018-03-12'),
	(69, 1, '2018-03-13'),
	(70, 1, '2018-03-15'),
	(71, 2, '2018-03-05'),
	(72, 2, '2018-03-06'),
	(73, 2, '2018-03-09'),
	(74, 2, '2018-03-12'),
	(75, 2, '2018-03-13'),
	(76, 2, '2018-03-16'),
	(77, 3, '2018-03-05'),
	(78, 3, '2018-03-06'),
	(79, 3, '2018-03-07'),
	(80, 3, '2018-03-12'),
	(81, 3, '2018-03-13'),
	(82, 3, '2018-03-14'),
	(83, 4, '2018-03-06'),
	(84, 4, '2018-03-08'),
	(85, 4, '2018-03-09'),
	(86, 4, '2018-03-13'),
	(87, 4, '2018-03-15'),
	(88, 4, '2018-03-16');
/*!40000 ALTER TABLE `dias_laborables` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.especialidad
CREATE TABLE IF NOT EXISTS `especialidad` (
  `id_especialidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `url_img` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.especialidad: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
REPLACE INTO `especialidad` (`id_especialidad`, `nombre`, `url_img`) VALUES
	(1, 'Cardiología', './img/icono_cardiologia.png'),
	(2, 'Pediatría', './img/icono_pediatria.png'),
	(3, 'Neurología', './img/icono_neurologia.png');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_h_medico` int(11) DEFAULT '0',
  `id_h_turno` int(11) DEFAULT '0',
  PRIMARY KEY (`id_horario`),
  KEY `FK_horario_medico` (`id_h_medico`),
  KEY `FK_horario_turno` (`id_h_turno`),
  CONSTRAINT `FK_horario_medico` FOREIGN KEY (`id_h_medico`) REFERENCES `medico` (`id_medico`),
  CONSTRAINT `FK_horario_turno` FOREIGN KEY (`id_h_turno`) REFERENCES `turno` (`id_turno`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.horario: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
REPLACE INTO `horario` (`id_horario`, `id_h_medico`, `id_h_turno`) VALUES
	(1, 1, 1),
	(2, 4, 4),
	(3, 3, 1),
	(4, 1, 3),
	(5, 2, 2),
	(6, 3, 4),
	(7, 2, 4),
	(9, 1, 7),
	(10, 2, 8),
	(11, 3, 6),
	(12, 4, 7),
	(13, 4, 8);
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.medico
CREATE TABLE IF NOT EXISTS `medico` (
  `id_medico` int(11) NOT NULL AUTO_INCREMENT,
  `nif` varchar(9) NOT NULL DEFAULT '0',
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `apellidos` varchar(50) NOT NULL DEFAULT '0',
  `id_especialidad` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_medico`),
  UNIQUE KEY `nif` (`nif`),
  KEY `FK_medico_especialidad` (`id_especialidad`),
  CONSTRAINT `FK_medico_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.medico: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
REPLACE INTO `medico` (`id_medico`, `nif`, `nombre`, `apellidos`, `id_especialidad`) VALUES
	(1, '12345678A', 'Pepe', 'Perez', 1),
	(2, '87654321B', 'Montse', 'Garcia', 2),
	(3, '23456789C', 'Fran', 'Saez', 3),
	(4, '34567891D', 'Sara', 'Martínez', 3);
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.tramo
CREATE TABLE IF NOT EXISTS `tramo` (
  `id_tramo` int(11) NOT NULL AUTO_INCREMENT,
  `id_tramo_turno` int(11) NOT NULL DEFAULT '0',
  `tramo_inicio` time NOT NULL DEFAULT '00:00:00',
  `tramo_final` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id_tramo`),
  KEY `FK_tramo_turno` (`id_tramo_turno`),
  CONSTRAINT `FK_tramo_turno` FOREIGN KEY (`id_tramo_turno`) REFERENCES `turno` (`id_turno`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.tramo: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `tramo` DISABLE KEYS */;
REPLACE INTO `tramo` (`id_tramo`, `id_tramo_turno`, `tramo_inicio`, `tramo_final`) VALUES
	(1, 1, '10:00:00', '10:15:00'),
	(2, 1, '10:15:00', '10:30:00'),
	(3, 1, '10:30:00', '10:45:00'),
	(5, 1, '10:45:00', '11:00:00'),
	(6, 3, '09:00:00', '09:15:00'),
	(7, 3, '09:15:00', '09:30:00'),
	(8, 2, '16:00:00', '16:15:00'),
	(10, 2, '16:15:00', '16:30:00'),
	(11, 2, '16:30:00', '16:45:00'),
	(12, 2, '16:45:00', '17:00:00'),
	(13, 1, '11:00:00', '11:15:00'),
	(14, 1, '11:15:00', '11:30:00'),
	(15, 1, '11:30:00', '11:45:00'),
	(17, 1, '11:45:00', '12:00:00'),
	(18, 1, '12:00:00', '12:15:00'),
	(19, 1, '12:15:00', '12:30:00'),
	(20, 1, '12:30:00', '12:45:00'),
	(21, 1, '12:45:00', '13:00:00'),
	(22, 2, '17:00:00', '17:15:00'),
	(23, 2, '17:15:00', '17:30:00'),
	(24, 2, '17:30:00', '17:45:00'),
	(25, 2, '17:45:00', '18:00:00'),
	(26, 2, '18:00:00', '18:15:00'),
	(27, 2, '18:15:00', '18:30:00'),
	(28, 2, '18:30:00', '18:45:00'),
	(29, 2, '18:45:00', '19:00:00'),
	(31, 3, '09:30:00', '09:45:00'),
	(32, 3, '09:45:00', '10:00:00'),
	(33, 3, '10:00:00', '10:15:00'),
	(34, 3, '10:15:00', '10:30:00'),
	(35, 3, '10:30:00', '10:45:00'),
	(36, 3, '10:45:00', '11:00:00'),
	(37, 3, '11:00:00', '11:15:00'),
	(38, 3, '11:15:00', '11:30:00'),
	(39, 3, '11:30:00', '11:45:00'),
	(40, 3, '11:45:00', '12:00:00'),
	(41, 3, '12:00:00', '12:15:00'),
	(42, 3, '12:15:00', '12:30:00'),
	(44, 3, '12:30:00', '12:45:00'),
	(45, 3, '12:45:00', '13:00:00'),
	(46, 4, '15:00:00', '15:15:00'),
	(47, 4, '15:15:00', '15:30:00'),
	(48, 4, '15:30:00', '15:45:00'),
	(49, 4, '15:45:00', '16:00:00'),
	(50, 4, '16:00:00', '16:15:00'),
	(51, 4, '16:15:00', '16:30:00'),
	(52, 4, '16:30:00', '16:45:00'),
	(53, 4, '16:45:00', '17:00:00'),
	(54, 4, '17:00:00', '17:15:00'),
	(55, 4, '17:15:00', '17:30:00'),
	(56, 4, '17:30:00', '17:45:00'),
	(57, 4, '17:45:00', '18:00:00'),
	(58, 5, '10:00:00', '10:15:00'),
	(59, 5, '10:15:00', '10:30:00'),
	(60, 5, '10:30:00', '10:45:00'),
	(61, 5, '10:45:00', '11:00:00'),
	(62, 5, '11:00:00', '11:15:00'),
	(63, 5, '11:15:00', '11:30:00'),
	(64, 5, '11:30:00', '11:45:00'),
	(65, 5, '11:45:00', '12:00:00'),
	(66, 5, '12:00:00', '12:15:00'),
	(67, 5, '12:15:00', '12:30:00'),
	(68, 5, '12:30:00', '12:45:00'),
	(69, 5, '12:45:00', '13:00:00'),
	(70, 6, '16:00:00', '16:15:00'),
	(71, 6, '16:15:00', '16:30:00'),
	(72, 6, '16:30:00', '16:45:00'),
	(73, 6, '16:45:00', '17:00:00'),
	(74, 6, '17:00:00', '17:15:00'),
	(75, 6, '17:15:00', '17:30:00'),
	(76, 6, '17:30:00', '17:45:00'),
	(77, 6, '17:45:00', '18:00:00'),
	(78, 6, '18:00:00', '18:15:00'),
	(79, 6, '18:15:00', '18:30:00'),
	(80, 6, '18:30:00', '18:45:00'),
	(81, 6, '18:45:00', '19:00:00'),
	(82, 7, '11:00:00', '11:15:00'),
	(83, 7, '11:15:00', '11:30:00'),
	(84, 7, '11:30:00', '11:45:00'),
	(85, 7, '11:45:00', '12:00:00'),
	(86, 7, '12:00:00', '12:15:00'),
	(87, 7, '12:15:00', '12:30:00'),
	(88, 7, '12:30:00', '12:45:00'),
	(89, 7, '12:45:00', '13:00:00'),
	(90, 7, '13:00:00', '13:15:00'),
	(91, 7, '13:15:00', '13:30:00'),
	(92, 7, '13:30:00', '13:45:00'),
	(93, 7, '13:45:00', '14:00:00'),
	(94, 8, '11:00:00', '11:15:00'),
	(96, 8, '11:15:00', '11:30:00'),
	(97, 8, '11:30:00', '11:45:00'),
	(98, 8, '11:45:00', '12:00:00'),
	(99, 8, '12:00:00', '12:15:00'),
	(100, 8, '12:15:00', '12:30:00'),
	(101, 8, '12:30:00', '12:45:00'),
	(102, 8, '12:45:00', '13:00:00');
/*!40000 ALTER TABLE `tramo` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.turno
CREATE TABLE IF NOT EXISTS `turno` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `dia_turno` varchar(1) NOT NULL DEFAULT '0',
  `horario_inicio` time NOT NULL DEFAULT '00:00:00',
  `horario_final` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.turno: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
REPLACE INTO `turno` (`id_turno`, `dia_turno`, `horario_inicio`, `horario_final`) VALUES
	(1, '1', '10:00:00', '13:00:00'),
	(2, '1', '16:00:00', '19:00:00'),
	(3, '2', '09:00:00', '13:00:00'),
	(4, '2', '15:00:00', '18:00:00'),
	(5, '3', '10:00:00', '13:00:00'),
	(6, '3', '16:00:00', '19:00:00'),
	(7, '4', '11:00:00', '14:00:00'),
	(8, '5', '10:00:00', '13:00:00');
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;

-- Volcando estructura para tabla bd_clinica_magm.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(9) NOT NULL,
  `num_afiliacion` varchar(200) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nif` (`dni`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `num_afiliacion` (`num_afiliacion`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_clinica_magm.usuario: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
REPLACE INTO `usuario` (`id_usuario`, `dni`, `num_afiliacion`, `nombre`, `apellidos`, `email`, `direccion`) VALUES
	(1, '48259583V', '11111', 'Miguel Angel', 'Garcia ', 'miguel.angel97@live.com', 'C/ Doctor Garcia Reyes'),
	(14, 'ejemplo', '33333', 'ejemplo', 'ejemplo', 'ejemplo1@ejemplo1.com', 'ejemplo'),
	(16, 'ejemplo1', 'ejemplo1', 'ejemplo1', 'ejemplo1', 'ejemplo1', 'ejemplo1'),
	(17, '48259584H', '12345', 'Montse', 'Garcia Martinez', 'ejemplo@ejemplo.com', 'C/ ejemplo');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
