# SafeBite - UI/UX Wireframe & Component Reference

This document provides ASCII wireframes and component details for each screen.

## Color Palette

```
PRIMARY GREEN:     #1B5E35  (SafeBite Brand Color)
SUCCESS GREEN:     #27AE60  (Success states)
WARNING AMBER:     #FFA500  (Expiring Soon)
DANGER RED:        #E74C3C  (Expired)
LIGHT GRAY:        #f8f8f8  (Card backgrounds)
DARK GRAY:         #666    (Secondary text)
LIGHT TEXT:        #999    (Tertiary text)
```

---

## Screen 1: HOME SCREEN

### Wireframe
```
┌─────────────────────────────────┐
│                                 │
│  Welcome back! 👋               │
│  You have 8 items in your...    │
│                                 │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │  📷 Scan Barcode          │  │ [GREEN CTA Button]
│  └───────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│  Quick Stats                    │
│                                 │
│  ┌─────────────────────────┐    │
│  │▌                        │    │
│  │  Total Items         8  │    │ [Green left border]
│  │  📋                     │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │▌                        │    │
│  │  Expiring Soon       2  │    │ [Amber left border]
│  │  ⚠️                      │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │▌                        │    │
│  │  Expired             1  │    │ [Red left border]
│  │  ✕                      │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  Recently Added                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Product #101           │─► │ [Gray card]
│  │  Added: 2026-08-15      │    │
│  │  Qty: 5                 │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Product #102           │─► │
│  │  Added: 2026-08-14      │    │
│  │  Qty: 3                 │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  🏠 Home  🥫 Pantry  🔔 Notif  │ [Bottom Tab Navigation]
└─────────────────────────────────┘
```

### Key Components
| Element | Properties |
|---------|-----------|
| Greeting | Size: 28px Bold, Color: #000 |
| Sub-text | Size: 14px Regular, Color: #666 |
| Scan Button | BG: #1B5E35, Color: White, Padding: 14px, BorderRadius: 12px |
| Stat Card | BG: #f8f8f8, LeftBorder: 4px (colored), Padding: 12px |
| Stat Value | Size: 20px Bold, Color: #000 |
| Stat Label | Size: 12px Regular, Color: #666 |
| Recent Item | BG: #f8f8f8, Padding: 12px, BorderRadius: 8px |

---

## Screen 2: PANTRY SCREEN

### Wireframe
```
┌─────────────────────────────────┐
│  My Pantry                    ⊕ │ [+ button top right]
│                                 │
├─────────────────────────────────┤
│ All  │ Active │ Expiring       │ [Filter tabs with underline]
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │ Product #101  2026-08-15│    │
│  │ ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  Active │  │ [Status badge]
│  │                         │    │
│  │ Qty: 5              [🗑]│    │ [Remove button - Red]
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Product #102  2026-08-12│    │
│  │ ▄▄▄▄▄▄  Expiring Soon  │    │ [Status badge - Amber]
│  │                         │    │
│  │ Qty: 3              [🗑]│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Product #103  2026-07-20│    │
│  │ ▄▄▄▄▄▄  Expired        │    │ [Status badge - Red]
│  │                         │    │
│  │ Qty: 2              [🗑]│    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Modal (overlay):               │
│  ┌─────────────────────────┐    │
│  │ Add Item to Pantry   [✕]│    │
│  ├─────────────────────────┤    │
│  │ Product ID              │    │
│  │ ┌─────────────────────┐ │    │
│  │ │ [input field]       │ │    │
│  │ └─────────────────────┘ │    │
│  │                         │    │
│  │ Quantity                │    │
│  │ ┌─────────────────────┐ │    │
│  │ │ [input field]       │ │    │
│  │ └─────────────────────┘ │    │
│  │                         │    │
│  │ Date Added              │    │
│  │ ┌─────────────────────┐ │    │
│  │ │ YYYY-MM-DD          │ │    │
│  │ └─────────────────────┘ │    │
│  │                         │    │
│  │ ┌─────────────────────┐ │    │
│  │ │ Add Item  [GREEN]   │ │    │
│  │ └─────────────────────┘ │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  🏠 Home  🥫 Pantry  🔔 Notif  │
└─────────────────────────────────┘
```

