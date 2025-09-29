import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../../shared/api/auth';
import type { AppDispatch, RootState } from '../../../app/store';
import type { AxiosError, AxiosInstance } from 'axios';

export interface AuthState {
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
};

type ThunkConfig = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};

type User = {
  username: string;
  password: string;
};

export const loginUser = createAsyncThunk<User, User>('auth/user', async (obj: User, thunkApi) => {
  const response = await authApi.login(obj.username, obj.password);
  return response.data as User;
});

export const registerUser = createAsyncThunk<User, User>(
  'auth/user',
  async (obj: User, thunkApi) => {
    try {
      const response = await authApi.register(obj.username, obj.password);
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/user', async (_, thunkApi) => {
  await authApi.logout();
});

export const getProfile = createAsyncThunk('auth/user', async (_, thunkApi) => {
  const response = await authApi.profile();
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {});
  },
});

export default authSlice.reducer;
