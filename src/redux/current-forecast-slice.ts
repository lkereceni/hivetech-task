import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityFind, InitialFetchState, WeatherForecast } from "../types";
import { fetchCurrentForecast, fetchUVIndex } from "../api";
import { getErrorMessage, getKph } from "../utils";

const initialState: InitialFetchState<WeatherForecast> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchCurrentForecastData = createAsyncThunk(
  "forecast/fetchCurrentForecastData",
  async (city: CityFind) => {
    const response = await fetchCurrentForecast(city.name);
    const uvResponse = await fetchUVIndex(city.coord);

    const currentForecastData: WeatherForecast = {
      city: response.name,
      temperature: Math.round(response.main.temp),
      description: response.weather[0].description,
      uvIndex: Math.round(uvResponse.value),
      visibility: response.visibility,
      humidity: response.main.humidity,
      windSpeed: getKph(response.wind.speed),
      feelsLikeTemperature: Math.round(response.main.feels_like),
      pressure: response.main.pressure,
    };

    return currentForecastData;
  }
);

const currentForecastSlice = createSlice({
  name: "currentForecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentForecastData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCurrentForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      });
  },
});

export default currentForecastSlice.reducer;
