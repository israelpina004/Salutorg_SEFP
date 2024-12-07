CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `item_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `condition` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `starting_price` int NOT NULL,
  `listed_price` int NOT NULL,
  PRIMARY KEY (`item_ID`)
);
