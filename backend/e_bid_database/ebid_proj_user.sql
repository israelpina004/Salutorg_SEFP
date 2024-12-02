CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `rating` int,
  `VIP_status` tinyint NOT NULL,
  PRIMARY KEY (`user_ID`)
);
