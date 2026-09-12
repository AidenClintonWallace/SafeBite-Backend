# SafeBite Pantry Subsystem - Architecture & Components

## System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                        REACT NATIVE FRONTEND                        │
│                         (Expo Mobile App)                           │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    PantryScreen.jsx                          │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ Header: SafeBite | Menu Icon                          │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ My Pantry | Sort Button                              │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ [ALL]  [SAFE]  [SOON]  [EXP]  (Filter Buttons)      │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ FlatList of Product Cards:                           │ │ │
│  │  │ ┌──────────────────────────────────────────────────┐ │ │ │
│  │  │ │ Product Name          | [SAFE] ✓               │ │ │ │
│  │  │ │ Expires: YYYY-MM-DD   | Qty: 2 | Delete [🗑]   │ │ │ │
│  │  │ └──────────────────────────────────────────────────┘ │ │ │
│  │  │ ┌──────────────────────────────────────────────────┐ │ │ │
│  │  │ │ Product Name          | [SOON] ⏱ 3 days        │ │ │ │
│  │  │ │ Expires: YYYY-MM-DD   | Qty: 1 | Delete [🗑]   │ │ │ │
│  │  │ └──────────────────────────────────────────────────┘ │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ + Add Product Button (at bottom)                      │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │                                                              │ │
│  │  MODALS:                                                    │ │
│  │  • Add Product Modal (form with validation)                │ │
│  │  • Sort Modal (4 sort options)                             │ │
│  │  • Delete Confirmation (Cancel/Delete)                     │ │
│  │                                                              │ │
│  │  STATES:                                                    │ │
│  │  • Loading (spinner)                                       │ │
│  │  • Empty (message + add button)                            │ │
│  │  • Error (message + retry button)                          │ │
│  │  • Pull-to-refresh                                         │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              pantryApi.js (Service Layer)                   │ │
│  │  • getPantryByUser()                                        │ │
│  │  • getPantryByUserAndStatus()                               │ │
│  │  • getPantryByUserSorted()                                  │ │
│  │  • addToPantry()                                            │ │
│  │  • removePantryItem()                                       │ │
│  │  • Product CRUD methods                                    │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                 HTTP REST API │ (JSON)
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT BACKEND                            │
│                     (Java Application)                            │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │               PantryController                            │  │
│  │  GET  /api/pantry/user/{userId}                          │  │
│  │  GET  /api/pantry/user/{userId}/status/{status}         │  │
│  │  GET  /api/pantry/user/{userId}/sorted?sortBy=...      │  │
│  │  POST /api/pantry/add                                   │  │
│  │  PUT  /api/pantry/{pantryId}/quantity/{quantity}        │  │
│  │  DELETE /api/pantry/{pantryId}                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              ProductController                            │  │
│  │  POST   /api/product/add                                 │  │
│  │  GET    /api/product/{productId}                         │  │
│  │  GET    /api/product/all                                 │  │
│  │  PUT    /api/product/{productId}                         │  │
│  │  DELETE /api/product/{productId}                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                               ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │               SERVICE LAYER                               │  │
│  │  ┌──────────────────┐         ┌──────────────────────┐   │  │
│  │  │  PantryService   │         │  ProductService      │   │  │
│  │  │  • addToPantry() │         │  • createProduct()   │   │  │
│  │  │  • getPantryByUser()       │  • getProductById()  │   │  │
│  │  │  • getPantryByUserAndStatus()                      │   │  │
│  │  │  • getPantryByUserSorted() │  • updateProduct()   │   │  │
│  │  │  • updateQuantity()        │  • deleteProduct()   │   │  │
│  │  │  • removeFromPantry()      │                      │   │  │
│  │  │                            │  BUSINESS LOGIC:     │   │  │
│  │  │ BUSINESS LOGIC:            │  • Validation        │   │  │
│  │  │ • calculateExpiryStatus()  │  • Timestamps        │   │  │
│  │  │ • calculateDaysUntilExpiry()                      │   │  │
│  │  │ • Filtering logic          │  • Error handling    │   │  │
│  │  │ • Sorting logic            │                      │   │  │
│  │  │ • Join with Product        │                      │   │  │
│  │  └──────────────────┘         └──────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                               ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │            REPOSITORY LAYER (Data Access)                │  │
│  │  ┌──────────────────┐         ┌──────────────────────┐   │  │
│  │  │ PantryRepository │         │ ProductRepository    │   │  │
│  │  │ extends          │         │ extends              │   │  │
│  │  │ JpaRepository    │         │ JpaRepository        │   │  │
│  │  │                  │         │                      │   │  │
│  │  │ Methods:         │         │ Methods:             │   │  │
│  │  │ • save()         │         │ • save()             │   │  │
│  │  │ • findById()     │         │ • findById()         │   │  │
│  │  │ • findByUserId() │         │ • findAll()          │   │  │
│  │  │ • delete()       │         │ • delete()           │   │  │
│  │  │                  │         │ • findByProductName()│   │  │
│  │  └──────────────────┘         └──────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                               ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              DOMAIN/ENTITY LAYER                          │  │
│  │  ┌──────────────────┐         ┌──────────────────────┐   │  │
│  │  │  Pantry Entity   │         │  Product Entity      │   │  │
│  │  │  • pantryId      │         │  • productId         │   │  │
│  │  │  • userId        │         │  • productName       │   │  │
│  │  │  • productId (FK)│         │  • expiryDate        │   │  │
│  │  │  • quantity      │         │  • category          │   │  │
│  │  │  • addedDate     │         │  • createdAt         │   │  │
│  │  │  • lastUpdated   │         │  • updatedAt         │   │  │
│  │  └──────────────────┘         └──────────────────────┘   │  │
│  │                                                            │  │
│  │  ┌──────────────────┐         ┌──────────────────────┐   │  │
│  │  │ PantryResponse   │         │ ProductResponse      │   │  │
│  │  │ DTO              │         │ DTO                  │   │  │
│  │  │ • pantryId       │         │ • productId          │   │  │
│  │  │ • userId         │         │ • productName        │   │  │
│  │  │ • productId      │         │ • expiryDate         │   │  │
│  │  │ • productName    │         │ • category           │   │  │
│  │  │ • quantity       │         │ • createdAt          │   │  │
│  │  │ • addedDate      │         │ • updatedAt          │   │  │
│  │  │ • expiryDate     │         └──────────────────────┘   │  │
│  │  │ • expiryStatus   │              (for API responses)   │  │
│  │  │ • daysUntilExpiry│                                    │  │
│  │  │ • lastUpdated    │                                    │  │
│  │  └──────────────────┘                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                 JDBC/Hibernate │ (Object-Relational Mapping)
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│                      MYSQL DATABASE                               │
│                   (safebite_db - Existing)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ TABLE: product                                             │ │
│  │ ┌──────────────────────────────────────────────────────┐  │ │
│  │ │ product_id (PK) | INT | AUTO_INCREMENT              │  │ │
│  │ │ product_name | VARCHAR(255) | NOT NULL              │  │ │
│  │ │ expiry_date | DATE | NOT NULL                       │  │ │
│  │ │ category | VARCHAR(100) | NULL                      │  │ │
│  │ │ created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP   │  │ │
│  │ │ updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP   │  │ │
│  │ └──────────────────────────────────────────────────────┘  │ │
│  │ Sample Data:                                               │ │
│  │ 1 | Lucky Star Pilchards | 2027-05-12 | Canned | ...       │ │
│  │ 2 | Clover Milk 1L | 2026-09-04 | Dairy | ...             │ │
│  │ 3 | Koo Peach Slices | 2026-09-01 | Canned | ...           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ TABLE: pantry (EXISTING - PRESERVED)                       │ │
│  │ ┌──────────────────────────────────────────────────────┐  │ │
│  │ │ pantry_id (PK) | INT | AUTO_INCREMENT               │  │ │
│  │ │ user_id | INT | NOT NULL                            │  │ │
│  │ │ product_id (FK) | INT | NOT NULL → product(id)      │  │ │
│  │ │ quantity | INT | NOT NULL                           │  │ │
│  │ │ added_date | DATE | DEFAULT CURDATE()               │  │ │
│  │ │ last_updated | DATETIME | DEFAULT CURRENT_TIMESTAMP │  │ │
│  │ └──────────────────────────────────────────────────────┘  │ │
│  │ Sample Data:                                               │ │
│  │ 1 | 1 | 1 | 2 | 2026-09-03 | ...                          │ │
│  │ 2 | 1 | 2 | 1 | 2026-09-02 | ...                          │ │
│  │ 3 | 1 | 3 | 1 | 2026-09-03 | ...                          │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Examples

