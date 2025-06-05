import reducer, {
  resetOrder,
  orderThunk,
  getOrdersThunk,
  getOrderByNumberThunk,
  initialState
} from './orderSlice';
import { expect, test, describe } from '@jest/globals';

describe('orderSlice', () => {

  test('Проверка orderThunk.pending', () => {
    const action = { type: orderThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(true);
  });

  test('Проверка orderThunk.rejected', () => {
    const action = { type: orderThunk.rejected.type };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
  });

  test('Проверка orderThunk.fulfilled', () => {
    const mockPayload = {
      order: { id: '1', name: 'Test' },
      name: 'Test'
    };

    const action = { type: orderThunk.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);

    expect(state.orderModalData).toEqual(mockPayload.order);
    expect(state.name).toBe(mockPayload.name);
    expect(state.orderRequest).toBe(false);
  });

  test('Проверка getOrdersThunk.fulfilled', () => {
    const mockPayload = [
      { id: '1', name: 'Order 1' },
      { id: '2', name: 'Order 2' }
    ];

    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.orders).toEqual(mockPayload);
    expect(state.orderRequest).toBe(false);
  });

  test('Проверка getOrderByNumberThunk.fulfilled', () => {
    const mockPayload = {
      orders: [{ id: '1', name: 'Profile Order 1' }]
    };

    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.orderProfile).toEqual(mockPayload.orders);
    expect(state.orderRequest).toBe(false);
  });

  test('Проверка resetOrder', () => {
    const modifiedState = {
      ...initialState,
      orderModalData: {
        createdAt: '2024-12-27T07:31:42.481Z',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e'
        ],
        name: 'Флюоресцентный люминесцентный бургер',
        number: 64420,
        owner: '67521c46e367de001daf72d1',
        status: 'done',
        updatedAt: '2024-12-27T07:31:43.538Z',
        _id: '676e57de750864001d376336'
      },
      orderRequest: true
    };

    const state = reducer(modifiedState, resetOrder());

    expect(state.orderModalData).toBeNull();
    expect(state.orderRequest).toBe(false);
  });
});