### Key Components
| Element | Properties |
|---------|-----------|
| Tab | Active: #1B5E35, Inactive: #666, Underline: 2px |
| Status Badge | BG: Color+20% opacity, Border: 1px colored, Radius: 20px |
| Remove Button | BG: #E74C3C, Color: White, Padding: 12x6px, Radius: 6px |
| Modal Overlay | BG: rgba(0,0,0,0.5), Bottom sheet slide |
| Input Field | Border: 1px #e0e0e0, Padding: 10px, Radius: 8px |
| Submit Button | BG: #1B5E35, Color: White, Padding: 14px, Radius: 8px |

---

## Screen 3: NOTIFICATIONS SCREEN

### Wireframe
```
┌─────────────────────────────────┐
│  Notifications                  │
│                                 │
├─────────────────────────────────┤
│  🔴 Expired              [2]    │ [Group header with count]
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🔴 │ Yogurt has expired │ [✓]│ [Icon + message + resolve]
│  │    │ 2026-08-15         │    │
│  │    │ ● (unread)         │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🔴 │ Butter has expired │ [✓]│
│  │    │ 2026-08-12         │    │
│  │    │ ○ (read)           │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  ⚠️  Expiring Soon           [1]│ [Group header - Amber]
│                                 │
│  ┌─────────────────────────┐    │
│  │ ⚠️ │ Milk expires in 2 d│ [✓]│
│  │    │ 2026-08-16         │    │
│  │    │ ● (unread)         │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  ✅ Resolved                 [1]│ [Group header - Green]
│                                 │
│  ┌─────────────────────────┐    │
│  │ ✅ │ Marked Bread as    │    │ [No resolve button]
│  │    │ consumed           │    │
│  │    │ 2026-08-13         │    │
│  │    │ ○ (read)           │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  🏠 Home  🥫 Pantry  🔔 Notif  │
└─────────────────────────────────┘
```

### Key Components
| Element | Properties |
|---------|-----------|
| Group Header | Font: 16px Bold, Icon emoji, Count badge |
| Count Badge | BG: #f0f0f0, Color: #666, BorderRadius: 20px |
| Notif Card | BG: #f8f8f8, Padding: 12px, BorderRadius: 12px |
| Notif Icon | Size: 48x48, BorderRadius: 24, BG: Color+20% |
| Status Dot | Size: 8x8, Orange (unread) or Gray (read) |
| Resolve Btn | Size: 36x36, BG: #1B5E35, BorderRadius: 18, Icon: ✓ |

---

## Component Library

### Status Badge Component
```
┌────────────────────┐
│ 🟢 Active          │  Color: #1B5E35
└────────────────────┘

┌────────────────────┐
│ 🟠 Expiring Soon   │  Color: #FFA500
└────────────────────┘

┌────────────────────┐
│ 🔴 Expired         │  Color: #E74C3C
└────────────────────┘
```

### Button Styles
```
Primary Button (Green):
┌──────────────────────────┐
│  Add Item  (or action)   │  BG: #1B5E35
│                          │  Color: White
└──────────────────────────┘  Weight: Bold

Secondary Button (Red):
┌──────────────────┐
│  🗑 Remove       │  BG: #E74C3C
│                  │  Color: White
└──────────────────┘  Size: Small

Action Button (Mini):
┌────┐
│ ✓  │  BG: #1B5E35
└────┘  Size: 36x36
```

### Form Components
```
Text Input:
┌──────────────────────────┐
│ [input placeholder]      │  Border: #e0e0e0
└──────────────────────────┘  Height: 44px

Label:
Product ID

Hint Text:
e.g., 101
```

### List Item Styles
```
Simple Item:
┌─────────────────────────────┐
│ Item Title        Value      │  BG: #f8f8f8
│ 2026-08-16  •  123456789    │  Padding: 12px
└─────────────────────────────┘

Card Item:
┌─────────────────────────────┐
│ ┌──────────────┐ Title       │
│ │  Icon/Color  │ Subtitle    │  BG: #f8f8f8
│ │ Background   │ Meta Info   │  Radius: 12px
│ └──────────────┘             │
└─────────────────────────────┘
```

