import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityFind, InitialFetchState, WeatherForecast } from "../types";
import { fetchCurrentForecast, fetchUVIndex } from "../api";
import { getKph } from "../utils";
import { CurrentWeatherInterface, UVIndexInterface } from "../types/api";
import { AxiosResponse } from "axios";

const initialState: InitialFetchState<WeatherForecast> = {
  data: null,
  loading: false,
  error: "",
};

export const fetchCurrentForecastData = createAsyncThunk(
  "forecast/fetchCurrentForecastData",
  async (city: CityFind, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<CurrentWeatherInterface> =
        await fetchCurrentForecast(city.name);
      const uvResponse: AxiosResponse<UVIndexInterface> = await fetchUVIndex(
        city.coord
      );

      const currentForecastData: WeatherForecast = {
        city: response.data.name,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        uvIndex: Math.round(uvResponse.data.value),
        visibility: response.data.visibility,
        humidity: response.data.main.humidity,
        windSpeed: getKph(response.data.wind.speed),
        feelsLikeTemperature: Math.round(response.data.main.feels_like),
        pressure: response.data.main.pressure,
      };

      return currentForecastData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
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
        state.error = String(action.payload);
      });
  },
});

export default currentForecastSlice.reducer;
