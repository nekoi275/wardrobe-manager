CREATE DATABASE `wardrobe` DEFAULT CHARACTER SET utf8mb4;
CREATE TABLE `wardrobe`.`clothes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(100) NOT NULL DEFAULT 'Noname',
  `color` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `price` FLOAT NULL,
  `date` DATETIME NOT NULL,
  `season` ENUM("winter", "spring", "summer", "autumn") NOT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
