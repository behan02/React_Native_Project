# FitBuddy - Health & Wellness Mobile App

A React Native mobile application built with Expo for tracking health and wellness activities. This app features user authentication, API integration, state management with Redux Toolkit, and persistent favourites.

## Features

- **User Authentication**: Login and registration with form validation (Formik + Yup)
- **Dynamic Item List**: Browse health & wellness items fetched from API
- **Favourites**: Mark items as favourites and persist them locally
- **State Management**: Redux Toolkit for global state
- **Navigation**: Expo Router with tab and stack navigation
- **Dark Mode**: Toggle between light and dark themes with persistence
- **API Integration**: DummyJSON API for authentication and data

## Tech Stack

- React Native (via Expo)
- TypeScript
- Redux Toolkit
- Expo Router
- Formik + Yup (form validation)
- AsyncStorage (local persistence)
- Axios (API calls)
- Feather Icons

## Get Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI (optional, uses npx)

### Installation

1. **Install dependencies**

   ```powershell
   npm install --legacy-peer-deps
   ```

2. **Start the development server**

   ```powershell
   npx expo start
   ```

3. **Run on your device**

   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## Test Credentials

The app uses DummyJSON for authentication. Use these test credentials:

- **Username**: `kminchelle`
- **Password**: `0lelplR`

## Project Structure

```
├── app/
│   ├── _layout.tsx           # Root layout with Redux Provider
│   ├── login.tsx              # Login screen
│   ├── register.tsx           # Registration screen
│   └── (tabs)/
│       ├── _layout.tsx        # Tab navigation layout
│       ├── index.tsx          # Home screen (items list)
│       ├── favourites.tsx     # Favourites screen
│       ├── explore.tsx        # Explore screen
│       └── details/[id].tsx   # Item details screen
├── components/
│   ├── app-header.tsx         # Header with username & dark mode toggle
│   ├── themed-text.tsx        # Themed text component
│   └── themed-view.tsx        # Themed view component
├── store/
│   ├── store.ts               # Redux store configuration
│   └── slices/
│       ├── authSlice.ts       # Authentication state
│       ├── itemsSlice.ts      # Items & favourites state
│       └── themeSlice.ts      # Theme state
├── services/
│   └── api.ts                 # API service (Axios)
└── constants/
    └── theme.ts               # Theme colors
```

## Key Features Implementation

### Authentication
- Login/register screens with Formik validation
- Token stored in AsyncStorage
- Auto-redirect to login when not authenticated
- Username displayed in app header

### State Management
- Redux Toolkit for centralized state
- Typed hooks (`useAppDispatch`, `useAppSelector`)
- Async thunks for API calls and persistence

### Favourites
- Toggle favourite status on items
- Persist favourites in AsyncStorage
- View all favourites in dedicated tab

### Dark Mode
- Theme toggle in app header
- Preference saved to AsyncStorage
- Automatic theme restoration on app launch

## API Documentation

This app uses [DummyJSON](https://dummyjson.com) for:
- **Authentication**: `/auth/login`
- **Data**: `/products` (mapped to health/wellness items)

## Development

### Run Linter

```powershell
npm run lint
```

### TypeScript Check

TypeScript is configured with strict mode. Check `tsconfig.json` for settings.

## Best Practices

- ✅ Feature-based commits
- ✅ Form validation with Yup
- ✅ Modular, reusable components
- ✅ TypeScript for type safety
- ✅ Secure token storage
- ✅ Persistent state management

## Future Enhancements

- Integration with real fitness/wellness APIs
- Exercise tracking
- Water intake monitoring
- Progress charts and analytics
- Social features (share workouts)
- Push notifications for reminders

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## License

This project is for educational purposes as part of Mobile Application Development coursework.
