CREATE DATABASE IF NOT EXISTS `ebid_proj`;
USE `ebid_proj`;
-- Code for "viewer" table.
DROP TABLE IF EXISTS `viewer`;
CREATE TABLE `viewer` (
  `viewer_ID` int NOT NULL AUTO_INCREMENT,
  `view_history` varchar(45) DEFAULT NULL,
  `session_ID` int NOT NULL,
  PRIMARY KEY (`viewer_ID`)
);
-- Code for "user" table.
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  -- Password field is now VARCHAR(255)
  `rating` float DEFAULT 0.0,
  `VIP_status` BOOLEAN DEFAULT 0,
  `is_approved` BOOLEAN DEFAULT 0,
  `is_suspended` BOOLEAN DEFAULT 0,
  -- Added is_suspended field
  `count_suspended` INT DEFAULT 0,
  -- Added count_suspended field
  `balance` DECIMAL(10, 2) DEFAULT 0.00,
  PRIMARY KEY (`user_ID`),
  UNIQUE (`username`) -- Added UNIQUE constraint on username
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
ALTER TABLE user
ADD COLUMN is_loggedin BOOLEAN DEFAULT FALSE;
ALTER TABLE user
ADD COLUMN registration_date DATETIME DEFAULT current_timestamp;
-- Code for "superuser" table. Holds superuser information.
DROP TABLE IF EXISTS `superuser`;
CREATE TABLE `superuser` (
  `admin_ID` int NOT NULL AUTO_INCREMENT,
  `permissions` varchar(5000) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activity_log` datetime NOT NULL,
  `last_active` datetime NOT NULL,
  PRIMARY KEY (`admin_ID`)
);
-- Code for "item" table. Contains information for each item listed on the website.
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `item_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `item_condition` VARCHAR(255) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `image` LONGBLOB,
  PRIMARY KEY (`item_ID`)
);
-- Code for "rent" table. Holds information about items posted for rent.
DROP TABLE IF EXISTS `rent`;
CREATE TABLE `rent` (
  `rent_ID` INT NOT NULL AUTO_INCREMENT,
  `item_ID` INT NOT NULL,
  `rental_rate` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`rent_ID`),
  FOREIGN KEY (`item_ID`) REFERENCES `item`(`item_ID`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
ALTER TABLE `rent`
ADD COLUMN `renter_ID` INT NOT NULL,
  ADD CONSTRAINT `fk_renter` FOREIGN KEY (`renter_ID`) REFERENCES `user`(`user_ID`) ON DELETE CASCADE;
-- Code for "sell" table. Holds information about items posted for sale.
DROP TABLE IF EXISTS `sell`;
CREATE TABLE `sell` (
    `sell_ID` int NOT NULL AUTO_INCREMENT,
    `item_ID` int NOT NULL,
    `starting_price` decimal(10, 2) NOT NULL,
    `deadline` date NOT NULL,
    `seller_ID` int NOT NULL,
    `current_bid` decimal(10, 2) DEFAULT '0.00',
    `status` enum('active', 'sold') DEFAULT 'active',
    PRIMARY KEY (`sell_ID`),
    KEY `item_ID` (`item_ID`),
    KEY `fk_seller` (`seller_ID`),
    CONSTRAINT `fk_seller` FOREIGN KEY (`seller_ID`) REFERENCES `user` (`user_ID`) ON DELETE CASCADE,
    CONSTRAINT `sell_ibfk_1` FOREIGN KEY (`item_ID`) REFERENCES `item` (`item_ID`) ON DELETE CASCADE
);
-- Code for "transactions" table. Records who bought what.
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `transaction_ID` INT NOT NULL AUTO_INCREMENT,
  `customer_ID` INT NOT NULL,
  `vendor_ID` INT NOT NULL,
  `item_ID` INT NOT NULL,
  PRIMARY KEY (`transaction_ID`),
  FOREIGN KEY (`customer_ID`) REFERENCES `user`(`user_ID`) ON DELETE CASCADE,
  FOREIGN KEY (`vendor_ID`) REFERENCES `user`(`user_ID`) ON DELETE CASCADE
);

