import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderThunk = createAsyncThunk(
  'order/orderThunk',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrdersThunk = createAsyncThunk(
  'order/getOrdersThunk',
  async () => getOrdersApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumberThunk',
  async (id: number) => getOrderByNumberApi(id)
);

type TNewOrderResponse = {
  order: TOrder | null;
  name: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
  orderItem: TOrder[];
};

const initialState: TNewOrderResponse = {
  order: null,
  name: null,
  orderRequest: false,
  orderModalData: null,
  orders: [],
  orderItem: []
};

export const userSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderThunk.pending, (state) => {
      console.log('Загрузка...');
      state.orderRequest = true;
    });
    builder.addCase(orderThunk.rejected, (state) => {
      console.log('Ошибка');
    });
    builder.addCase(orderThunk.fulfilled, (state, action) => {
      state.order = action.payload.order;
      state.name = action.payload.name;
      state.orderRequest = false;
    });
    builder.addCase(getOrdersThunk.pending, (state) => {
      console.log('Загрузка...');
    });
    builder.addCase(getOrdersThunk.rejected, (state) => {
      console.log('Ошибка');
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      console.log('Загрузка...');
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state) => {
      console.log('Ошибка');
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
      state.orderItem = action.payload.orders;
    });
  }
});

export default userSlice.reducer;
