import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityCoord, HistoricalWeather, InitialFetchState } from "../types";
import { fetchHistoricalWeather } from "../api";
import { AxiosResponse } from "axios";
import { HistoricalWeatherInterface } from "../types/api";

const initialState: InitialFetchState<HistoricalWeather[]> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchHistoricalWeatherData = createAsyncThunk(
  "forecast/fetchHistoricalWeatherData",
  async (coord: CityCoord, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<HistoricalWeatherInterface> =
        await fetchHistoricalWeather(coord);
      const historicalWeatherData: HistoricalWeather[] = response.data.data.map(
        (entry): HistoricalWeather => ({
          date: entry.datetime,
          maxTemperature: entry.max_temp,
          minTemperature: entry.min_temp,
          windSpeed: entry.wind_spd,
          windDirection: entry.wind_dir,
        })
      );

      return historicalWeatherData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
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
        state.error = String(action.payload);
      });
  },
});

export default historicalWeatherSlice.reducer;
