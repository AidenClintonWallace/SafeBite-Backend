-- SafeBite - Login / Sign Up Subsystem - 222567023

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert statements for when user clicks Sign Up
INSERT INTO users (full_name, email, phone_number, password_hash) VALUES
('Ricardo Manuel', 'ricardo@safebite.com', '0730122510', '$2b$10$hashed_password_for_ricardo'),
('Test User', 'test@safebite.com', '0812345678', '$2b$10$hashed_password_for_test'),
('Jane Doe', 'jane@safebite.com', '0823456789', '$2b$10$hashed_password_for_jane');
