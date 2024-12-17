import { loginUserApi, TLoginData } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

export const loginUserThunk = createAsyncThunk(
  'user/loginUserThunk',
  async (user: TLoginData) =>
    loginUserApi(user)
      .then((res) => {
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch(() => {
        console.log('Ошибка выполнения входа');
      })
);

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: null | unknown | string;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false
};

export const loginUserSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loginUserRequest = true;
      state.loginUserError = null;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.loginUserRequest = false;
      state.loginUserError = action.payload;
      state.isAuthChecked = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state) => {
      state.loginUserRequest = false;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
  }
});

export default loginUserSlice.reducer;
