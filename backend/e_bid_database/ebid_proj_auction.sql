CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `auction`;

CREATE TABLE `auction` (
  `auction_ID` int NOT NULL AUTO_INCREMENT,
  `item_ID` int NOT NULL,
  `category` varchar(45) NOT NULL,
  `start_day` datetime NOT NULL,
  `end_day` datetime NOT NULL,
  `reserve_price` int NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`auction_ID`),
  KEY `item_ID_idx` (`item_ID`),
  CONSTRAINT `auction_item_ID` FOREIGN KEY (`item_ID`) REFERENCES `item` (`item_ID`)
);
