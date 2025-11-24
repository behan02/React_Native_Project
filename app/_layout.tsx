import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { Provider } from 'react-redux';

import { loadAuth } from '@/store/slices/authSlice';
import { fetchItems, loadFavourites } from '@/store/slices/itemsSlice';
import { loadTheme } from '@/store/slices/themeSlice';
import store, { useAppDispatch, useAppSelector } from '@/store/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootAppInner() {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((s) => s.theme.dark);

  useEffect(() => {
    dispatch(loadAuth());
    dispatch(loadFavourites());
    dispatch(fetchItems());
    dispatch(loadTheme());
  }, [dispatch]);

  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootAppInner />
    </Provider>
  );
}
