import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data) {
    return `Error ${error.response?.data.cod}: ${error.response?.data.message}`;
  } else {
    return "Failed to fetch weather data";
  }
};

export const convertMphToKph = (mphSpeed: number): number => mphSpeed * 3.6;

export const toHours = (timestamp: string): string => {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
