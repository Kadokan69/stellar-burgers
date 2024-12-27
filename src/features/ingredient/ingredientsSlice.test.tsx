import reducer, { fetchIngredientsData, initialState } from './ingredientsSlice';
import { expect, test, describe } from '@jest/globals';

describe('ingredientsSlice reducer', () => {

  test('Проверка fetchIngredientsData.pending', () => {
    const action = { type: fetchIngredientsData.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('Проверка fetchIngredientsData.rejected', () => {
    const action = { type: fetchIngredientsData.rejected.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('Проверка fetchIngredientsData.fulfilled', () => {
    const mockPayload = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];

    const action = {
      type: fetchIngredientsData.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.ingredients).toEqual(mockPayload);
  });
});
