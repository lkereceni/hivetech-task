import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./citySearchSlice";
import cityFindReducer from "./cityFindSlice";
import weatherAlertReducer from "./weatherAlertSlice";
import hourlyForecastReducer from "./hourlyForecastSlice";
import dailyForecastReducer from "./dailyForecastSlice";
import currentForecastReducer from "./currentForecastSlice";
import historicalWeatherReducer from "./historicalWeatherSlice";
import authReducer from "./authSlice";

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
