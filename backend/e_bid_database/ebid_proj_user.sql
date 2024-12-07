CREATE DATABASE  IF NOT EXISTS `ebid_proj` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ebid_proj`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: ebid_proj
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `rating` float DEFAULT 0.0,
  -- `registration_date` date NOT NULL,
  -- `contact_info` int NOT NULL,
  `VIP_status` BOOLEAN DEFAULT 0,
  `is_approved` BOOLEAN DEFAULT 0,
  PRIMARY KEY (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- ALTER TABLE user MODIFY password VARCHAR(255);
-- ALTER TABLE `user`
-- ADD CONSTRAINT UNIQUE (`username`);

-- ALTER TABLE `user` ADD `is_suspended` BOOLEAN DEFAULT 0;
-- ALTER TABLE `user` ADD `count_suspended` INT DEFAULT 0;

SELECT * FROM user;
-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM user;

DELIMITER //

CREATE PROCEDURE suspend_user(IN p_user_ID INT)
BEGIN
  DECLARE current_suspended INT;
  
  -- Check the current suspension count for the user
  SELECT count_suspended INTO current_suspended
  FROM `user`
  WHERE user_ID = p_user_ID;

  -- If is_suspended is FALSE, update it to TRUE and increment count_suspended
  UPDATE `user`
  SET is_suspended = TRUE, 
      count_suspended = count_suspended + 1
  WHERE user_ID = p_user_ID;
  
  -- Check if the count_suspended is 3 or more after the update
  IF current_suspended + 1 >= 3 THEN
    -- Delete the user if count_suspended reaches 3
    DELETE FROM `user`
    WHERE user_ID = p_user_ID;
  END IF;
END //

DELIMITER ;

-- First suspension
CALL suspend_user(35);

-- Second suspension
CALL suspend_user(35);

-- Third suspension (user should be deleted after this)
CALL suspend_user(35);

SELECT * FROM `user` WHERE user_ID = 1;

-- Dump completed on 2024-11-15 15:53:07
