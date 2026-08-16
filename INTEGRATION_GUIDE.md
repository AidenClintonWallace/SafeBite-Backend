# SafeBite - Complete Implementation Guide

This document outlines the complete SafeBite system: Backend (Java Spring Boot) and Frontend (React Native/Expo).

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    SafeBite Mobile App                   │
│              (React Native/Expo - Frontend)              │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Home Screen    │  Pantry Screen   │  Notifications  │ │
│  │  - Stats        │  - Filter Tabs   │  - Grouped List │ │
│  │  - Scan Button  │  - Add Form      │  - Resolve Btn  │ │
│  │  - Recent Items │  - Remove Items  │  - Status Ind.  │ │
│  └─────────────────────────────────────────────────────┘ │
│                           │                              │
│        ┌──────────────────┴──────────────────┐          │
│        │                                    │           │
│   PantryAPI                        NotificationAPI      │
│   (Axios HTTP Client)              (Axios HTTP Client)  │
│        │                                    │           │
└────────┼────────────────────────────────────┼───────────┘
         │ HTTP REST                          │ HTTP REST
         │                                    │
         ▼                                    ▼
┌─────────────────────────────────────────────────────────┐
│               SafeBite Backend API                       │
│          (Spring Boot 3.3.0 - Java 21)                  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  /api/pantry              /api/notifications        │ │
│  │  - POST /add              - POST /create            │ │
│  │  - GET /user/{userId}     - GET /user/{userId}      │ │
│  │  - PUT /{id}/quantity/{q} - DELETE /{id}            │ │
│  │  - DELETE /{id}                                      │ │
│  └─────────────────────────────────────────────────────┘ │
│                           │                              │
│        ┌──────────────────┴──────────────────┐          │
│        │                                    │           │
│   PantryService                 NotificationService     │
│   (Business Logic)              (Business Logic)        │
│        │                                    │           │
│   PantryRepository                 NotificationRepository
│   (Data Access)                    (Data Access)        │
│        │                                    │           │
└────────┼────────────────────────────────────┼───────────┘
         │ JDBC/Hibernate ORM                 │ JDBC/Hibernate ORM
         │                                    │
         ▼                                    ▼
         ┌──────────────────────────────────┐
         │     MySQL Database               │
         │    (safebite_db)                │
         │  ┌────────────────────────────┐ │
         │  │ Tables:                    │ │
         │  │ - pantry                   │ │
         │  │ - notification             │ │
         │  │ - user (if added)          │ │
         │  │ - product (if added)       │ │
         │  └────────────────────────────┘ │
         └──────────────────────────────────┘
```

## 🎯 Implementation Status

### Backend ✅
- [x] Spring Boot 3.3.0 configured (Java 21)
- [x] MySQL database connection (localhost:3306/safebite_db)
- [x] Pantry entity, repository, service, controller
- [x] Notification entity, repository, service, controller
- [x] Basic CRUD operations for both subsystems
- [x] Error handling (basic)
- [x] Project compiles and runs successfully
- [x] Unit test framework configured
- [ ] Comprehensive unit tests for Pantry/Notification
- [ ] Advanced validation and error responses
- [ ] Database schema constraints and FKs

### Frontend ✅
- [x] React Native/Expo setup
- [x] Bottom tab navigation (Home, Pantry, Notifications)
- [x] Home screen with stats and scan button
- [x] Pantry screen with filter tabs and add form
- [x] Notifications screen with grouping
- [x] API service layer (axios)
- [x] Mock data fallback for demo
- [x] SafeBite green color scheme (#1B5E35)
- [x] Nunito font styling
- [x] Status badges and color coding
- [ ] Barcode scanner integration
- [ ] User authentication/login
- [ ] Offline storage with local DB

## 📋 Database Schema

### pantry Table
```sql
CREATE TABLE pantry (
  pantry_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  added_date DATE NOT NULL,
  last_updated DATETIME NOT NULL
);
```

### notification Table
```sql
CREATE TABLE notification (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  type VARCHAR(50),              -- 'expired', 'expiring-soon', 'resolved'
  sent_at DATETIME NOT NULL,
  status VARCHAR(50)              -- 'Read', 'Unread'
);
```

## 🚀 Quick Start

### Backend
```bash
# Terminal 1: Start Backend
cd SafeBite-Backend
.\mvnw.cmd spring-boot:run

# Should start on http://localhost:8080
```

### Frontend
```bash
# Terminal 2: Start Frontend
cd SafeBite-Backend/frontend
npm install
npm start

# Press 'w' for web, or use Expo app on phone
```

### Database
```bash
# Ensure MySQL is running
mysql -u root -p

# Create database (if not exists)
CREATE DATABASE safebite_db;

# Backend will auto-create tables via Hibernate DDL
```

## 🧪 Testing the Integration

### 1. Test Backend Health
```bash
curl http://localhost:8080/api/pantry/user/1
```
Expected response: `[]` or list of pantry items

### 2. Test Add Pantry Item via API
```bash
curl -X POST http://localhost:8080/api/pantry/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "productId": 101,
    "quantity": 5,
    "addedDate": "2026-08-16"
  }'
```

### 3. Test Frontend Screens
- Open Expo app or web version
- Navigate to Home tab → View stats and recent items
- Go to Pantry tab → Try adding/removing items
- Check Notifications tab → Should show grouped notifications

## 🔧 Configuration

### Backend Configuration
File: `src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/safebite_db
spring.datasource.username=root
spring.datasource.password=SafeBite2026
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend Configuration
File: `src/services/api.js`
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

