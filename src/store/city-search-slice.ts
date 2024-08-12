import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const citySearchSlice = createSlice({
  name: "search",
  initialState: {
    city: "Kalinovac",
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setSearch } = citySearchSlice.actions;
export default citySearchSlice.reducer;
