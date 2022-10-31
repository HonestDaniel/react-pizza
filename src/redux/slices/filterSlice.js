import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  categoryId: 0,
  pageCount: 1,
  sortType: {
    name: 'популярности', sortProperty: 'rating'
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action) => {
      state.sortType = action.payload
      console.log(action.payload)
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload
      console.log(action.payload)
    },
    setFilters: (state, action) => {
      console.log('fdfd', action.payload.pageCount)
      state.sortType = action.payload.sortType
      state.pageCount = Number(action.payload.pageCount)
      state.categoryId = Number(action.payload.categoryId)
    }
  }
})

export const { setCategoryId, setSortType, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
