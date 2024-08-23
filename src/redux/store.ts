import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./city-search-slice";
import cityFindReducer from "./city-find-slice";
import weatherAlertReducer from "./weather-alert-slice";
import hourlyForecastReducer from "./hourly-forecast-slice";
import dailyForecastReducer from "./daily-forecast-slice";
import currentForecastReducer from "./current-forecast-slice";
import historicalWeatherReducer from "./historical-weather-slice";
import authReducer from "./auth-slice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    cityFind: cityFindReducer,
    currentForecast: currentForecastReducer,
    weatherAlert: weatherAlertReducer,
    hourlyForecast: hourlyForecastReducer,
    dailyForecast: dailyForecastReducer,
    historicalWeather: historicalWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
