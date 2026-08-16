# SafeBite Backend - Setup and Fixes

## Issues Fixed

### 1. ❌ Java Version Incompatibility
**Problem:** Project was configured to use Java 26, which is not a stable/official release
**Fix:** Downgraded to Java 21 (LTS - Long Term Support version)
- Updated `<java.version>26</java.version>` to `<java.version>21</java.version>` in pom.xml
- Added explicit maven-compiler-plugin configuration to use Java 21

### 2. ❌ Spring Boot Version Incompatibility
**Problem:** Spring Boot 4.0.6 requires Java 26
**Fix:** Downgraded to Spring Boot 3.2.0 (stable LTS version compatible with Java 21)
- Changed `<version>4.0.6</version>` to `<version>3.2.0</version>` in parent pom

### 3. ❌ Missing JPA Dependency
**Problem:** Spring Data JPA dependency was commented out, breaking database functionality
**Fix:** Uncommented and added `spring-boot-starter-data-jpa` dependency

### 4. ❌ Invalid Dependencies
**Problem:** Non-existent artifact names referenced:
- `spring-boot-starter-webmvc` (doesn't exist)
- `spring-boot-starter-data-jpa-test` (doesn't exist)
- `spring-boot-starter-webmvc-test` (doesn't exist)

**Fix:** Replaced with correct artifact names:
- `spring-boot-starter-web` (for REST API support)
- `spring-boot-starter-test` (for testing)

### 5. ✅ Added Correct Dependencies
Final dependency configuration includes:
- `spring-boot-starter-data-jpa` - JPA/Hibernate ORM
- `spring-boot-starter-web` - Spring Web MVC & REST support
- `mysql-connector-j` - MySQL database driver
- `lombok` - Code generation for getters/setters
- `spring-boot-starter-test` - Testing framework (JUnit 5, Mockito, AssertJ)

## Build Status

✅ **Compilation:** SUCCESS
✅ **Package Build:** SUCCESS
✅ **All 11 source files compiled successfully**

## Running the Application

### Prerequisites
- Java 21 or later installed on your system
- Maven installed (or use the included `mvnw.cmd` wrapper)
- MySQL server running on localhost:3306
- Database configured as per `application.properties`

### Database Configuration
The application is configured to connect to:
- **URL:** jdbc:mysql://localhost:3306/safebite_db
- **Username:** root
- **Password:** SafeBite2026

**Important:** Create the MySQL database before running:
```sql
CREATE DATABASE safebite_db;
```

### Running the Application

#### Option 1: Using Maven Wrapper (Recommended)
```bash
cd C:\Users\somil\IdeaProjects\SafeBite-Backend
.\mvnw.cmd spring-boot:run
```

#### Option 2: Running the JAR directly
```bash
cd C:\Users\somil\IdeaProjects\SafeBite-Backend
.\mvnw.cmd package -DskipTests
java -jar target\SafeBiteBackend-0.0.1-SNAPSHOT.jar
```

The application will start on http://localhost:8080

## Project Structure

### Controllers
- **PantryController** (`/api/pantry`) - Manage user pantry items
  - POST `/add` - Add item to pantry
  - GET `/user/{userId}` - Get all pantry items for a user
  - PUT `/{pantryId}/quantity/{quantity}` - Update item quantity
  - DELETE `/{pantryId}` - Remove item from pantry

- **NotificationController** (`/api/notifications`) - Manage notifications
  - POST `/create` - Create a notification
  - GET `/user/{userId}` - Get all notifications for a user
  - DELETE `/{notificationId}` - Delete a notification

### Domain Entities
- **Pantry** - Represents pantry items (userId, productId, quantity, dates)
- **Notification** - Represents user notifications (message, type, status)

### Services
- **PantryService** - Business logic for pantry operations
- **NotificationService** - Business logic for notifications

### Database
- Hibernate ORM automatically creates/updates tables based on entity annotations
- Configuration: `spring.jpa.hibernate.ddl-auto=update` in application.properties

## Notes

- CORS is enabled for all origins (`@CrossOrigin(origins = "*")`)
- Database changes are automatically managed (ddl-auto=update)
- Lombok annotations reduce boilerplate code
- All endpoints use JSON for request/response

## Troubleshooting

### MySQL Connection Issues
If you get connection errors, verify:
1. MySQL server is running
2. Database 'safebite_db' exists
3. Credentials in application.properties are correct

### Port Already in Use
If port 8080 is in use, modify in application.properties:
```properties
server.port=8081
```

### Compilation Errors
Run clean compile:
```bash
.\mvnw.cmd clean compile
```

