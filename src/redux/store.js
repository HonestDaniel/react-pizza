import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice'
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    cart: cart
  },
})
