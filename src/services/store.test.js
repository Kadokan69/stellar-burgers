import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import { expect, test, describe } from '@jest/globals';

describe('rootReducer', () => {
  let store;

  beforeEach(() => {
    // Создаем store с использованием rootReducer
    store = configureStore({
      reducer: rootReducer
    });
  });

  test('Проверяем начальное состояние при отправке неизвестного действия', () => {
    const initialState = store.getState();  
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = rootReducer(undefined, action);  
    expect(nextState).toEqual(initialState);
  });

  test('Проверяем начальное состояние для каждого слайса', () => {
    const state = store.getState();

    expect(state.ingredients).toEqual({
      isLoading: false,
      ingredients: []
    });

    expect(state.feed).toEqual({
      isLoading: false,
      feed: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      order: [],
      total: 0,
      totalToday: 0
    });

    expect(state.getConstructorBurger).toEqual({
      isLoading: false,
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      error: null
    });

    expect(state.user).toEqual({
      user: {
        email: '',
        name: ''
      },
      isAuthChecked: false,
      isAuthenticated: false,
      loginUserError: '',
      loginUserRequest: false
    });

    expect(state.orderData).toEqual({
      name: null,
      orderRequest: false,
      orderModalData: null,
      orders: [],
      orderProfile: []
    });
  });
});
