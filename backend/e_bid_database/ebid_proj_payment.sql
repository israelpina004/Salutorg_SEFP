-- Kept in case of future use.

CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `payment_ID` int NOT NULL AUTO_INCREMENT,
  `user_ID` int NOT NULL,
  `auction_ID` int NOT NULL,
  `payment_status` tinyint NOT NULL,
  `amount` varchar(45) NOT NULL,
  PRIMARY KEY (`payment_ID`),
  KEY `pay_user_ID_idx` (`user_ID`),
  KEY `pay_auction_ID_idx` (`auction_ID`),
  CONSTRAINT `pay_auction_ID` FOREIGN KEY (`auction_ID`) REFERENCES `auction` (`auction_ID`),
  CONSTRAINT `pay_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`)
);
