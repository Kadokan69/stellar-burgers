import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredientsData = createAsyncThunk(
  'ingredients/fetchIngredientsData',
  async () => getIngredientsApi()
);

interface IIngredients {
  isLoading: boolean;
  ingredients: TIngredient[];
}

const initialState: IIngredients = {
  isLoading: false,
  ingredients: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredientsData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.isLoading = true;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
