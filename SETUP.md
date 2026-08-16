# SafeBite Setup Instructions

Complete step-by-step guide to get SafeBite running locally.

## Prerequisites

### System Requirements
- Windows 10/11 or macOS 10.15+
- 4GB RAM minimum (8GB recommended)
- 500MB free disk space

### Software Required

1. **Java 21 LTS**
   - Download: https://www.oracle.com/java/technologies/downloads/#java21
   - Verify: `java -version` (should show Java 21)

2. **MySQL Server 8.0+**
   - Download: https://dev.mysql.com/downloads/mysql/
   - Verify: `mysql --version`
   - During install, set root password to: `SafeBite2026` (or update application.properties)

3. **Node.js 16+ and npm**
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

4. **Expo CLI** (for frontend)
   - Install: `npm install -g expo-cli`
   - Verify: `expo --version`

5. **Git** (optional, for version control)
   - Download: https://git-scm.com/

## Step 1: Database Setup

### Windows
```bash
# Open Command Prompt or PowerShell

# Start MySQL server (if not auto-started)
mysql -u root -p

# Enter password when prompted (SafeBite2026)

# Create database
CREATE DATABASE safebite_db;

# Exit MySQL
EXIT;
```

### macOS
```bash
# If MySQL not running, start it
mysql.server start

# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE safebite_db;

# Exit
EXIT;
```

**Verify**: 
```bash
mysql -u root -p -e "SHOW DATABASES;" | grep safebite_db
```

## Step 2: Backend Setup

```bash
# Navigate to backend directory
cd SafeBite-Backend

# Clean previous builds
.\mvnw.cmd clean

# Compile the project
.\mvnw.cmd compile

# Expected output: BUILD SUCCESS
```

## Step 3: Backend First Run

```bash
# Still in SafeBite-Backend directory
# Start the Spring Boot application
.\mvnw.cmd spring-boot:run

# Expected output shows:
# - SafeBiteBackendApplication started
# - Tomcat initialized with port 8080
# - HikariPool-1 connection established
# - Tables created/updated automatically

# Ctrl+C to stop (when done testing)
```

The backend is now running at: `http://localhost:8080`

## Step 4: Test Backend API

### Option A: Using curl (if installed)
```bash
# In a new terminal/PowerShell
curl http://localhost:8080/api/pantry/user/1

# Should return: [] (empty list)
```

### Option B: Using PowerShell
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/pantry/user/1" -Method GET
```

### Option C: Using browser
Go to: `http://localhost:8080/api/pantry/user/1`

## Step 5: Frontend Setup

```bash
# In a NEW terminal/PowerShell window
# Navigate to frontend directory
cd SafeBite-Backend\frontend

# Install dependencies
npm install

# This may take 2-5 minutes
```

## Step 6: Start Frontend

```bash
# Still in frontend directory
npm start

# You should see:
# ✓ Expo DevTools are running at http://localhost:19002
# ▄ Tunnel ready.
# › Android app
# › iOS app
# › Web
```

### Option A: Web Browser
- Press `w` in the terminal to open in web browser
- You'll see the SafeBite app with mock data initially

### Option B: iOS (macOS only)
- Press `i` to start iOS simulator
- Requires Xcode installed

### Option C: Android
- Press `a` to start Android emulator
- Requires Android Studio installed
- Or scan QR code with Expo app on your phone

## Step 7: Test the Complete System

### Frontend Tests
1. **Home Screen**
   - ✅ Should show greeting
   - ✅ Stats showing (may be mock data)
   - ✅ Scan button visible
   - ✅ Recent items list showing

2. **Pantry Screen**
   - ✅ Three filter tabs visible (All, Active, Expiring)
   - ✅ Add button in top right
   - ✅ Items list showing (mock data)
   - ✅ Can tap Add button to open form

3. **Notifications Screen**
   - ✅ Grouped notifications visible
   - ✅ Different colors for each type
   - ✅ Can tap checkmark to resolve

### Backend API Tests

In another terminal:
```bash
# Test 1: Get user's pantry items
curl http://localhost:8080/api/pantry/user/1

# Test 2: Add item to pantry
curl -X POST http://localhost:8080/api/pantry/add ^
  -H "Content-Type: application/json" ^
  -d "{\"userId\":1,\"productId\":101,\"quantity\":5,\"addedDate\":\"2026-08-16\"}"

# Test 3: Get user's notifications
curl http://localhost:8080/api/notifications/user/1
```

