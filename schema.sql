DROP DATABASE IF EXISTS customer_ordersDB;
CREATE database customer_ordersDB;

USE customer_ordrsDB;

CREATE TABLE orders (
  position INT NOT NULL,
  customer VARCHAR(100) NULL,
  items VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM orders;
