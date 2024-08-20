import { fetchHourlyForecast } from "../api";
import { CityCoord, HourlyForecast, InitialFetchState } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage, getHours } from "../utils";

const initialState: InitialFetchState<HourlyForecast[]> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchHourlyForecastData = createAsyncThunk(
  "forecast/fetchHourlyForecastData",
  async (coord: CityCoord) => {
    const response = await fetchHourlyForecast(coord);
    const hourlyForecastData: HourlyForecast[] = response.data.map(
      (entry): HourlyForecast => ({
        temperature: Math.round(entry.app_temp),
        icon: entry.weather.icon,
        time: getHours(entry.timestamp_local),
      })
    );

    return hourlyForecastData;
  }
);

const hourlyForecastSlice = createSlice({
  name: "hourlyForecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHourlyForecastData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHourlyForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHourlyForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      });
  },
});

export default hourlyForecastSlice.reducer;
