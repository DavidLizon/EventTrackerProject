-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema purchasedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `purchasedb` ;

-- -----------------------------------------------------
-- Schema purchasedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `purchasedb` DEFAULT CHARACTER SET utf8 ;
USE `purchasedb` ;

-- -----------------------------------------------------
-- Table `store`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `store` ;

CREATE TABLE IF NOT EXISTS `store` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `number_days_can_return_purchase` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `purchase` ;

CREATE TABLE IF NOT EXISTS `purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `online` TINYINT NULL,
  `purchase_date` DATE NOT NULL,
  `arrival_date` DATE NULL,
  `return_date` DATE NULL,
  `returned` TINYINT NULL,
  `total_cost` INT NULL,
  `store_id` INT NOT NULL,
  `past_return_date` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_store_idx` (`store_id` ASC),
  CONSTRAINT `fk_purchase_store`
    FOREIGN KEY (`store_id`)
    REFERENCES `store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `item` ;

CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `cost` VARCHAR(45) NULL,
  `part_number` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

USE `purchasedb` ;

-- -----------------------------------------------------
-- Placeholder table for view `view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `view1` (`id` INT);

-- -----------------------------------------------------
-- View `view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `view1`;
DROP VIEW IF EXISTS `view1` ;
USE `purchasedb`;

SET SQL_MODE = '';
DROP USER IF EXISTS purchaseuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'purchaseuser'@'localhost' IDENTIFIED BY 'purchaseuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'purchaseuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `store`
-- -----------------------------------------------------
START TRANSACTION;
USE `purchasedb`;
INSERT INTO `store` (`id`, `name`, `number_days_can_return_purchase`) VALUES (1, 'Home Depot', 30);
INSERT INTO `store` (`id`, `name`, `number_days_can_return_purchase`) VALUES (2, 'Lowes', 30);
INSERT INTO `store` (`id`, `name`, `number_days_can_return_purchase`) VALUES (3, 'Ace Hardware', 60);
INSERT INTO `store` (`id`, `name`, `number_days_can_return_purchase`) VALUES (4, 'Floor & Decor', 90);
INSERT INTO `store` (`id`, `name`, `number_days_can_return_purchase`) VALUES (5, 'Walmart', 90);
INSERT INTO `store` (`id`, `name`, `number_days_can_return_purchase`) VALUES (6, 'Target', 60);

COMMIT;


-- -----------------------------------------------------
-- Data for table `purchase`
-- -----------------------------------------------------
START TRANSACTION;
USE `purchasedb`;
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (1, 'bathroom', 0, '2022-01-07', NULL, '2022-03-07', 0, NULL, 1, 0);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (2, 'shed wood', 1, '2022-01-02', '2022-03-05', '2022-05-05', 0, NULL, 3, 0);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (3, 'kitchen', 1, '2021-12-26', '2022-01-15', '2022-03-05', 0, NULL, 4, 0);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (4, 'living room', 0, '2021-12-15', NULL, '2022-02-15', 0, NULL, 2, 0);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (5, 'bathroom tub', 1, '2021-10-19', '2021-11-02', '2022-01-02', 1, NULL, 2, 1);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (6, 'kitchen flooring', 0, '2021-09-15', NULL, '2021-11-15', 1, NULL, 3, 1);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (7, 'paint - porch', 0, '2021-11-01', NULL, '2022-01-01', 1, NULL, 1, 1);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (8, 'paint', 0, '2022-01-04', NULL, '2022-03-04', 0, NULL, 1, 0);
INSERT INTO `purchase` (`id`, `name`, `online`, `purchase_date`, `arrival_date`, `return_date`, `returned`, `total_cost`, `store_id`, `past_return_date`) VALUES (9, 'kitchen sink', 1, '2021-10-11', '2022-12-02', '2021-12-11', 0, NULL, 3, 1);

COMMIT;

