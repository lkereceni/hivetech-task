export const getCurrentWeather = async () => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=kalinovac&units=metric&appid=961dd78fd92acfcb9627752c4105a471"
  );
  return response.json();
};
