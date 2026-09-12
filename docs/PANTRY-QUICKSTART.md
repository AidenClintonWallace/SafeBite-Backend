# SafeBite Pantry - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Start Backend
```bash
cd SafeBite-Backend
.\mvnw spring-boot:run
# Backend runs on http://localhost:8080
```

### 2. Load Test Data
```bash
mysql -u root -p
USE safebite_db;
source test-data.sql;
```

### 3. Start Frontend
```bash
cd frontend
npx expo start
# Scan QR code with phone or press 'i' for iOS / 'a' for Android
```

---

## 🧪 Quick Tests

### Test Backend Works
```bash
# Should return array of pantry items
curl http://localhost:8080/api/pantry/user/1

# Should return only SAFE items
curl http://localhost:8080/api/pantry/user/1/status/SAFE

# Should return sorted by earliest expiry
curl "http://localhost:8080/api/pantry/user/1/sorted?sortBy=earliest_expiry"
```

### Test Frontend
1. Open Pantry screen
2. Should see 10 test products
3. Try each filter (All, Safe, Soon, Exp)
4. Try each sort option
5. Tap "Add Product" and add a new item
6. Tap delete icon and confirm deletion

---

## 🎨 UI Features

| Feature | How To | Expected Result |
|---------|--------|-----------------|
| Filter | Tap All/Safe/Soon/Exp buttons | List updates instantly |
| Sort | Tap "Sort" button | Modal opens with 4 options |
| Add | Tap "+ Add Product" button | Modal opens for input |
| Delete | Tap trash icon on card | Confirmation dialog shown |
| Refresh | Pull down on list | Data reloads |

---

## 🐛 Troubleshooting Quick Fixes

### Backend won't start
```
1. Check MySQL running: mysql -u root -p
2. Check port 8080 free: netstat -ano | findstr :8080
3. Check database exists: SHOW DATABASES;
```

### Frontend can't connect
```
1. Verify backend running: curl http://localhost:8080
2. Check API_BASE_URL in PantryScreen.jsx
3. On real device: use IP instead of localhost
```

### No data shows
```
1. Check test data: SELECT COUNT(*) FROM product;
2. Verify user ID 1 exists in pantry table
3. Check expiry dates are in YYYY-MM-DD format
```

---

## 📱 UI Color Legend

- 🟢 **GREEN** (Safe) = 7+ days until expiry
- 🟡 **ORANGE** (Soon) = 0-6 days until expiry
- 🔴 **RED** (Expired) = Past expiry date

---

## 📋 Implemented Components

### Backend
- [x] Product entity & repository
- [x] Pantry filtering by status (SAFE/SOON/EXPIRED)
- [x] Pantry sorting (4 options)
- [x] Expiry calculation logic
- [x] REST API with 11 endpoints

### Frontend
- [x] PantryScreen main component (1100+ lines)
- [x] Filter functionality
- [x] Sort functionality
- [x] Add product modal
- [x] Delete confirmation
- [x] Pull-to-refresh
- [x] Loading/Empty/Error states
- [x] API integration

---

## 🔑 Key Technologies

**Backend**: Spring Boot 3.3.5, Java 21, Hibernate ORM, MySQL
**Frontend**: React Native, Expo, JavaScript (ES6+)
**Database**: MySQL with Hibernate auto-schema generation

---

## 💡 How It Works

1. **User opens Pantry screen**
   - Frontend loads data from backend
   - Displays all pantry items with status

2. **User applies filter**
   - Frontend sends GET /api/pantry/user/1/status/SAFE
   - Backend queries DB and calculates status
   - Only matching items displayed

3. **User adds product**
   - Frontend POST to /api/product/add (creates product)
   - Frontend POST to /api/pantry/add (adds to pantry)
   - Backend saves to database
   - Frontend refreshes list

4. **Expiry status calculated**
   - Backend gets product's expiryDate
   - Calculates days until: expiryDate - today
   - Returns status: SAFE/SOON/EXPIRED
   - Frontend displays with color badge

---

## 📁 Important Files

```
Backend:
├── Product.java              (NEW - product entity)
├── ProductRepository.java    (NEW - data access)
├── ProductService.java       (NEW - business logic)
├── ProductController.java    (NEW - API endpoints)
├── PantryService.java        (MODIFIED - added filtering/sorting)
├── PantryController.java     (MODIFIED - added endpoints)
└── PantryResponse.java       (MODIFIED - added fields)

Frontend:
├── PantryScreen.jsx          (NEW - main screen)
└── pantryApi.js              (NEW - API utilities)

Config:
├── test-data.sql             (NEW - test products)
└── PANTRY-IMPLEMENTATION.md  (NEW - full guide)
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend compiles and runs
- [ ] Frontend connects to backend
- [ ] Test data loads (10 products visible)
- [ ] All filter works (shows all items)
- [ ] Safe filter works (shows only green items)
- [ ] Soon filter works (shows yellow items)
- [ ] Expired filter works (shows red items)
- [ ] Sorting options work
- [ ] Add product works and saves
- [ ] Delete product works with confirmation
- [ ] Pull-to-refresh updates data
- [ ] Empty state shows when no items
- [ ] Error state handles disconnection

---

## 🎯 Success Indicators

✅ Pantry screen displays without crashes
✅ Data loads from backend API
✅ Filters work correctly
✅ Sorting works correctly
✅ Add/Delete operations persist
✅ UI updates immediately
✅ Error handling graceful

---

**Everything is ready to use! Start the backend and frontend, and enjoy your fully functional Pantry system! 🚀**
