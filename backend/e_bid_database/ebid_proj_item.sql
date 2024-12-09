CREATE DATABASE IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;
-- Doing it this way so we dont duplicate data and also I don't want M:N
CREATE TABLE `item` (
  `item_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `condition` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `image` LONGBLOB,
  PRIMARY KEY (`item_ID`)
)