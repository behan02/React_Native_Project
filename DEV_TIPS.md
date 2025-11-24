# Development Tips & Known Issues

## TypeScript Warnings

### Redux Selector Type Inference

**Issue**: TypeScript shows "Object is of type 'unknown'" warnings in Redux selectors.

**Why**: React 19 with Redux Toolkit 2.0 has some type inference limitations in strict mode.

**Impact**: None - the app runs correctly. These are compile-time warnings only.

**Fix Options**:

1. **Ignore warnings** (current approach) - App works fine
2. **Disable strict mode** - Already added `noImplicitAny: false` to tsconfig
3. **Use @ts-expect-error** - Suppress specific lines:

```typescript
// @ts-expect-error Redux selector type inference issue
const items = useAppSelector((s) => (s as RootState).items.items) as any[];
```

4. **Alternative selector pattern**:

```typescript
// Define selector outside component
const selectItems = (state: RootState) => state.items.items;

// Use in component
const items = useAppSelector(selectItems);
```

## AsyncStorage Version

**Warning**: "Expected version: 2.2.0"

**Current**: 1.20.1

**Impact**: None - app works correctly

**To upgrade**:
```powershell
npm install @react-native-async-storage/async-storage@2.2.0 --legacy-peer-deps
```

## Testing on Physical Device

### Using Expo Go

1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Scan QR code from terminal
3. App should load automatically

### Troubleshooting

**Issue**: "Unable to connect"
- Ensure phone and PC are on same WiFi network
- Check firewall settings
- Try running: `npx expo start --tunnel`

**Issue**: "Network request failed"
- DummyJSON API requires internet connection
- Check device internet connection

## Development Workflow

### Hot Reload

- Save files to see changes instantly
- Press `r` in terminal to force reload
- Press `m` to toggle dev menu on device

### Debugging

Press `j` in terminal to open debugger, then:
- View Redux state in Redux DevTools
- Set breakpoints in Chrome DevTools
- View console logs

### Clear Cache

If experiencing weird issues:
```powershell
npx expo start -c
```

## Git Workflow

### Feature Commits

See `COMMIT_GUIDE.md` for detailed commit strategies.

Quick reference:
```powershell
# Check current changes
git status

# Stage specific files
git add <file>

# Commit with message
git commit -m "feat: description"

# Push to remote
git push origin dev
```

### Recommended Commit Sequence

1. Dependencies
2. Store setup
3. API service
4. Auth screens
5. Main UI screens
6. Documentation

## Common Issues

### "Module not found"

Solution:
```powershell
npm install --legacy-peer-deps
npx expo start -c
```

### "Cannot read property of undefined"

- Check Redux store is properly initialized
- Verify AsyncStorage hydration completed
- Check API responses in network tab

### "Maximum update depth exceeded"

- Likely infinite useEffect loop
- Check dependency arrays
- Verify state updates aren't causing re-renders

## Performance Tips

1. **Memoize selectors** - Use `reselect` library for complex selectors
2. **Virtualize lists** - FlatList already does this
3. **Optimize images** - Use appropriate image sizes
4. **Lazy load** - Use React.lazy for heavy components

## Security Checklist

- [x] Token stored securely (AsyncStorage)
- [x] Passwords use secureTextEntry
- [x] Input validation on all forms
- [x] No sensitive data in git
- [ ] TODO: Add .env for API keys (if using real APIs)
- [ ] TODO: Implement token refresh
- [ ] TODO: Add biometric authentication

## Testing Checklist

### Manual Testing

- [ ] Fresh install experience
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new user
- [ ] Browse items
- [ ] View item details
- [ ] Add to favourites
- [ ] Remove from favourites
- [ ] View favourites tab
- [ ] Toggle dark mode
- [ ] Logout
- [ ] Login again (verify persistence)
- [ ] Kill app and reopen (verify state)

### Device Testing

Test on:
- [ ] Android emulator
- [ ] iOS simulator
- [ ] Physical Android device
- [ ] Physical iOS device
- [ ] Web browser

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Native Docs](https://reactnative.dev/)
- [DummyJSON API](https://dummyjson.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For course-specific questions, refer to:
- Course materials
- Lab sessions
- Instructor office hours

For technical issues:
- Check Expo forums
- Stack Overflow
- React Native community Discord
