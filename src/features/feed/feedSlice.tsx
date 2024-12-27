import { getFeedsApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const fetchFeedData = createAsyncThunk('feed/fetchFeedData', async () =>
  getFeedsApi()
);

type IFeed = {
  isLoading: boolean;
  feed: TOrdersData;
  order: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: IFeed = {
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  order: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedData.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeedData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        state.isLoading = true;
        state.feed = action.payload;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.order = action.payload.orders;
      });
  }
});

export default feedSlice.reducer;
