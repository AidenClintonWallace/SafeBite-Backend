# SafeBite Frontend

React Native/Expo mobile app for tracking food expiry dates and managing your pantry.

## Features

### 🏠 Home Screen
- Greeting and personalized welcome message
- **Scan CTA Button** - Quick access to barcode scanner
- **Live Stats Counters**:
  - Total Items in pantry
  - Items Expiring Soon
  - Expired Items
- **Recent Items List** - Last 5 added items with quick access

### 🥫 My Pantry
- **Filter Tabs**: All, Active, Expiring
- **Add Item Form** with auto-detection of product status
  - Product ID input
  - Quantity input
  - Date added (with auto-status detection)
- **Remove Items** with confirmation
- **Status Badges**:
  - 🟢 Green - Active (recently added)
  - 🟠 Amber - Expiring Soon (20+ days old)
  - 🔴 Red - Expired (30+ days old)

### 🔔 Notifications
- **Grouped by Category**:
  - **Expired** (🔴 Red) - Items past their expiry
  - **Expiring Soon** (⚠️ Amber) - Items expiring within 10 days
  - **Resolved** (✅ Green) - Consumed or disposed items
- **Resolve Button** on each notification
- **Notification Count** displayed per category
- **Status Indicator** - Unread (orange) vs Read (gray)

## Design Details

- **Color Scheme**: SafeBite Green (#1B5E35) throughout
- **Font**: Nunito (bold, friendly)
- **Animations**: Smooth screen transitions and item additions
- **Layout**: Mobile-first design with phone shell appearance

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g expo-cli`
- Backend API running on `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Running the App

#### Development (Web)
```bash
npm start
```
Then press `w` to open in web browser.

#### Android
```bash
npm run android
```
Requires Android emulator or physical device with Expo app installed.

#### iOS
```bash
npm run ios
```
Requires macOS and Xcode.

## API Connection

The app connects to the SafeBite Backend API:

### Base URL
```
http://localhost:8080/api
```

### Pantry Endpoints
- `POST /pantry/add` - Add item to pantry
- `GET /pantry/user/{userId}` - Get user's pantry items
- `PUT /pantry/{pantryId}/quantity/{quantity}` - Update quantity
- `DELETE /pantry/{pantryId}` - Remove item

### Notification Endpoints
- `POST /notifications/create` - Create notification
- `GET /notifications/user/{userId}` - Get user's notifications
- `DELETE /notifications/{notificationId}` - Delete notification

## Project Structure

```
frontend/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   ├── PantryScreen.jsx
│   │   └── NotificationsScreen.jsx
│   ├── services/
│   │   └── api.js (Axios API calls)
│   └── components/
│       └── (Shared components)
├── assets/
│   ├── fonts/
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── App.jsx (Main navigation)
├── app.json (Expo configuration)
├── babel.config.js
└── package.json
```

## Mock Data

When the backend is not available, the app uses mock data for demo purposes. Replace with real backend data by:

1. Ensuring MySQL `safebite_db` database is running
2. Starting the backend: `./mvnw.cmd spring-boot:run`
3. API calls will automatically fetch from the real database

## Troubleshooting

### Backend Connection Issues
If getting network errors:
1. Ensure backend is running on port 8080
2. For Android emulator, use `10.0.2.2` instead of `localhost`
3. Check Android device is on same network as development machine

### Module Not Found
Run: `npm install`

### Port Already in Use
If Expo port is in use:
```bash
expo start -c --port 19000
```

## Development

### Adding New Screens
1. Create file in `src/screens/`
2. Add to navigation stack in `App.jsx`
3. Connect to API via `services/api.js`

### Updating Styles
- All screens use `StyleSheet` for performance
- Color constants at top of each file
- Consistent spacing and sizing scale

## Testing

No automated tests included in this version. Manual testing checklist:
- [ ] All buttons respond to taps
- [ ] Forms validate input
- [ ] API calls succeed/fail gracefully
- [ ] Animations are smooth
- [ ] Layout works on different screen sizes

## Performance Notes

- FlatList used for efficient list rendering
- ScrollView with scrollEnabled={false} for flat lists
- Activity indicators for loading states
- Proper error handling with alerts

## Future Enhancements

- Barcode scanning integration
- Dark mode support
- Push notifications
- User authentication
- Analytics tracking
- Offline support with local storage