## Connecting Frontend to Real Backend

1. **Ensure MySQL is running:**
   ```bash
   mysql -u root -p -e "SELECT 1"
   ```

2. **Ensure backend is running:**
   ```bash
   # Terminal 1
   cd SafeBite-Backend
   .\mvnw.cmd spring-boot:run
   ```

3. **Start frontend:**
   ```bash
   # Terminal 2
   cd SafeBite-Backend\frontend
   npm start
   ```

4. **Add an item via frontend:**
   - Go to Pantry tab
   - Tap Add button
   - Fill form:
     - Product ID: 101
     - Quantity: 5
     - Date Added: 2026-08-16
   - Tap "Add Item"
   - Should see success message
   - Item appears in list

5. **Check database:**
   ```bash
   mysql -u root -p -e "SELECT * FROM safebite_db.pantry;"
   ```

## Troubleshooting

### Problem: "BUILD FAILURE" in backend
**Solution:**
```bash
cd SafeBite-Backend
.\mvnw.cmd clean compile -U
```

### Problem: "Connection refused" when connecting to MySQL
**Solution:**
- Ensure MySQL server is running
- Windows: Check Services (mysql80)
- macOS: Run `mysql.server start`
- Verify credentials in `application.properties`

### Problem: "Port 8080 already in use"
**Solution:**
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change port in application.properties:
server.port=8081
```

### Problem: Frontend shows mock data instead of real data
**Solution:**
- Ensure backend is running (check http://localhost:8080)
- Check browser console for API errors (F12)
- Verify network tab shows requests to localhost:8080

### Problem: "npm: command not found"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart terminal after installation
- Verify: `node --version`

### Problem: "expo: command not found"
**Solution:**
```bash
npm install -g expo-cli
expo --version
```

## Development Workflow

### Terminal Setup
Keep three terminals open simultaneously:

**Terminal 1 - MySQL**
```bash
mysql -u root -p
# Keep connection open to monitor queries
```

**Terminal 2 - Backend**
```bash
cd SafeBite-Backend
.\mvnw.cmd spring-boot:run
```

**Terminal 3 - Frontend**
```bash
cd SafeBite-Backend\frontend
npm start
```

### Making Changes

**Backend Changes:**
1. Edit Java files
2. Stop `spring-boot:run` (Ctrl+C)
3. Run again - changes auto-reloaded
4. Test with API client or frontend

**Frontend Changes:**
1. Edit .jsx files
2. Save file
3. Frontend auto-refreshes in browser/simulator
4. Test interactions

## Useful Commands

```bash
# Backend
.\mvnw.cmd clean         # Clean build artifacts
.\mvnw.cmd compile       # Compile only
.\mvnw.cmd test          # Run tests
.\mvnw.cmd spring-boot:run  # Start app
.\mvnw.cmd package       # Create JAR

# Frontend
npm install              # Install dependencies
npm start                # Start dev server
npm run android          # Start Android simulator
npm run ios              # Start iOS simulator
expo start --web         # Start web version only
expo publish             # Deploy to Expo

# MySQL
mysql -u root -p         # Connect to MySQL
mysql -u root -p < script.sql  # Run SQL file
mysql -u root -p -e "SQL" # Execute single command
```

## Deployment Considerations

### Production Backend
```bash
# Create production JAR
.\mvnw.cmd package -DskipTests

# Run JAR
java -jar target\SafeBiteBackend-0.0.1-SNAPSHOT.jar

# Set environment variables
$env:SERVER_PORT=8080
$env:DB_URL=jdbc:mysql://db-server:3306/safebite_db
$env:DB_USER=safebite_user
$env:DB_PASSWORD=secure_password
```

### Production Frontend
```bash
# Build for production
npm run build

# Deploy to Expo or other hosting
expo publish

# Or build native apps
eas build --platform android
eas build --platform ios
```

## Next Steps

After successful setup:

1. ✅ Explore the codebase
2. ✅ Add more test data via API
3. ✅ Implement barcode scanner
4. ✅ Add user authentication
5. ✅ Deploy to cloud services
6. ✅ Set up CI/CD pipeline

## Support Resources

- Backend: https://spring.io/projects/spring-boot
- Frontend: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- MySQL: https://dev.mysql.com/doc/
- Java: https://docs.oracle.com/en/java/javase/21/

---

**Status**: Full setup complete. System ready for development and testing.
