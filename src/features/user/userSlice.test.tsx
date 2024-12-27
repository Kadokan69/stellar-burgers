import reducer, {
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  logoutUserThunk
} from './userSlice';

import { expect, test, describe } from '@jest/globals';

// Мокаем Сookie
jest.mock('../../utils/cookie');

beforeEach(() => {
  // Мокаем localStorage
  global.localStorage = {
    length: 0,
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn((index: number) => null),
  };
});

describe('userSlice', () => {
  const initialState = {
    user: {
      email: '',
      name: ''
    },
    isAuthChecked: false,
    isAuthenticated: false,
    loginUserError: '',
    loginUserRequest: false
  };

  describe('loginUserThunk', () => {
    test('Проверка loginUserThunk.pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserError).toBe('');
    });

    test('Проверка loginUserThunk.rejected', () => {
      const action = { type: loginUserThunk.rejected.type };
      const state = reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.loginUserError).toBe(
        'Указан неверный адрес электронной почты или пароль'
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });

    test('Проверка loginUserThunk.fulfilled', () => {
      const mockPayload = {
        user: { email: 'test@test.ru', name: 'Test' },
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken'
      };

      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: mockPayload
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.loginUserError).toBe('');
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('registerUserThunk', () => {
    test('Проверка registerUserThunk.fulfilled', () => {
      const mockPayload = {
        user: { email: 'test@test.ru', name: 'Test' },
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken'
      };

      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: mockPayload
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('getUserThunk', () => {
    test('Проверка getUserThunk.fulfilled', () => {
      const mockPayload = {
        user: { email: 'test@test.ru', name: 'Test' }
      };

      const action = {
        type: getUserThunk.fulfilled.type,
        payload: mockPayload
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('Проверка getUserThunk.rejected', () => {
      const action = { type: getUserThunk.rejected.type };
      const state = reducer(initialState, action);

      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('logoutUserThunk', () => {
    test('Проверка logoutUserThunk.fulfilled', () => {
      const modifiedState = {
        ...initialState,
        user: { email: 'test@test.ru', name: 'Test' },
        isAuthenticated: true
      };

      const action = { type: logoutUserThunk.fulfilled.type };
      const state = reducer(modifiedState, action);

      expect(state.user).toEqual({ email: '', name: '' });
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
