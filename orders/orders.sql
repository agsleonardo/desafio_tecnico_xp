DROP SCHEMA IF EXISTS Orders_db;
CREATE SCHEMA IF NOT EXISTS Orders_db;
CREATE TABLE  Orders_db.Orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  customerId int NOT NULL,
  stockId int NOT NULL,
  stockQty int NOT NULL,
  stockPrice decimal(19,4) NOT NULL,
  transactionType char(1) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Orders_db.Orders (customerId, stockId, stockQty, stockPrice,TransactionType) VALUES (1,1,100,100.00,'B'), (1,1,50,150.00,'S');