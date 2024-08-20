import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCityFind } from "../api";
import { CityFind, InitialFetchState } from "../types";
import { getErrorMessage } from "../utils";

const initialState: InitialFetchState<CityFind[]> = {
  data: [],
  loading: false,
  error: "",
};

export const fetchCityFindData = createAsyncThunk(
  "search/fetchFindCityData",
  async (city: string) => {
    const response = await fetchCityFind(city);
    const cityFindData: CityFind[] = response.list.map(
      (entry): CityFind => ({
        id: entry.id,
        name: entry.name,
        coord: entry.coord,
        country: entry.sys.country,
      })
    );

    return cityFindData;
  }
);

const cityFindSlice = createSlice({
  name: "cityFind",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityFindData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCityFindData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCityFindData.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      });
  },
});

export default cityFindSlice.reducer;
