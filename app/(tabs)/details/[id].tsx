import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { toggleFavourite } from '@/store/slices/itemsSlice';
import type { RootState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

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

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const item = useAppSelector((s: RootState) => s.items.items.find((i: any) => String(i.id) === String(id)));
  const favs = useAppSelector((s: RootState) => s.items.favourites) as number[];

  if (!item) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Exercise not found</ThemedText>
        <Button title="Back" onPress={() => router.back()} />
      </ThemedView>
    );
  }

  const isFav = favs.includes(item.id);
  const items = useAppSelector((s: RootState) => s.items.items) as any[];
  const itemIndex = items.findIndex((i: any) => String(i.id) === String(id));
  const muscle = (item as any)?.muscle ?? (item as any)?.muscleGroup ?? (item as any)?.bodyPart ?? '';
  const exerciseIcon = getExerciseIcon(String(muscle), itemIndex);
  const iconBgColor = getIconBackgroundColor(String(muscle));

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={[styles.iconCircleLarge, { backgroundColor: iconBgColor }]}>
          <ThemedText style={styles.iconEmojiLarge}>{exerciseIcon}</ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={styles.subtitle}>{item.description}</ThemedText>
      </View>

      <View style={styles.content}>
        {(item as any).equipment && (
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoLabel}>📦 Equipment</ThemedText>
            <ThemedText style={styles.infoValue}>{(item as any).equipment}</ThemedText>
          </View>
        )}

        {(item as any).difficulty && (
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoLabel}>🔥 Difficulty</ThemedText>
            <ThemedText style={styles.infoValue}>{(item as any).difficulty}</ThemedText>
          </View>
        )}

        {(item as any).details && (
          <View style={styles.instructionsCard}>
            <ThemedText style={styles.sectionTitle}>📝 Instructions</ThemedText>
            <ThemedText style={styles.instructions}>{(item as any).details}</ThemedText>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={isFav ? 'Remove from Favourites ♥️' : 'Add to Favourites ♡'}
            onPress={() => dispatch(toggleFavourite(item.id))}
            color={isFav ? '#e91e63' : '#4CAF50'}
          />
        </View>
      </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircleLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconEmojiLarge: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textTransform: 'capitalize',
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 22,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
