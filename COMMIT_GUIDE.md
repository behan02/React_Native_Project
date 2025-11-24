# Git Commit Guide for Feature-Based Development

This document provides recommended commit messages for the FitBuddy project features.

## Suggested Commit Sequence

### 1. Project Setup
```bash
git add package.json tsconfig.json
git commit -m "feat: add project dependencies for Redux, auth, and API integration"
```

### 2. State Management
```bash
git add store/
git commit -m "feat: implement Redux store with auth, items, and theme slices"
```

### 3. API Service
```bash
git add services/api.ts
git commit -m "feat: add API service for authentication and data fetching"
```

### 4. Authentication
```bash
git add app/login.tsx app/register.tsx
git commit -m "feat: implement login and registration screens with validation"
```

### 5. Root Layout & Auth Flow
```bash
git add app/_layout.tsx
git commit -m "feat: integrate Redux Provider and auth-based routing"
```

### 6. UI Components
```bash
git add components/app-header.tsx
git commit -m "feat: add app header with user info and dark mode toggle"
```

### 7. Home Screen
```bash
git add app/(tabs)/index.tsx app/(tabs)/_layout.tsx
git commit -m "feat: implement home screen with item list and favourites"
```

### 8. Details & Favourites
```bash
git add app/(tabs)/details/ app/(tabs)/favourites.tsx
git commit -m "feat: add details and favourites screens"
```

### 9. Documentation
```bash
git add README.md COMMIT_GUIDE.md
git commit -m "docs: add comprehensive README and commit guide"
```

## Commit Message Format

Follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Example Workflow

```powershell
# Stage specific files
git add store/slices/authSlice.ts

# Commit with descriptive message
git commit -m "feat: add authentication slice with login and logout"

# Push to remote
git push origin dev
```

## Best Practices

1. **Atomic commits**: Each commit should represent one logical change
2. **Descriptive messages**: Explain what and why, not how
3. **Test before commit**: Ensure code runs without errors
4. **Review changes**: Use `git diff` before committing
5. **Keep commits small**: Easier to review and revert if needed

## Current Branch

The project is on the `dev` branch. Remember to:
- Make feature commits on `dev`
- Merge to `master` when features are stable
- Tag releases appropriately
