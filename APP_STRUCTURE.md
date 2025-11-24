# FitBuddy - Visual App Structure

## 🎯 App Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     App Launch                               │
│                         ↓                                    │
│              Load Auth from Storage                          │
│                         ↓                                    │
│                  ┌─────────────┐                            │
│                  │ Authenticated?│                           │
│                  └──────┬───────┘                            │
│                         │                                    │
│            ┌────────────┴────────────┐                      │
│            │                         │                      │
│          NO│                        YES│                    │
│            ↓                         ↓                      │
│    ┌──────────────┐         ┌──────────────┐              │
│    │ Login Screen │         │  Tab Layout  │              │
│    │              │         │              │              │
│    │ - Username   │         │ ┌──────────┐ │              │
│    │ - Password   │         │ │  Header  │ │              │
│    │ - Sign In Btn│         │ │  - User  │ │              │
│    │ - Register   │         │ │  - Theme │ │              │
│    └──────┬───────┘         │ │  Toggle  │ │              │
│           │                 │ └──────────┘ │              │
│           │                 │              │              │
│           │ Success         │ ┌──────────┐ │              │
│           └─────────────────┼→│   Home   │ │              │
│                             │ │  Screen  │ │              │
│    ┌──────────────┐         │ └────┬─────┘ │              │
│    │Register      │         │      │       │              │
│    │Screen        │         │      │Tap Item              │
│    │              │         │      ↓       │              │
│    │ - Username   │         │ ┌──────────┐ │              │
│    │ - Password   │         │ │ Details  │ │              │
│    │ - Create Btn │         │ │  Screen  │ │              │
│    └──────────────┘         │ └──────────┘ │              │
│                             │              │              │
│                             │ ┌──────────┐ │              │
│                             │ │Favourites│ │              │
│                             │ │  Screen  │ │              │
│                             │ └──────────┘ │              │
│                             │              │              │
│                             │ ┌──────────┐ │              │
│                             │ │ Explore  │ │              │
│                             │ │  Screen  │ │              │
│                             │ └──────────┘ │              │
│                             └──────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Screen Breakdown

### 1. Login Screen (`app/login.tsx`)

```
┌────────────────────────────┐
│      FitBuddy             │
│   Sign in to continue     │
│                           │
│  ┌─────────────────────┐ │
│  │ Username: kminchel… │ │
│  └─────────────────────┘ │
│                           │
│  ┌─────────────────────┐ │
│  │ Password: ••••••••  │ │
│  └─────────────────────┘ │
│                           │
│  ┌─────────────────────┐ │
│  │     Sign In         │ │
│  └─────────────────────┘ │
│                           │
│  ┌─────────────────────┐ │
│  │     Register        │ │
│  └─────────────────────┘ │
└────────────────────────────┘
```

### 2. Home Screen (`app/(tabs)/index.tsx`)

```
┌────────────────────────────┐
│ 👤 John | ☀️ | 🚪         │ ← Header
├────────────────────────────┤
│                           │
│ ┌───────────────────────┐│
│ │ [IMG]  Product Title ││
│ │        Description... ││
│ │        ❤️            ││
│ └───────────────────────┘│
│                           │
│ ┌───────────────────────┐│
│ │ [IMG]  Product Title ││
│ │        Description... ││
│ │        🤍            ││
│ └───────────────────────┘│
│                           │
│ ┌───────────────────────┐│
│ │ [IMG]  Product Title ││
│ │        Description... ││
│ │        ❤️            ││
│ └───────────────────────┘│
│                           │
├────────────────────────────┤
│ 🏠 Home | ❤️ Favs | 🔍   │ ← Tabs
└────────────────────────────┘
```

### 3. Details Screen (`app/(tabs)/details/[id].tsx`)

```
┌────────────────────────────┐
│ 👤 John | ☀️ | 🚪         │
├────────────────────────────┤
│ ┌────────────────────────┐│
│ │                        ││
│ │    [Large Image]       ││
│ │                        ││
│ └────────────────────────┘│
│                           │
│  Product Title            │
│                           │
│  This is a detailed       │
│  description of the       │
│  product with more        │
│  information about it.    │
│                           │
│ ┌─────────────────────┐  │
│ │ Add to Favourites   │  │
│ └─────────────────────┘  │
│                           │
├────────────────────────────┤
│ 🏠 Home | ❤️ Favs | 🔍   │
└────────────────────────────┘
```

### 4. Favourites Screen (`app/(tabs)/favourites.tsx`)

```
┌────────────────────────────┐
│ 👤 John | ☀️ | 🚪         │
├────────────────────────────┤
│                           │
│ ┌───────────────────────┐│
│ │ [IMG]  Saved Item    ││
│ │        Description... ││
│ │        ❤️            ││
│ └───────────────────────┘│
│                           │
│ ┌───────────────────────┐│
│ │ [IMG]  Saved Item    ││
│ │        Description... ││
│ │        ❤️            ││
│ └───────────────────────┘│
│                           │
│       (Empty state       │
│    if no favourites)     │
│                           │
├────────────────────────────┤
│ 🏠 Home | ❤️ Favs | 🔍   │
└────────────────────────────┘
```

