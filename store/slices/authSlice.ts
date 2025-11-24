import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  error?: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.login(payload.username, payload.password);
      
      // DummyJSON returns: { id, username, email, firstName, lastName, gender, image, accessToken, refreshToken }
      const { accessToken, id, username, firstName, lastName, email, gender, image } = res;
      
      if (!accessToken) {
        console.error('No token in response:', res);
        return rejectWithValue('No token received from server');
      }
      
      const user = {
        id,
        username,
        firstName,
        lastName,
      };
      
      await AsyncStorage.setItem('AUTH_TOKEN', accessToken);
      await AsyncStorage.setItem('AUTH_USER', JSON.stringify(user));
      return { user, token: accessToken };
    } catch (err: any) {
      console.error('Login error:', err);
      return rejectWithValue(err?.response?.data?.message || err?.message || 'Login failed');
    }
  }
);

export const loadAuth = createAsyncThunk('auth/load', async () => {
  try {
    const token = await AsyncStorage.getItem('AUTH_TOKEN');
    const userJson = await AsyncStorage.getItem('AUTH_USER');
    const user = userJson ? JSON.parse(userJson) : null;
    return { token, user } as { token: string | null; user: User | null };
  } catch (error) {
    // If there's any error reading from storage, return null values
    return { token: null, user: null };
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('AUTH_TOKEN');
  await AsyncStorage.removeItem('AUTH_USER');
  return true;
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(loadAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default slice.reducer;
