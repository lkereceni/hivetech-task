import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityFind } from "../types";

interface InitialState {
  searchCity: string;
  selectedCity: CityFind;
}

const initialState: InitialState = {
  searchCity: "Kalinovac",
  selectedCity: {
    id: 3198450,
    name: "Kalinovac",
    country: "HR",
    coord: {
      lat: 46.0294,
      lon: 17.1156,
    },
  },
};

const citySearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchCity = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<CityFind>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { setSearch, setSelectedCity } = citySearchSlice.actions;
export default citySearchSlice.reducer;
