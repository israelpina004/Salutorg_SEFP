-- Kept in case of future use.

CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `shipping`;

CREATE TABLE `shipping` (
  `shipping_ID` int NOT NULL AUTO_INCREMENT,
  `payment_ID` int NOT NULL,
  `address` varchar(45) NOT NULL,
  `shipping_date` datetime NOT NULL,
  `shipping_status` varchar(45) NOT NULL,
  `estimated_arrival` datetime NOT NULL,
  PRIMARY KEY (`shipping_ID`),
  KEY `ship_payment_ID_idx` (`payment_ID`),
  CONSTRAINT `ship_payment_ID` FOREIGN KEY (`payment_ID`) REFERENCES `payment` (`payment_ID`)
);
