import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { toggleFavourite } from '@/store/slices/itemsSlice';
import type { RootState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

// Helper function to get exercise icon based on muscle group
const getExerciseIcon = (muscle: string, index: number) => {
  const icons: { [key: string]: string } = {
    abdominals: '💪',
    abductors: '🦵',
    adductors: '🦵',
    biceps: '💪',
    calves: '🦶',
    chest: '🫀',
    forearms: '✊',
    glutes: '🍑',
    hamstrings: '🦵',
    lats: '🏋️',
    lower_back: '🔙',
    middle_back: '🔙',
    neck: '🧘',
    quadriceps: '🦵',
    traps: '💪',
    triceps: '💪',
  };
  return icons[muscle?.toLowerCase()] || ['🏋️', '🤸', '🚴', '🏃', '⛹️', '🤾', '🧗', '🏊'][index % 8];
};

// Helper function to get icon background color based on muscle group
const getIconBackgroundColor = (muscle: string) => {
  const colors: { [key: string]: string } = {
    abdominals: '#E8F5E9',
    abductors: '#F3E5F5',
    adductors: '#F3E5F5',
    biceps: '#E8F5E9',
    calves: '#FFF3E0',
    chest: '#FFEBEE',
    forearms: '#E3F2FD',
    glutes: '#FCE4EC',
    hamstrings: '#F3E5F5',
    lats: '#E8F5E9',
    lower_back: '#FFF9C4',
    middle_back: '#FFF9C4',
    neck: '#E0F2F1',
    quadriceps: '#F3E5F5',
    traps: '#E8F5E9',
    triceps: '#E8F5E9',
  };
  return colors[muscle?.toLowerCase()] || '#E8F5E9';
};

export default function FavouritesScreen() {
  const items = useAppSelector((s: RootState) => s.items.items) as any[];
  const favourites = useAppSelector((s: RootState) => s.items.favourites) as number[];
  const dispatch = useAppDispatch();
  const router = useRouter();

  const favItems = items.filter((i) => favourites.includes(i.id));

  return (
    <ThemedView style={styles.container}>
      {favItems.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyEmoji}>♡</ThemedText>
          <ThemedText style={styles.emptyTitle}>No Favourites Yet</ThemedText>
          <ThemedText style={styles.emptyText}>Start adding exercises to your favourites!</ThemedText>
        </View>
      ) : (
        <FlatList
          data={favItems}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={[styles.listContent, { paddingTop: 20 }]}
          ListHeaderComponent={
            <View style={styles.headerSection}>
              <ThemedText type="title" style={styles.pageTitle}>♥️ My Favourites</ThemedText>
              <ThemedText style={styles.pageSubtitle}>{favItems.length} saved exercise{favItems.length !== 1 ? 's' : ''}</ThemedText>
            </View>
          }
          renderItem={({ item, index }) => {
            const exerciseIcon = getExerciseIcon(item.muscle, index);
            const iconBgColor = getIconBackgroundColor(item.muscle);
            return (
            <Pressable onPress={() => router.push(`/details/${item.id}` as any)} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
                  <ThemedText style={styles.iconEmoji}>{exerciseIcon}</ThemedText>
                </View>
                <Pressable onPress={() => dispatch(toggleFavourite(item.id))} style={styles.favoriteButton}>
                  <Feather name="heart" size={22} color="#e91e63" fill="#e91e63" />
                </Pressable>
              </View>
              <View style={styles.cardContent}>
                <ThemedText type="subtitle" style={styles.cardTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.exerciseInfo} numberOfLines={1}>{item.description}</ThemedText>
                {item.equipment && (
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>📦 {item.equipment}</ThemedText>
                  </View>
                )}
              </View>
            </Pressable>
          )}}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listContent: { padding: 16 },
  headerSection: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  favoriteButton: {
    padding: 8,
  },
  cardContent: {
    gap: 6,
  },
  cardTitle: {
    color: '#000',
  },
  exerciseInfo: {
    fontSize: 13,
    color: '#000',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    color: '#1976D2',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});
