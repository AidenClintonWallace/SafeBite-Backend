-- SafeBite Pantry Test Data
-- Execute this script in MySQL to populate test data

-- Insert test products
INSERT INTO product (product_name, expiry_date, category, created_at, updated_at) VALUES
('Lucky Star Pilchards in Tomato Sauce 400g', '2027-05-12', 'Canned Goods', NOW(), NOW()),
('Sasko Low GI Dumpy Brown Bread 800g', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'Bakery', NOW(), NOW()),
('Koo Peach Slices in Syrup 410g', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'Canned Goods', NOW(), NOW()),
('Purity Jar Banana & Mango Delight 125ml', '2026-05-12', 'Baby Food', NOW(), NOW()),
('Clover Full Cream Milk 1L', DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'Dairy', NOW(), NOW()),
('Woolworths Whole Wheat Bread 700g', DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Bakery', NOW(), NOW()),
('Pick n Pay Peanut Butter 500g', '2026-12-31', 'Condiments', NOW(), NOW()),
('Sunburst Tomato Sauce 500ml', '2027-03-20', 'Condiments', NOW(), NOW()),
('Eggs (Dozen)', DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'Dairy', NOW(), NOW()),
('Almonds 200g', '2026-11-15', 'Nuts', NOW(), NOW());

-- Insert test pantry entries for user 1
INSERT INTO pantry (user_id, product_id, quantity, added_date, last_updated) VALUES
(1, 1, 2, CURDATE(), NOW()),
(1, 2, 1, CURDATE(), NOW()),
(1, 3, 1, CURDATE(), NOW()),
(1, 4, 3, CURDATE(), NOW()),
(1, 5, 2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), NOW()),
(1, 6, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), NOW()),
(1, 7, 1, CURDATE(), NOW()),
(1, 8, 2, CURDATE(), NOW()),
(1, 9, 1, CURDATE(), NOW()),
(1, 10, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), NOW());
