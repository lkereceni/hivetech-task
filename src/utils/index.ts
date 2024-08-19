import { AxiosError } from "axios";

export const GLOBAL_STRINGS = {
  favorites: "favorites",
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data) {
    return `Error ${error.response?.data.cod}: ${error.response?.data.message}`;
  } else {
    return "Failed to fetch weather data";
  }
};

export const getKph = (mphSpeed: number): number => mphSpeed * 3.6;

export const getHours = (timestamp: string): string => {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getShortDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: "short" };

  return date.toLocaleDateString("en-US", options);
};
