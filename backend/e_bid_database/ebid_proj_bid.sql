CREATE DATABASE  IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;

DROP TABLE IF EXISTS `bid`;

CREATE TABLE `bid` (
  `bid_ID` int NOT NULL AUTO_INCREMENT,
  `user_ID` int NOT NULL,
  `auction_ID` int NOT NULL,
  `bid_amount` int NOT NULL,
  PRIMARY KEY (`bid_ID`),
  KEY `user_ID_idx` (`user_ID`),
  KEY `auction_ID_idx` (`auction_ID`),
  CONSTRAINT `bid_auction_ID` FOREIGN KEY (`auction_ID`) REFERENCES `auction` (`auction_ID`),
  CONSTRAINT `bid_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`)
);
