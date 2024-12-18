import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'user/registerUserThunk',
  async (user: TRegisterData) => registerUserApi(user)
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUserThunk',
  async (user: TLoginData) => loginUserApi(user)
);

export const getUserThunk = createAsyncThunk('user/getUserThunk', async () =>
  getUserApi()
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUserThunk',
  async () =>
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      })
);

type TUserState = {
  user: TUser;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: string | undefined;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: '',
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loginUserRequest = true;
      state.isAuthChecked = true;
      state.loginUserError = '';
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.loginUserRequest = false;
      state.loginUserError =
        'Указан неверный адрес электронной почты или пароль';
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      setCookie('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      state.user = payload.user;
      state.loginUserError = '';
      state.loginUserRequest = false;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isAuthChecked = true;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.user = payload.user;
      setCookie('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.isAuthChecked = false;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.user = payload.user;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = { email: '', name: '' };
      localStorage.clear();
      deleteCookie('accessToken');
      state.isAuthenticated = false;
    });
  }
});

export default userSlice.reducer;
