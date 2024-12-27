import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorBurger = {
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
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push({
            ...action.payload
          });
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
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
