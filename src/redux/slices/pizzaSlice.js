import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async ({search, category, pageCount, sortType}, thunkAPI) => {
        const { data } = await axios.get(`https://63077e9b3a2114bac7640254.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
        );
        console.log(thunkAPI)
        return data;
    }
  )

const initialState = {
  items: [],
  status: 'loading' 
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
        state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {
        console.log(fetchPizza.pending.toString());
        state.status = 'loading';
        state.items = [];
    },
    [fetchPizza.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = 'success';
    },
    [fetchPizza.rejected]: (state) => {
        state.status = 'error';
        state.items = [];
    }
  }
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