## 🔄 Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                     User Actions                          │
└────────────┬─────────────────────────────────────────────┘
             │
             ↓
┌────────────────────────────────────────────────────────┐
│                  React Components                       │
│  (Login, Home, Details, Favourites)                    │
└────────────┬───────────────────────────────────────────┘
             │
             │ dispatch(action)
             ↓
┌────────────────────────────────────────────────────────┐
│                  Redux Store                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   Auth   │  │  Items   │  │  Theme   │           │
│  │  Slice   │  │  Slice   │  │  Slice   │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │             │              │                  │
│       │ Thunks      │ Thunks       │ Sync            │
└───────┼─────────────┼──────────────┼─────────────────┘
        │             │              │
        ↓             ↓              ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│    API     │  │    API     │  │AsyncStorage│
│  (Login)   │  │ (Products) │  │  (Theme)   │
└────────────┘  └────────────┘  └────────────┘
                      ↓
              ┌───────────────┐
              │ AsyncStorage  │
              │  (Favourites) │
              └───────────────┘
```

## 🗂️ State Structure

```javascript
{
  auth: {
    user: {
      id: 1,
      username: "kminchelle",
      firstName: "Jeanne",
      lastName: "Halvorson"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    status: "idle" | "loading" | "failed",
    error: null | string
  },
  
  items: {
    items: [
      {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile...",
        image: "https://..."
      },
      // ... more items
    ],
    status: "idle" | "loading" | "failed",
    error: null | string,
    favourites: [1, 5, 12, 23] // item IDs
  },
  
  theme: {
    dark: false
  }
}
```

## 🎨 Component Hierarchy

```
App (_layout.tsx)
└─ Redux Provider
   └─ Theme Provider
      └─ Stack Navigator
         ├─ Login Screen
         ├─ Register Screen
         └─ Tab Navigator
            ├─ App Header (Custom)
            │  ├─ User Info
            │  ├─ Theme Toggle
            │  └─ Logout Button
            │
            └─ Tabs
               ├─ Home Tab
               │  └─ Item Cards (FlatList)
               │     ├─ Image
               │     ├─ Title
               │     ├─ Description
               │     └─ Favourite Icon
               │
               ├─ Favourites Tab
               │  └─ Saved Items (FlatList)
               │
               ├─ Explore Tab
               │  └─ (Starter content)
               │
               └─ Details Screen (Hidden from tabs)
                  ├─ Large Image
                  ├─ Title
                  ├─ Full Description
                  └─ Favourite Button
```

## 🔐 Authentication Flow

```
User Opens App
     ↓
Load Token from AsyncStorage
     ↓
Token Exists?
     ├─ YES → Navigate to Tabs
     └─ NO  → Navigate to Login
              ↓
         User Enters Credentials
              ↓
         POST to /auth/login
              ↓
         Success?
              ├─ YES → Save Token
              │        ↓
              │     Navigate to Tabs
              │        ↓
              │     Show Username in Header
              │
              └─ NO  → Show Error
                       ↓
                    Retry Login
```

## 💾 Data Persistence

```
┌─────────────────────────────────────┐
│        AsyncStorage Keys             │
├─────────────────────────────────────┤
│ AUTH_TOKEN    : "eyJhbGci..."       │
│ AUTH_USER     : '{"id":1,...}'      │
│ FAVS          : '[1,5,12,23]'       │
│ THEME_DARK    : 'false'             │
└─────────────────────────────────────┘
```

## 📞 API Endpoints Used

```
┌─────────────────────────────────────────────────┐
│ DummyJSON API (https://dummyjson.com)         │
├─────────────────────────────────────────────────┤
│ POST /auth/login                                │
│   Body: { username, password }                  │
│   Returns: { token, ...user }                   │
│                                                 │
│ GET /products?limit=30                          │
│   Returns: { products: [...], total, ... }     │
└─────────────────────────────────────────────────┘
```

## 🎯 User Journey

1. **First Launch**
   - App checks AsyncStorage for token
   - No token found → Redirect to Login
   - User sees login form with test credentials pre-filled

2. **Login**
   - User taps "Sign In"
   - Formik validates inputs
   - API request sent
   - Token saved to AsyncStorage
   - Navigate to Home

3. **Browse Items**
   - Home screen shows 30 products
   - User scrolls through list
   - Each card shows image, title, description

4. **View Details**
   - User taps an item card
   - Navigate to Details screen
   - Shows full information

5. **Add Favourite**
   - User taps heart icon
   - Item ID added to favourites array
   - Saved to AsyncStorage
   - Heart icon fills with color

6. **View Favourites**
   - User taps Favourites tab
   - See all saved items
   - Can remove by tapping heart

7. **Toggle Theme**
   - User taps sun/moon icon in header
   - Theme switches instantly
   - Preference saved to AsyncStorage

8. **Logout**
   - User taps logout icon
   - Token removed from AsyncStorage
   - Redirect to Login

9. **Re-open App**
   - Token loaded from AsyncStorage
   - Auto-login to Home
   - Favourites and theme restored

---

This visual guide provides a complete overview of the FitBuddy app structure and flow!
