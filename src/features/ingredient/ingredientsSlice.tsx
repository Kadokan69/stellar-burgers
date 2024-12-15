import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredientsData = createAsyncThunk(
  'ingredients/fetchIngredientsData',
  async () => getIngredientsApi()
);

interface IIngredients {
  isInit: boolean;
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | undefined | null;
}

const initialState: IIngredients = {
  isInit: false,
  isLoading: false,
  ingredients: [],
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.isLoading = true;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default ingredientsSlice.reducer;
