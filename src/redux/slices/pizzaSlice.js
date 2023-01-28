import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
    }
},
});

export const { setItems } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
