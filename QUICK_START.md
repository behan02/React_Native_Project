# 🚀 Quick Start Guide

## ⚡ 30-Second Setup

```powershell
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the app
npx expo start

# 3. Scan QR code with Expo Go app
```

## 🔑 Test Login

**Username:** `kminchelle`  
**Password:** `0lelplR`

## 📱 Run Options

| Key | Action |
|-----|--------|
| `a` | Open Android emulator |
| `i` | Open iOS simulator |
| `w` | Open in web browser |
| `r` | Reload app |
| `m` | Toggle dev menu |

## 🎯 Feature Checklist

- [x] Login/Register with validation
- [x] Browse 30+ wellness items
- [x] View item details
- [x] Add/remove favourites
- [x] Persistent favourites
- [x] Dark mode toggle
- [x] User info in header
- [x] Auto-login on app reopen

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/login.tsx` | Login screen |
| `app/(tabs)/index.tsx` | Home screen |
| `app/(tabs)/favourites.tsx` | Favourites list |
| `app/(tabs)/details/[id].tsx` | Item details |
| `store/store.ts` | Redux configuration |
| `services/api.ts` | API calls |

## 🐛 Quick Fixes

**App won't start?**
```powershell
npx expo start -c
```

**TypeScript errors?**
- They're warnings only - app runs fine!

**Can't connect?**
- Check same WiFi network
- Try tunnel mode: `npx expo start --tunnel`

## 📚 Documentation

- `README.md` - Full documentation
- `PROJECT_SUMMARY.md` - Implementation details
- `APP_STRUCTURE.md` - Visual diagrams
- `DEV_TIPS.md` - Troubleshooting
- `COMMIT_GUIDE.md` - Git workflow

## ✅ All Requirements Met

| Requirement | ✓ |
|------------|---|
| Authentication | ✅ |
| Navigation | ✅ |
| Home Screen | ✅ |
| State Management | ✅ |
| Favourites | ✅ |
| Styling | ✅ |
| **BONUS: Dark Mode** | ✅ |

## 🎓 Course Info

**Domain:** Health & Wellness  
**Framework:** React Native (Expo)  
**State:** Redux Toolkit  
**API:** DummyJSON  

---

**Ready to go!** 🎉
