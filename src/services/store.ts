import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '../features/ingredient/ingredientsSlice';
import feedSlice from '../features/feed/feedSlice';
import constructorBurgerSlice from '../features/constructor/constructorBurgerSlice';
import userSlice from '../features/user/userSlice';
import loginUserSlice from '../features/user/loginUserSlice';
import orderSlice from '../features/order/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  feed: feedSlice,
  getConstructorBurger: constructorBurgerSlice,
  user: userSlice,
  userLogin: loginUserSlice,
  orderData: orderSlice
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