### Example 1: Display All Pantry Items

```
USER OPENS APP
     ↓
PantryScreen.jsx useEffect()
     ↓
fetchPantryItems() calls fetch("/api/pantry/user/1")
     ↓
PantryController.getPantryByUser(1)
     ↓
PantryService.getPantryByUser(1)
     ↓
PantryRepository.findByUserId(1) [SQL: SELECT * FROM pantry WHERE user_id=1]
     ↓
For each Pantry record:
  └─ Fetch Product via ProductRepository.findById(productId)
  └─ Calculate expiryStatus (SAFE/SOON/EXPIRED)
  └─ Calculate daysUntilExpiry
     ↓
Return List<PantryResponse> with all data
     ↓
Frontend receives JSON array
     ↓
useState setPantryItems(data)
     ↓
UI renders FlatList with ProductCards
     ↓
USER SEES: All items with status badges
```

### Example 2: Filter by SOON Status

```
USER TAPS "SOON" FILTER BUTTON
     ↓
useState setSelectedFilter("SOON")
     ↓
useEffect detects filter change
     ↓
fetchPantryItems() calls fetch("/api/pantry/user/1/status/SOON")
     ↓
PantryController.getPantryByUserAndStatus(1, "SOON")
     ↓
PantryService.getPantryByUserAndStatus(1, "SOON")
     ↓
1. Get all pantry items for user
2. Map to responses (with expiry status calculated)
3. Filter where expiryStatus == "SOON"
4. Return filtered list
     ↓
Frontend receives filtered JSON array
     ↓
applyFilterAndSort() filters local state again
     ↓
setState setFilteredItems(filtered)
     ↓
UI re-renders with only SOON items
     ↓
USER SEES: Only orange-badged items (0-6 days to expiry)
```

