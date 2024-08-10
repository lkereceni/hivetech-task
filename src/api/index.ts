export const fetchCurrentWeather = async () => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_API_URL
    }weather?q=kalinovac&units=metric&appid=${import.meta.env.VITE_API_KEY}`
  );

  return response.json();
};

export const fetchUVIndex = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}uvi?lat=46.0294&lon=17.1156&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return response.json();
};
