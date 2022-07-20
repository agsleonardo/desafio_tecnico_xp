DROP SCHEMA IF EXISTS Customers_db;
CREATE SCHEMA IF NOT EXISTS Customers_db;
CREATE TABLE  Customers_db.Customers (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO Customers_db.Customers VALUES (1,'nara@gmail.com','nara','$2b$10$yoKRyYymJ8nuZLPAOHn3xufKpXOYk2/DH7nabTbLDn/cSlU6yJISq');