For Android emulator, change to:
```javascript
const API_BASE_URL = 'http://10.0.2.2:8080/api';
```

## 🎨 Design System

### Colors
- **Primary Green**: #1B5E35 (SafeBite brand)
- **Success**: #27AE60
- **Warning**: #FFA500 (Amber/Orange)
- **Danger**: #E74C3C (Red)
- **Neutral**: #f8f8f8 (Light backgrounds)

### Typography
- **Font**: Nunito (regular & bold)
- **Headings**: 24-28px, bold
- **Body**: 14px, regular
- **Labels**: 12-13px, regular
- **Details**: 11px, regular

### Spacing
- **Padding**: 8px, 12px, 16px increments
- **Margins**: 8px, 12px, 16px, 24px increments
- **Border Radius**: 6px (buttons), 8px (cards), 12px (major containers)

### Animations
- Tab transitions: 200ms ease-in-out
- Item additions: 300ms slide-in
- Button feedback: Immediate opacity change

## 📊 Data Flow Examples

### Add Item to Pantry Flow
```
User Input (PantryScreen)
    ↓
handleAddItem()
    ↓
PantryAPI.addItem(userId, productId, quantity, addedDate)
    ↓
axios.post('/api/pantry/add', payload)
    ↓
Backend: PantryController.addToPantry()
    ↓
PantryService.addToPantry() [Validation & Business Logic]
    ↓
PantryRepository.save() [DB Insert via Hibernate]
    ↓
MySQL: INSERT INTO pantry (...) VALUES (...)
    ↓
Response: PantryResponse DTO
    ↓
Frontend: Update state, refresh list, show success alert
```

### Get Notifications Flow
```
useEffect() hook on NotificationsScreen
    ↓
loadNotifications()
    ↓
NotificationAPI.getUserNotifications(userId)
    ↓
axios.get('/api/notifications/user/1')
    ↓
Backend: NotificationController.getNotificationsByUser()
    ↓
NotificationService.getNotificationsByUser()
    ↓
NotificationRepository.findByUserId() [DB Query via Hibernate]
    ↓
MySQL: SELECT * FROM notification WHERE user_id = 1
    ↓
Response: List<NotificationResponse>
    ↓
Frontend: Group by type, render sections, display notifications
```

## 🐛 Troubleshooting

### Backend won't start
- **Issue**: Java version mismatch
- **Fix**: Ensure Java 21 is installed and in PATH
- **Verify**: `java -version`

### API returns 500 error
- **Issue**: Database schema problem
- **Fix**: Drop and recreate database
  ```bash
  DROP DATABASE safebite_db;
  CREATE DATABASE safebite_db;
  ```
- Restart backend to recreate tables

### Frontend can't connect to backend
- **Issue**: Port 8080 not accessible
- **Fix**:
  - Verify backend is running
  - Check firewall settings
  - For Android: Use `10.0.2.2` instead of `localhost`
  - For iOS: Use actual machine IP address

### Mock data showing instead of real data
- **Issue**: Backend not accessible
- **Expected**: App falls back to mock data gracefully
- **Fix**: Ensure MySQL and backend are running

## 📝 Next Steps

### For Backend Improvement
1. Add user authentication (JWT)
2. Add product entity for FK relationships
3. Implement expiry date calculations
4. Add more comprehensive validation
5. Implement comprehensive error handling
6. Add unit and integration tests
7. Add logging and monitoring
8. Implement caching

### For Frontend Enhancement
1. Add barcode scanner (expo-camera)
2. Implement user login screen
3. Add product database integration
4. Implement offline support
5. Add push notifications
6. Add dark mode
7. Optimize performance with React.memo
8. Add unit tests with Jest

## 📚 File Structure Reference

```
SafeBite-Backend/
├── src/
│   ├── main/
│   │   ├── java/org/example/safebitebackend/
│   │   │   ├── SafeBiteBackendApplication.java
│   │   │   └── pantry/
│   │   │       ├── controller/
│   │   │       │   ├── PantryController.java
│   │   │       │   └── NotificationController.java
│   │   │       ├── domain/
│   │   │       │   ├── Pantry.java
│   │   │       │   ├── PantryResponse.java
│   │   │       │   ├── Notification.java
│   │   │       │   └── NotificationResponse.java
│   │   │       ├── repository/
│   │   │       │   ├── PantryRepository.java
│   │   │       │   └── NotificationRepository.java
│   │   │       └── service/
│   │   │           ├── PantryService.java
│   │   │           └── NotificationService.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/org/example/safebitebackend/
│           └── SafeBiteBackendApplicationTests.java
├── pom.xml
└── frontend/                           [NEW]
    ├── App.jsx                         [NEW]
    ├── app.json                        [NEW]
    ├── babel.config.js                 [NEW]
    ├── package.json                    [NEW]
    ├── README.md                       [NEW]
    ├── src/
    │   ├── screens/
    │   │   ├── HomeScreen.jsx          [NEW]
    │   │   ├── PantryScreen.jsx        [NEW]
    │   │   └── NotificationsScreen.jsx [NEW]
    │   ├── services/
    │   │   └── api.js                  [NEW]
    │   └── components/                 [NEW - for future]
    └── assets/
        └── fonts/                      [NEW - future]
```

## 📞 Support

For questions or issues, refer to:
- Backend: Spring Boot documentation
- Frontend: React Native & Expo documentation
- Database: MySQL documentation

---

**Project Status**: Core implementation complete. Ready for integration testing and feature expansion.
