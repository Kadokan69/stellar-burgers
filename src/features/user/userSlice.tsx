import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
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

// export const loginUserThunk = createAsyncThunk(
//   'user/loginUserThunk',
//   async (user: TLoginData) =>
//     loginUserApi(user).then((res) => {
//       setCookie('accessToken', res.accessToken);
//       localStorage.setItem('refreshToken', res.refreshToken);
//     })
// );

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

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser;
  error: string | null;
  userLogin: boolean;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  error: null,
  userLogin: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    userLogout: (state) => {
      state.user = {
        email: '',
        name: ''
      };
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
      setCookie('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isInit = true;
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = payload.user;
      state.userLogin = true;
    });
  }
});

export const { init, userLogout } = userSlice.actions;

export default userSlice.reducer;
