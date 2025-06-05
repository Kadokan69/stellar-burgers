import reducer, { fetchFeedData, initialState } from './feedSlice';
import { expect, test, describe } from '@jest/globals';

describe('feedSlice reducer', () => {

  test('Проверка fetchFeedData.pending', () => {
    const action = { type: fetchFeedData.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  test('Проверка fetchFeedData.rejected', () => {
    const action = { type: fetchFeedData.rejected.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  test('Проверка fetchFeedData.fulfilled', () => {
    const mockPayload = {
      orders: [
        { id: '1', name: 'Order 1' },
        { id: '2', name: 'Order 2' }
      ],
      total: 100,
      totalToday: 20
    };

    const action = { type: fetchFeedData.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.feed).toEqual(mockPayload);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
    expect(state.order).toEqual(mockPayload.orders);
  });
});
