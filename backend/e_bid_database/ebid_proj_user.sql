CREATE DATABASE  IF NOT EXISTS `ebid_proj` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ebid_proj`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `rating` float DEFAULT 0.0,
  `VIP_status` BOOLEAN DEFAULT 0,
  `is_approved` BOOLEAN DEFAULT 0,
  PRIMARY KEY (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ALTER TABLE user MODIFY password VARCHAR(255);
-- ALTER TABLE `user`
-- ADD CONSTRAINT UNIQUE (`username`);

-- ALTER TABLE `user` ADD `is_suspended` BOOLEAN DEFAULT 0;
-- ALTER TABLE `user` ADD `count_suspended` INT DEFAULT 0;

-- SELECT * FROM user;
-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM user;

-- DELIMITER //

-- CREATE PROCEDURE suspend_user(IN p_user_ID INT)
-- BEGIN
--   DECLARE current_suspended INT;
  
--   -- Check the current suspension count for the user
--   SELECT count_suspended INTO current_suspended
--   FROM `user`
--   WHERE user_ID = p_user_ID;

--   -- If is_suspended is FALSE, update it to TRUE and increment count_suspended
--   UPDATE `user`
--   SET is_suspended = TRUE, 
--       count_suspended = count_suspended + 1
--   WHERE user_ID = p_user_ID;
  
--   -- Check if the count_suspended is 3 or more after the update
--   IF current_suspended + 1 >= 3 THEN
--     -- Delete the user if count_suspended reaches 3
--     DELETE FROM `user`
--     WHERE user_ID = p_user_ID;
--   END IF;
-- END //

-- DELIMITER ;

-- Testing procedure
-- -- First suspension
-- CALL suspend_user(35);

-- -- Second suspension
-- CALL suspend_user(35);

-- -- Third suspension (user should be deleted after this)
-- CALL suspend_user(35);

UPDATE `user` SET `is_approved` = 1 WHERE `username` = 'lol';

-- Dump completed on 2024-11-15 15:53:07
