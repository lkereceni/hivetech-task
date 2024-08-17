import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityCoord } from "../types";

interface InitialState {
  searchCity: string;
  selectedCity: CityCoord;
}

const initialState: InitialState = {
  searchCity: "Kalinovac",
  selectedCity: { lat: 46.0294, lon: 17.1156 },
};

const citySearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchCity = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<CityCoord>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { setSearch, setSelectedCity } = citySearchSlice.actions;
export default citySearchSlice.reducer;
