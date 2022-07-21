DROP SCHEMA IF EXISTS Wallets_db;
CREATE SCHEMA IF NOT EXISTS Wallets_db;
CREATE TABLE  Wallets_db.Wallets (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  customerId int NOT NULL,
  stockId int NOT NULL,
  stockQty int NOT NULL,
  averagePrice decimal(19,4) NOT NULL
);
INSERT INTO Wallets_db.Wallets (customerId, stockId, stockQty, averagePrice) VALUES (1,85,100,100.00), (1,65,100,100.00);