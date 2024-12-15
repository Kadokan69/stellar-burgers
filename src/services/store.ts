import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '../features/ingredient/ingredientsSlice';
import feedSlice from '../features/feed/feedSlice';
import constructorBurgerSlice from '../features/orders/constructorBurgerSlice';
import userSlice from '../features/user/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  feed: feedSlice,
  getConstructorBurger: constructorBurgerSlice,
  user: userSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
