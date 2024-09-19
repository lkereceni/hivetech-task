import { fetchHourlyForecast } from "../api";
import { CityCoord, HourlyForecast, InitialFetchState } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHours } from "../utils";
import { AxiosResponse } from "axios";
import { HourlyForecastInterface } from "../types/api";

const initialState: InitialFetchState<HourlyForecast[]> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchHourlyForecastData = createAsyncThunk(
  "forecast/fetchHourlyForecastData",
  async (coord: CityCoord, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<HourlyForecastInterface> =
        await fetchHourlyForecast(coord);
      const hourlyForecastData: HourlyForecast[] = response.data.data.map(
        (entry): HourlyForecast => ({
          temperature: Math.round(entry.app_temp),
          icon: entry.weather.icon,
          time: getHours(entry.timestamp_local),
        })
      );

      return hourlyForecastData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
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
        state.error = String(action.payload);
      });
  },
});

export default hourlyForecastSlice.reducer;
