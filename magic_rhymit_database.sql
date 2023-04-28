-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2023 a las 01:50:38
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `magic_rhymit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `palabrasmagicas`
--

CREATE TABLE `palabrasmagicas` (
  `id` int(11) NOT NULL,
  `palabramagica` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `palabrasmagicas`
--

INSERT INTO `palabrasmagicas` (`id`, `palabramagica`) VALUES
(1, 'Estrella'),
(2, 'Sopa'),
(3, 'Arbusto'),
(4, 'Espejo'),
(5, 'Humano'),
(6, 'Cálido'),
(7, 'Galleta'),
(8, 'Pimienta'),
(9, 'Dulce'),
(10, 'Miel'),
(11, 'Ostra'),
(12, 'Cápsula'),
(13, 'Lunar'),
(14, 'Tigre'),
(15, 'Vértice'),
(16, 'Sutileza'),
(17, 'Olvido'),
(18, 'Laberinto'),
(19, 'Trigo'),
(20, 'Éxtasis');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rimas`
--

CREATE TABLE `rimas` (
  `id` int(11) NOT NULL,
  `rima` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tipo` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rimas`
--

INSERT INTO `rimas` (`id`, `rima`, `tipo`, `estado`) VALUES
(16, 'Mi código es como una obra de teatro, donde cada función tiene su acto, y el resultado final es un parto.', 'ABBA', 0),
(22, 'La programación es como una ciencia, cada línea de código es una evidencia, de que con habilidad y paciencia, se pueden crear grandes cosas con excele', 'AABB', 1),
(24, 'Programar es mi pasión, mi código es como una canción, que se ejecuta con precisión.', 'ABBA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `password`) VALUES
(1, 'lola', 'cei'),
(2, 'joaquin', 'cei'),
(3, 'anita', 'cei');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `palabrasmagicas`
--
ALTER TABLE `palabrasmagicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rimas`
--
ALTER TABLE `rimas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `palabrasmagicas`
--
ALTER TABLE `palabrasmagicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `rimas`
--
ALTER TABLE `rimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
