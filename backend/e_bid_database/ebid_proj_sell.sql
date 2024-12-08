CREATE DATABASE IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;
-- Doing it this way so we dont duplicate data and also I don't want M:N
CREATE TABLE `sell` (
    `sell_ID` INT NOT NULL AUTO_INCREMENT,
    `item_ID` INT NOT NULL,
    `starting_price` DECIMAL(10, 2) NOT NULL,
    `deadline` DATE NOT NULL,
    PRIMARY KEY (`sell_ID`),
    FOREIGN KEY (`item_ID`) REFERENCES `item`(`item_ID`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;