-- Code for "bid" table. Stores bids.
DROP TABLE IF EXISTS `bid`;
CREATE TABLE `bid` (
  `bid_ID` int NOT NULL AUTO_INCREMENT,
  `user_ID` int NOT NULL,
  `sell_ID` int NOT NULL,
  -- Changed from auction_ID to sell_ID
  `bid_amount` DECIMAL(10, 2) NOT NULL,
  -- Bids should be in decimal format to accommodate cents
  `bid_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Track when the bid was placed
  PRIMARY KEY (`bid_ID`),
  FOREIGN KEY (`user_ID`) REFERENCES `user`(`user_ID`) ON DELETE CASCADE,
  FOREIGN KEY (`sell_ID`) REFERENCES `sell`(`sell_ID`) ON DELETE CASCADE
);

-- Code for "comments" table. Stores comments from each item's comment's section.
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NULL, -- Null if the user is a visitor
  username VARCHAR(255) NOT NULL, -- Stores 'Visitor' for unsigned users
  comment TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Procedures --
-- Makes a user a VIP if the necessary conditions are true.
DROP PROCEDURE IF EXISTS set_vip_status;
DELIMITER // CREATE PROCEDURE set_vip_status(IN p_user_ID INT) BEGIN
DECLARE current_balance DECIMAL(10, 2);
DECLARE sold_items INT;
DECLARE bought_items INT;
DECLARE current_suspended INT;
DECLARE total_transactions INT;
-- Step 1: Get the current balance of the user
SELECT balance INTO current_balance
FROM `user`
WHERE user_ID = p_user_ID;
-- Step 2: Get the count of items sold by the user
SELECT COUNT(*) INTO sold_items
FROM `sell`
WHERE seller_ID = p_user_ID;
-- Step 3: Get the count of items bought by the user
SELECT COUNT(*) INTO bought_items
FROM `transactions`
WHERE customer_ID = p_user_ID;
-- Step 4: Get the count_suspended for the user
SELECT count_suspended INTO current_suspended
FROM `user`
WHERE user_ID = p_user_ID;
-- Step 5: Check if the user meets the criteria
IF current_balance > 5000
AND (sold_items + bought_items) > 5
AND current_suspended = 0 THEN -- Step 6: Set the user's VIP status to TRUE
UPDATE `user`
SET VIP_status = TRUE
WHERE user_ID = p_user_ID;
END IF;
END // DELIMITER;
-- Handles suspension of users.
DELIMITER // 
CREATE PROCEDURE suspend_user_if_criteria_met(IN p_user_ID INT) BEGIN
DECLARE item_count INT DEFAULT 0;
DECLARE user_rating FLOAT;
DECLARE suspension_count INT;
-- Count the total number of items sold or rented by the user that were bought/rented (exist in transactions)
SELECT COUNT(DISTINCT s.item_ID) + COUNT(DISTINCT r.item_ID) INTO item_count
FROM sell s
  LEFT JOIN transactions t1 ON s.item_ID = t1.transaction_ID
  LEFT JOIN rent r ON r.item_ID = t1.transaction_ID
WHERE (
    s.seller_ID = p_user_ID
    OR r.renter_ID = p_user_ID
  )
  AND t1.transaction_ID IS NOT NULL;
-- Only count if the item is bought/rented
-- Get the user's rating
SELECT rating INTO user_rating
FROM `user`
WHERE user_ID = p_user_ID;
-- Check if the user meets the suspension criteria
IF item_count >= 3
AND (
  user_rating < 2.0
  OR user_rating > 4.0
) THEN -- Update the user: set is_suspended to TRUE and increment count_suspended
UPDATE `user`
SET is_suspended = TRUE,
  count_suspended = count_suspended + 1
WHERE user_ID = p_user_ID;
-- Get the updated suspension count for the user
SELECT count_suspended INTO suspension_count
FROM `user`
WHERE user_ID = p_user_ID;
-- If the suspension count is 3 or more, delete the user from the user table
IF suspension_count >= 3 THEN
DELETE FROM `user`
WHERE user_ID = p_user_ID;
END IF;
END IF;
END //
-- Code for "bid" table. Stores top bids on a certain item. ( NEEDS CHANGES )
-- DROP TABLE IF EXISTS `bid`;
-- CREATE TABLE `bid` (
--   `bid_ID` int NOT NULL AUTO_INCREMENT,
--   `user_ID` int NOT NULL,
--   `auction_ID` int NOT NULL,
--   `bid_amount` int NOT NULL,
--   PRIMARY KEY (`bid_ID`),
--   KEY `user_ID_idx` (`user_ID`),
--   KEY `auction_ID_idx` (`auction_ID`),
--   CONSTRAINT `bid_auction_ID` FOREIGN KEY (`auction_ID`) REFERENCES `auction` (`auction_ID`),
--   CONSTRAINT `bid_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`)
-- );
-- Code for "auction" table. (May not be useful.)
-- DROP TABLE IF EXISTS `auction`;
-- CREATE TABLE `auction` (
--   `auction_ID` int NOT NULL AUTO_INCREMENT,
--   `item_ID` int NOT NULL,
--   `category` varchar(45) NOT NULL,
--   `start_day` datetime NOT NULL,
--   `end_day` datetime NOT NULL,
--   `reserve_price` int NOT NULL,
--   `status` varchar(45) NOT NULL,
--   PRIMARY KEY (`auction_ID`),
--   KEY `item_ID_idx` (`item_ID`),
--   CONSTRAINT `auction_item_ID` FOREIGN KEY (`item_ID`) REFERENCES `item` (`item_ID`)
-- );
-- Code for "shipping" table. (May not be useful.)
-- DROP TABLE IF EXISTS `shipping`;
-- CREATE TABLE `shipping` (
--   `shipping_ID` int NOT NULL AUTO_INCREMENT,
--   `payment_ID` int NOT NULL,
--   `address` varchar(45) NOT NULL,
--   `shipping_date` datetime NOT NULL,
--   `shipping_status` varchar(45) NOT NULL,
--   `estimated_arrival` datetime NOT NULL,
--   PRIMARY KEY (`shipping_ID`),
--   KEY `ship_payment_ID_idx` (`payment_ID`),
--   CONSTRAINT `ship_payment_ID` FOREIGN KEY (`payment_ID`) REFERENCES `payment` (`payment_ID`)
-- );
-- Code for "payment" table. (May not be useful.)
-- DROP TABLE IF EXISTS `payment`;
-- CREATE TABLE `payment` (
--   `payment_ID` int NOT NULL AUTO_INCREMENT,
--   `user_ID` int NOT NULL,
--   `auction_ID` int NOT NULL,
--   `payment_status` tinyint NOT NULL,
--   `amount` varchar(45) NOT NULL,
--   PRIMARY KEY (`payment_ID`),
--   KEY `pay_user_ID_idx` (`user_ID`),
--   KEY `pay_auction_ID_idx` (`auction_ID`),
--   CONSTRAINT `pay_auction_ID` FOREIGN KEY (`auction_ID`) REFERENCES `auction` (`auction_ID`),
--   CONSTRAINT `pay_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`)
-- );
-- SELECT * FROM `user`;
-- SELECT * FROM `item`;
-- SELECT * from `sell`;
-- SELECT * FROM `bid`;
-- INSERT INTO transactions (vendor_ID, customer_ID, item_ID)
-- VALUES (1, 1, 1);
-- SELECT * FROM transactions;
-- DELETE FROM transactions;
-- SET SQL_SAFE_UPDATES = 0;
-- DROP DATABASE `ebid_proj`;




