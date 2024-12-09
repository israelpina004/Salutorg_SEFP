-- Kept in case of future use.

CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `live_bidding`;

CREATE TABLE `live_bidding` (
  `session_ID` int NOT NULL AUTO_INCREMENT,
  `VIP_only` tinyint NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`session_ID`)
);
