DROP SCHEMA IF EXISTS Customer_db;
CREATE SCHEMA IF NOT EXISTS Customer_db;
CREATE TABLE IF NOT EXISTS Customer_db.Customer (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO Customer_db.Customer VALUES (1,'nara@gmail.com','nara','$2b$10$yoKRyYymJ8nuZLPAOHn3xufKpXOYk2/DH7nabTbLDn/cSlU6yJISq');