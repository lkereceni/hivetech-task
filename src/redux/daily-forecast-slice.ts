import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityCoord, DailyForecast, InitialFetchState } from "../types";
import { fetchDailyForecast } from "../api";
import { getErrorMessage } from "../utils";
import { AxiosError } from "axios";

const initialState: InitialFetchState<DailyForecast[]> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchDailyForecastData = createAsyncThunk(
  "forecast/fetchDailyForecastData",
  async (coord: CityCoord, { rejectWithValue }) => {
    try {
      const response = await fetchDailyForecast(coord);
      const dailyForecastData: DailyForecast[] = response.data.map(
        (entry): DailyForecast => ({
          maxTemperature: Math.round(entry.app_max_temp),
          minTemperature: Math.round(entry.app_min_temp),
          icon: entry.weather.icon,
          day: entry.datetime,
        })
      );

      return dailyForecastData;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

const dailyForecastSlice = createSlice({
  name: "dailyForecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyForecastData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailyForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDailyForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      });
  },
});

export default dailyForecastSlice.reducer;
