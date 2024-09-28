import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityCoord, InitialFetchState, WeatherAlert } from "../types";
import { fetchWeatherAlert } from "../api";
import { getErrorMessage } from "../utils";
import { AxiosResponse } from "axios";
import { WeatherAlertInterface } from "../types/api";

const initialState: InitialFetchState<WeatherAlert> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchWeatherAlertData = createAsyncThunk(
  "weather/fetchWeatherAlertData",
  async (coord: CityCoord) => {
    const response: AxiosResponse<WeatherAlertInterface> =
      await fetchWeatherAlert(coord);
    const weatherAlertData: WeatherAlert = response.data.alerts[0];

    return weatherAlertData;
  }
);

export const weatherAlertSlice = createSlice({
  name: "weatherAlert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAlertData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherAlertData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherAlertData.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      });
  },
});

export default weatherAlertSlice.reducer;
