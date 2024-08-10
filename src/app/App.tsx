import { WeatherForecast } from "../components/weather-forecast/weather-forecast";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherForecast />
    </QueryClientProvider>
  );
}

export default App;
