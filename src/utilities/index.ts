import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data) {
    return `Error ${error.response?.data.cod}: ${error.response?.data.message}`;
  } else {
    return "Failed to fetch weather data";
  }
};
