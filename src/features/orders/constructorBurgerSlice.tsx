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

console.log(localStorage.getItem('bun'));

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
    }
  },
  selectors: {
    getConstructorBurgerIngredient: (state) => state.burgerConstructor,
    getConstructorBurgerState: (state) => state
  }
});

export const { addIngredient } = constructorBurgerSlice.actions;
export const { getConstructorBurgerIngredient, getConstructorBurgerState } =
  constructorBurgerSlice.selectors;
export default constructorBurgerSlice.reducer;
