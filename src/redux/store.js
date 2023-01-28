import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice'
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    cart: cart,
    pizza
  },
})
