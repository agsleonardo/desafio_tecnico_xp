DROP SCHEMA IF EXISTS Accounts_db;
CREATE SCHEMA IF NOT EXISTS Accounts_db;
CREATE TABLE IF NOT EXISTS Accounts_db.Accounts (
  `customerId` int NOT NULL,
  `balance` decimal(19,4) NOT NULL,
  PRIMARY KEY (`customerId`)
);
INSERT INTO Accounts_db.Accounts VALUES (1,'200.00');