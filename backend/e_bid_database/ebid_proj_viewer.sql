CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `viewer`;

CREATE TABLE `viewer` (
  `viewer_ID` int NOT NULL AUTO_INCREMENT,
  `view_history` varchar(45) DEFAULT NULL,
  `session_ID` int NOT NULL,
  PRIMARY KEY (`viewer_ID`)
);
