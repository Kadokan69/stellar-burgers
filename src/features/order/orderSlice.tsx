import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
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
  name: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
  orderProfile: TOrder[];
};

const initialState: TNewOrderResponse = {
  name: null,
  orderRequest: false,
  orderModalData: null,
  orders: [],
  orderProfile: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderThunk.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(orderThunk.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(orderThunk.fulfilled, (state, action) => {
      state.orderModalData = action.payload.order;
      state.name = action.payload.name;
      state.orderRequest = false;
    });
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(getOrdersThunk.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
      state.orderProfile = action.payload.orders;
      state.orderRequest = false;
    });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