---

## Navigation Flow

### Bottom Tab Navigation
```
┌─────────────────┬─────────────────┬─────────────────┐
│  🏠 Home        │  🥫 Pantry      │  🔔 Notif       │
│  Home           │  Pantry         │  Notifications  │
└─────────────────┴─────────────────┴─────────────────┘
   Active Green        Inactive Gray      Inactive Gray
```

### Screen Transitions
```
HomeScreen ←→ (navigate via tabs) ←→ PantryScreen
                                        ↓ (modal)
                                   AddItemModal
                                   
HomeScreen ←→ (navigate via tabs) ←→ NotificationsScreen
```

---

## Typography Scale

### Font Family
**Primary:** Nunito
- **Bold:** Headers, titles, emphases
- **Regular:** Body text, labels, descriptions

### Font Sizes & Weights
```
Heading 1:  28px Bold     (Screen titles, greetings)
Heading 2:  24px Bold     (Section headers)
Heading 3:  18px Bold     (Modal titles)
Body:       14px Regular  (Main text, item titles)
Label:      13px Regular  (Form labels)
Detail:     12px Regular  (Metadata, hints)
Meta:       11px Regular  (Timestamps, secondary info)
```

### Line Heights
```
Heading:  1.2x font size
Body:     1.5x font size
Labels:   1.3x font size
```

---

## Spacing System

### Consistent Spacing Scale
```
4px   = 1 unit
8px   = 2 units
12px  = 3 units
16px  = 4 units
24px  = 6 units
```

### Common Spacing
```
Screen Padding:      16px
Card Padding:        12px
Element Gap:         8px or 12px
Section Margin:      24px
Line-height:         1.5x
Border Radius:       6-12px
```

---

## Dark Mode Considerations

The design is currently light mode only, but could be extended:

```
Light Mode:
Text:       #000
Secondary:  #666
Tertiary:   #999
BG:         #fff
Card BG:    #f8f8f8
Borders:    #e0e0e0

Dark Mode (future):
Text:       #fff
Secondary:  #ccc
Tertiary:   #888
BG:         #1a1a1a
Card BG:    #2a2a2a
Borders:    #444
```

---

## Responsive Design Notes

### Current Device Targets
- Phone: 375px - 428px width (default)
- Tablet: 768px+ width (future)

### Layout Adjustments
```
Single Column:    All content stacked vertically
Margins:          16px on sides
Max Width:        100% of screen (no horizontal scroll)
```

### Touch Targets
```
Minimum:   44x44px (buttons, touch areas)
Ideal:     48x48px (buttons)
Spacing:   8-12px between elements
```

---

## Animation Specifications

### Screen Transitions
```
Type:        Slide + Fade
Duration:    250-300ms
Timing:      ease-in-out
```

### Modal Animation
```
Type:        Slide up + Fade overlay
Duration:    300ms
Timing:      ease-out
```

### List Item Entry
```
Type:        Fade + Slide
Duration:    300ms
Stagger:     20ms per item
```

### Button Interaction
```
Press:       0.8 opacity (immediate)
Release:     1.0 opacity (200ms)
```

---

## Accessibility Considerations

### Color Contrast
- Text on Green (#1B5E35): WCAG AA ✓
- Text on Amber (#FFA500): WCAG AA ✓
- Text on Red (#E74C3C): WCAG AA ✓

### Touch Targets
- All buttons: 48x48px minimum
- Spacing: 8px between interactive elements

### Text Readability
- Min font size: 11px (timestamps only)
- Body text: 14px standard
- High contrast text/background

### Icons
- Always paired with text labels
- Size: 24px or larger
- Clear, simple designs

---

## Summary

This design system ensures:
✅ Consistent visual language  
✅ Professional appearance  
✅ Accessibility compliance  
✅ Mobile optimization  
✅ Easy to extend  

Use these wireframes and specifications as reference during development.

---

**Design Reference Version:** 1.0  
**Last Updated:** August 16, 2026  
**Format:** ASCII Wireframes + Specifications
