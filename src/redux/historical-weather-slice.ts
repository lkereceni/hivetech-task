import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityCoord, HistoricalWeather, InitialFetchState } from "../types";
import { fetchHistoricalWeather } from "../api";
import { getErrorMessage } from "../utils";

const initialState: InitialFetchState<HistoricalWeather[]> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchHistoricalWeatherData = createAsyncThunk(
  "forecast/fetchHistoricalWeatherData",
  async (coord: CityCoord) => {
    const response = await fetchHistoricalWeather(coord);
    const historicalWeatherData: HistoricalWeather[] = response.data.map(
      (entry): HistoricalWeather => ({
        date: entry.datetime,
        maxTemperature: entry.max_temp,
        minTemperature: entry.min_temp,
      })
    );

    return historicalWeatherData;
  }
);

const historicalWeatherSlice = createSlice({
  name: "historicalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoricalWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHistoricalWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      });
  },
});

export default historicalWeatherSlice.reducer;
