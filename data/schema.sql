-- create table statements 

-- USER Table 
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- FOOD_PRODUCT Table 
CREATE TABLE IF NOT EXISTS FoodProduct (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    barcode VARCHAR(100),
    name VARCHAR(255),
    brand VARCHAR(255),
    ingredients TEXT,
    nutrition_grade VARCHAR(10),
    expiry_date VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- PANTRY Table 
CREATE TABLE IF NOT EXISTS pantry (
    pantry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_date DATE DEFAULT (CURRENT_DATE),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pantry_user FOREIGN KEY (user_id) REFERENCES USER(UserID) ON DELETE CASCADE,
    CONSTRAINT fk_pantry_product FOREIGN KEY (product_id) REFERENCES FoodProduct(product_id) ON DELETE CASCADE
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