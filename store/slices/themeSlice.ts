import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  dark: boolean;
};

const initialState: ThemeState = { dark: false };

export const loadTheme = createAsyncThunk('theme/load', async () => {
  const stored = await AsyncStorage.getItem('THEME_DARK');
  return stored ? JSON.parse(stored) : false;
});

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<boolean>) {
      state.dark = action.payload;
      AsyncStorage.setItem('THEME_DARK', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTheme.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    });
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;
