interface CurrentWeatherInterface {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  visibility: number;
  wind: {
    speed: number;
  };
}

interface UVIndexInterface {
  value: number;
}

interface HourlyForecastInterface {
  data: [
    {
      app_temp: number;
      timestamp_local: string;
      weather: {
        icon: string;
      };
    }
  ];
}

interface DailyForecastInterface {
  data: [
    {
      app_max_temp: number;
      app_min_temp: number;
      datetime: string;
      weather: {
        icon: string;
      };
    }
  ];
}

interface CityFindInterface {
  count: number;
  list: [
    {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      sys: {
        country: string;
      };
    }
  ];
}

interface WeatherAlertInterface {
  alerts: [
    {
      regions: string[];
      severity: string;
      title: string;
      uri: string;
    }
  ];
}

export type {
  CurrentWeatherInterface,
  UVIndexInterface,
  HourlyForecastInterface,
  DailyForecastInterface,
  CityFindInterface,
  WeatherAlertInterface,
};
