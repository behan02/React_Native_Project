import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Item = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

type ItemsState = {
  items: Item[];
  status: 'idle' | 'loading' | 'failed';
  error?: string | null;
  favourites: number[];
};

const initialState: ItemsState = {
  items: [],
  status: 'idle',
  error: null,
  favourites: [],
};

export const fetchItems = createAsyncThunk('items/fetch', async () => {
  const res = await api.fetchItems();
  // map exercises API response to Item[]
  // Each exercise has: name, type, muscle, equipment, difficulty, instructions
  return res.map((exercise: any, index: number) => ({
    id: index + 1,
    title: exercise.name,
    description: `${exercise.type} • ${exercise.muscle} • ${exercise.difficulty}`,
    details: exercise.instructions,
    equipment: exercise.equipment,
    difficulty: exercise.difficulty,
  }));
});

export const loadFavourites = createAsyncThunk('items/loadFaves', async () => {
  const favs = await AsyncStorage.getItem('FAVS');
  return favs ? JSON.parse(favs) : [];
});

export const toggleFavourite = createAsyncThunk('items/toggleFav', async (id: number, { getState }) => {
  const state = getState() as any;
  const current: number[] = state.items.favourites || [];
  const exists = current.includes(id);
  const next = exists ? current.filter((x) => x !== id) : [...current, id];
  await AsyncStorage.setItem('FAVS', JSON.stringify(next));
  return next;
});

const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load items';
      })
      .addCase(loadFavourites.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.favourites = action.payload;
      })
      .addCase(toggleFavourite.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.favourites = action.payload;
      });
  },
});

export default slice.reducer;
