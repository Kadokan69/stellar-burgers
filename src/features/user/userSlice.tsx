import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'user/registerUserThunk',
  async (user: TRegisterData) => registerUserApi(user)
);

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isInit = true;
      state.isLoading = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = payload.user;
      localStorage.setItem('token', payload.accessToken);
    });
  }
});

export const { init } = userSlice.actions;

export default userSlice.reducer;
