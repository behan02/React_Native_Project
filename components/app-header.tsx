import { logout } from '@/store/slices/authSlice';
import type { RootState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function AppHeader() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s: RootState) => s.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.header}>
      <View style={styles.userInfo}>
        <Feather name="user" size={18} color="#000000" />
        <ThemedText type="defaultSemiBold" style={styles.username}>
          {user?.firstName || user?.username || 'User'}
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={handleLogout} style={styles.iconButton}>
          <Feather name="log-out" size={18} color="#000" />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
});
