CREATE DATABASE  IF NOT EXISTS `ebid_proj` ;
USE `ebid_proj`;

--
-- Table structure for table `rent_item`
--

DROP TABLE IF EXISTS `rent_item`;

CREATE TABLE `rent_item` (
  `item_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `condition` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `rental_rate` int NOT NULL,
  `image` LONGBLOB NOT NULL,
  PRIMARY KEY (`item_ID`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;