import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TOrdersData } from '@utils-types';

type TConstructorBurger = {
  isLoading: boolean;
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
};

const initialState: TConstructorBurger = {
  isLoading: false,
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  error: null
};

const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.burgerConstructor.bun = action.payload;
      } else {
        state.burgerConstructor.ingredients.push({
          ...action.payload
        });
      }
    },
    removeIngredient: (state, action) => {
      state.burgerConstructor.ingredients.splice(action.payload, 1);
    },
    clearIngredient: (state) => {
      state.burgerConstructor = { bun: null, ingredients: [] };
    },
    moveIngredientDown: (state, action) => {
      state.burgerConstructor.ingredients.splice(action.payload.index, 1);
      state.burgerConstructor.ingredients.splice(
        action.payload.index + 1,
        0,
        action.payload.ingredient
      );
    },
    moveIngredientUp: (state, action) => {
      state.burgerConstructor.ingredients.splice(action.payload.index, 1);
      state.burgerConstructor.ingredients.splice(
        action.payload.index - 1,
        0,
        action.payload.ingredient
      );
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredient,
  moveIngredientDown,
  moveIngredientUp
} = constructorBurgerSlice.actions;

export default constructorBurgerSlice.reducer;
