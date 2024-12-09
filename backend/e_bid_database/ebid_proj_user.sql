CREATE DATABASE IF NOT EXISTS `ebid_proj` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ebid_proj`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL, -- Password field is now VARCHAR(255)
  `rating` float DEFAULT 0.0,
  `VIP_status` BOOLEAN DEFAULT 0,
  `is_approved` BOOLEAN DEFAULT 0,
  `is_suspended` BOOLEAN DEFAULT 0, -- Added is_suspended field
  `count_suspended` INT DEFAULT 0,  -- Added count_suspended field
  PRIMARY KEY (`user_ID`),
  UNIQUE (`username`) -- Added UNIQUE constraint on username
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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


-- Dump completed on 2024-11-15 15:53:07
