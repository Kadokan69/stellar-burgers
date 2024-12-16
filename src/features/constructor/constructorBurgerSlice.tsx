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
        localStorage.setItem(
          'bun',
          JSON.stringify(state.burgerConstructor.bun)
        );
      } else {
        state.burgerConstructor.ingredients.push({
          ...action.payload
        });
        localStorage.setItem(
          'ingredients',
          JSON.stringify(state.burgerConstructor.ingredients)
        );
      }
    },
    removeIngredient: (state, action) => {
      state.burgerConstructor.ingredients.splice(action.payload, 1);
      localStorage.setItem(
        'ingredients',
        JSON.stringify(state.burgerConstructor.ingredients)
      );
    },
    moveIngredientDown: (state, action) => {
      state.burgerConstructor.ingredients.splice(action.payload.index, 1);
      state.burgerConstructor.ingredients.splice(
        action.payload.index + 1,
        0,
        action.payload.ingredient
      );
      localStorage.setItem(
        'ingredients',
        JSON.stringify(state.burgerConstructor.ingredients)
      );
    },
    moveIngredientUp: (state, action) => {
      state.burgerConstructor.ingredients.splice(action.payload.index, 1);
      state.burgerConstructor.ingredients.splice(
        action.payload.index - 1,
        0,
        action.payload.ingredient
      );

      localStorage.setItem(
        'ingredients',
        JSON.stringify(state.burgerConstructor.ingredients)
      );
    }
  },
  selectors: {
    getConstructorBurgerIngredient: (state) => state.burgerConstructor,
    getConstructorBurgerState: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} = constructorBurgerSlice.actions;
export const { getConstructorBurgerIngredient, getConstructorBurgerState } =
  constructorBurgerSlice.selectors;
export default constructorBurgerSlice.reducer;
