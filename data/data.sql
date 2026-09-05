-- insert SQL statements

-- testing user info
INSERT INTO USER (UserID, Username, Email) 
VALUES (1, 'TestUser', 'test@safebite.com') 
ON DUPLICATE KEY UPDATE UserID=UserID;

-- testing product item
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
    '2026-04-30'
);

-- testing pantry items
INSERT INTO FoodProduct (name, expiry_date) VALUES
('Lucky Star Pilchards in Tomato Sauce 400g', '2027-05-12'),
('Sasko Low GI Dumpy Brown Bread 800g', DATE_ADD(CURDATE(), INTERVAL 3 DAY)),
('Koo Peach Slices in Syrup 410g', DATE_SUB(CURDATE(), INTERVAL 2 DAY)),
('Purity Jar Banana & Mango Delight 125ml', '2026-05-12'),
('Clover Full Cream Milk 1L', DATE_ADD(CURDATE(), INTERVAL 1 DAY)),
('Woolworths Whole Wheat Bread 700g', DATE_ADD(CURDATE(), INTERVAL 2 DAY)),
('Pick n Pay Peanut Butter 500g', '2026-12-31'),
('Sunburst Tomato Sauce 500ml', '2027-03-20'),
('Eggs (Dozen)', DATE_ADD(CURDATE(), INTERVAL 10 DAY)),
('Almonds 200g', '2026-11-15');

-- testing pantry entries for user 1
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
