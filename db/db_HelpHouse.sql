-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 10, 2022 at 03:42 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_HelpHouse`
--
CREATE DATABASE IF NOT EXISTS `db_HelpHouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_HelpHouse`;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int NOT NULL,
  `description` varchar(100) NOT NULL,
  `data` varchar(255) DEFAULT NULL,
  `horas` varchar(255) DEFAULT NULL,
  `id_prestador` int NOT NULL,
  `id_requsitador` int NOT NULL,
  `id_categoria` int NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `description`, `data`, `horas`, `id_prestador`, `id_requsitador`, `id_categoria`, `status`) VALUES
(1, 'foiewfoi wf we qwe qwe', '12-22-2022', '13:50', 2, 3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(250) NOT NULL,
  `username` varchar(100) NOT NULL,
  `userphone` varchar(100) NOT NULL,
  `hash_password` varchar(255) NOT NULL,
  `price` decimal(10,5) NOT NULL,
  `longitude` decimal(30,20) NOT NULL,
  `latitude` decimal(30,20) DEFAULT NULL,
  `user_type` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `userphone`, `hash_password`, `price`, `longitude`, `latitude`, `user_type`) VALUES
(2, 'exampple@gmail.com', 'example', '98989898', 'aaaa', '20200.00000', '0.00000000000000000000', '0.00000000000000000000', 0),
(3, 'exampple2@gmail.com', 'example2', '98989898', '1234', '20200.00000', '0.00000000000000000000', '0.00000000000000000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `_categoria_service`
--

CREATE TABLE `_categoria_service` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_service_category`
--

CREATE TABLE `user_service_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_category` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  FOREIGN KEY (`id_category`) REFERENCES `_categoria_service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- --------------------------------------------------------

--
-- Dumping data for table `_categoria_service`
--

INSERT INTO `_categoria_service` (`id`, `name`, `description`) VALUES
(1, 'Cozinha', 'accacshvdvweidhbiouweb');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prestador` (`id_prestador`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_requsitador` (`id_requsitador`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_categoria_service`
--
ALTER TABLE `_categoria_service`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `_categoria_service`
--
ALTER TABLE `_categoria_service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`id_prestador`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `_categoria_service` (`id`),
  ADD CONSTRAINT `service_ibfk_3` FOREIGN KEY (`id_requsitador`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
