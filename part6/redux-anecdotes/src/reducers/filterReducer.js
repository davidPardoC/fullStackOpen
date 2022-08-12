import { createSlice } from "@reduxjs/toolkit";

const initialState = { filter: "" };

const filterSlice = createSlice({
  initialState,
  name: "filter",
  reducers: {
    changeFilter(state, action) {
      return { filter: action.payload };
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
