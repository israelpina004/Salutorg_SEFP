CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `superuser`;

CREATE TABLE `superuser` (
  `admin_ID` int NOT NULL AUTO_INCREMENT,
  `permissions` varchar(5000) DEFAULT NULL, /*delete?*/
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_ID`)
);
