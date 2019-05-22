ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'eroluse3';
CREATE DATABASE `wardrobe` DEFAULT CHARACTER SET utf8mb4;
CREATE TABLE `wardrobe`.`clothes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(100) NOT NULL DEFAULT 'Noname',
  `color` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `price` FLOAT NULL DEFAULT 0.0,
  `date` DATETIME NOT NULL,
  `season` ENUM("Зима", "Весна", "Лето", "Осень") NOT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
  
INSERT INTO clothes (type, brand, color, description, price, date, season)
VALUES ("type", "brand", "color", "{description: }>", 0, "2019-01-12", "winter");
SELECT * FROM clothes;
