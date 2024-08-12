import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchForm, WeatherForecast } from "./components";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchForm />
      <WeatherForecast />
    </QueryClientProvider>
  );
}

export default App;
