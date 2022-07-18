DROP DATABASE IF EXISTS Customer_db;
CREATE DATABASE IF NOT EXISTS Customer_db;
CREATE TABLE Customer_db.Customer (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO Customer_db.Customer(email,username,password) VALUES('nara@gmail.com','nara','1234');