### Example 3: Add New Product

```
USER TAPS "+ Add Product"
     ↓
showAddModal modal opens
     ↓
USER FILLS FORM:
  • Product Name: "Rice 2kg"
  • Expiry Date: "2027-03-20"
  • Quantity: "3"
  • Category: "Dry Goods"
     ↓
USER TAPS "Add Item"
     ↓
handleAddItem() validates form
     ↓
STEP 1: Create Product
  POST /api/product/add
  {productName, expiryDate, category}
     ↓
  ProductController.addProduct()
  ProductService.createProduct()
  ProductRepository.save()
  INSERT INTO product (...)
     ↓
  Returns: ProductResponse with productId=11
     ↓
STEP 2: Add to Pantry
  POST /api/pantry/add
  {userId: 1, productId: 11, quantity: 3, addedDate: "2026-09-03"}
     ↓
  PantryController.addToPantry()
  PantryService.addToPantry()
  PantryRepository.save()
  INSERT INTO pantry (...)
     ↓
  Returns: PantryResponse
     ↓
Frontend shows "Success!" alert
     ↓
fetchPantryItems() refreshes list
     ↓
STEP 3: Update UI
  Backend calculates:
    expiryDate: 2027-03-20
    today: 2026-09-03
    daysUntilExpiry: 200
    expiryStatus: "SAFE" (200 > 7)
     ↓
setState updates pantryItems with new item
     ↓
FlatList re-renders
     ↓
USER SEES: New item appears in list at bottom with SAFE badge (green)
```

### Example 4: Delete Product

```
USER TAPS DELETE ICON
     ↓
handleDeleteItem(pantryId=5)
     ↓
Alert.alert confirmation dialog shown
  [Cancel] [Delete]
     ↓
USER TAPS "Delete"
     ↓
DELETE /api/pantry/5
     ↓
PantryController.removeFromPantry(5)
     ↓
PantryService.removeFromPantry(5)
     ↓
PantryRepository.deleteById(5)
  DELETE FROM pantry WHERE pantry_id=5
     ↓
Backend returns: "Pantry item removed successfully"
     ↓
Frontend shows "Success!" alert
     ↓
fetchPantryItems() refreshes list
     ↓
Backend recalculates:
  SELECT * FROM pantry WHERE user_id=1
  (now only 9 items)
     ↓
setState updates pantryItems
     ↓
UI re-renders without deleted item
     ↓
USER SEES: Item removed from list
```

---

## Status Badge Logic

```
Backend calculates in real-time:

daysUntilExpiry = expiryDate - TODAY

if (daysUntilExpiry < 0) {
    expiryStatus = "EXPIRED"  // Red badge
    label = "Expired"
} else if (daysUntilExpiry <= 2) {
    expiryStatus = "SOON"     // Orange badge
    label = "{daysUntilExpiry} day(s)"
} else if (daysUntilExpiry <= 7) {
    expiryStatus = "SOON"     // Orange badge  
    label = "{daysUntilExpiry} day(s)"
} else {
    expiryStatus = "SAFE"     // Green badge
    label = "Safe"
}

Frontend receives expiryStatus and daysUntilExpiry
Renders: <StatusBadge color={getStatusColor(status)} text={getStatusLabel(status, daysUntil)} />
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React Native | Cross-platform mobile framework |
| | Expo | React Native development platform |
| | JavaScript ES6+ | Language |
| | React Hooks | State management (useState, useEffect) |
| **Backend** | Spring Boot 3.3.5 | Web framework |
| | Java 21 | Language |
| | Spring Data JPA | ORM framework |
| | Hibernate | Object-relational mapping |
| | Maven | Build tool |
| **Database** | MySQL 8.0+ | Relational database |
| | JDBC | Database connectivity |
| **API** | REST | Architecture style |
| | JSON | Data format |
| | HTTP | Protocol |

---

## This Architecture Provides

✅ **Separation of Concerns**: Clear layering (UI → Service → Repository → DB)
✅ **Scalability**: Easy to add new features and filters
✅ **Maintainability**: Clean code structure and documented APIs
✅ **Reliability**: Proper error handling at each layer
✅ **Performance**: Efficient database queries and frontend rendering
✅ **Flexibility**: API can be consumed by multiple clients
✅ **Security**: Input validation on backend and CORS enabled
✅ **User Experience**: Real-time updates, loading states, error messages

---

Created: September 3, 2026
Status: ✅ Complete and Production Ready
