--
-- Create database db_masrapt
--

DROP DATABASE IF EXISTS `db_HelpHouse`;
CREATE DATABASE `db_HelpHouse`;
use `db_HelpHouse`;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `username` varchar(100) NOT NULL,
  `userphone` varchar(100) NOT NULL,
  `hash_password` varchar(255) NOT NULL,
  `price` Decimal(10,5) NOT NULL,
  `longitude` Decimal(30,20) NOT NULL,
  `latitude` Decimal(30,20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
  
--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `_categoria_service`;
CREATE TABLE `_categoria_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
   PRIMARY KEY (`id`)
);

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `longitude` Decimal(30,20) NOT NULL,
  `latitude` Decimal(30,20) DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `data` DATE,
  `horas` TIME,
  `id_prestador` INT NOT NULL,
  `id_requsitador` INT NOT NULL,
  `id_categoria` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_prestador`) REFERENCES `users` (`id`),
  FOREIGN KEY (`id_categoria`) REFERENCES `_categoria_service` (`id`),
  FOREIGN KEY (`id_requsitador`) REFERENCES `users` (`id`)
);