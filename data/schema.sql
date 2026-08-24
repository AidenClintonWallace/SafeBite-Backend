-- FOOD_PRODUCT / SCANNER Table (Placed first so FK references work)
CREATE TABLE IF NOT EXISTS FoodProduct (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    barcode VARCHAR(100),
    name VARCHAR(255),
    brand VARCHAR(255),
    ingredients TEXT,
    nutrition_grade VARCHAR(10),
    expiry_date VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- NOTIFICATION Table
CREATE TABLE IF NOT EXISTS NOTIFICATION (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NULL,
    Message VARCHAR(255) NOT NULL,
    SubMessage VARCHAR(255) NULL,
    BadgeStatus VARCHAR(50) NOT NULL,
    Category VARCHAR(50) NOT NULL,
    IsRead TINYINT(1) DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notification_user 
        FOREIGN KEY (UserID) 
        REFERENCES USER(UserID) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_notification_product 
        FOREIGN KEY (ProductID) 
        REFERENCES FoodProduct(product_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- REPORT Table
CREATE TABLE IF NOT EXISTS REPORT (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NULL,
    ProductInput VARCHAR(255) NULL,
    ReasonForReport VARCHAR(255) NOT NULL,
    IssueDescription TEXT NULL,
    ReportStatus VARCHAR(50) DEFAULT 'Pending',
    ReportDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_report_user 
        FOREIGN KEY (UserID) 
        REFERENCES USER(UserID) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_report_product 
        FOREIGN KEY (ProductID) 
        REFERENCES FoodProduct(product_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data
INSERT INTO FoodProduct (
    barcode,
    name,
    brand,
    ingredients,
    nutrition_grade,
    expiry_date
)
VALUES (
    '123456789',
    'Sasko Low GI Dumpy Seeded Brown Bread 800g',
    'Sasko Bakery',
    'Wheat Flour, Water, Wheat Bran, Linseed, Oats, Sunflower Seeds, Vitamins and Minerals',
    'A',
    '2026-04-31'
);