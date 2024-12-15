import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const fetchFeedData = createAsyncThunk('feed/fetchFeedData', async () =>
  getFeedsApi()
);

interface IFeed {
  isInit: boolean;
  isLoading: boolean;
  feed: TOrdersData;
  error: string | null;
  order: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: IFeed = {
  isInit: false,
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null,
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
        state.error = null;
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        state.isLoading = true;
        state.feed = action.payload;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.order = action.payload.orders;
      })
      .addCase(fetchFeedData.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default feedSlice.reducer;
