DROP DATABASE IF EXISTS Bamazon_db;

CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	StockQuantity INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Playstation 4', 'Gaming Console', 99, 12);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Fifa 18', 'Electronics', 129.95, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Playstation 4 Controller', 'Electronics', 119.95, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('UnderArmor Hoodie', 'Apparel', 119.95, 33);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Hurley Tee', 'Apparel', 70, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('HUrley Hat', 'Apparel', 45, 12);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Hurley Women\'s Tank', 'Apparel', 75, 40);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Nike Women\'s Running Tank', 'Apparel', 50, 3);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Sterling Silver Necklace', 'Accessories', 55, 4);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Earrings', 'Accessories', 25, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Apple Watch', 'Electronics', 299.99, 2);

CREATE TABLE departments (
	DepartmentId INT NOT NULL AUTO_INCREMENT,
	DepartmentName VARCHAR(100) NOT NULL,
	OverheadCost DECIMAL(10,2) NOT NULL,
	TotalSales DECIMAL(10,2),
	PRIMARY KEY(DepartmentId)
);

INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Running Shoes', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Apparel', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Electronics', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Accessories', 500);