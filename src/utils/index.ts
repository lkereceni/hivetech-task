import { AxiosError } from "axios";
import { APISeverity, MaterialUISeverity } from "../enums";

export const GLOBAL_STRINGS = {
  favorites: "favorites",
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data) {
    return `Error ${error.response?.data.cod}: ${error.response?.data.message}`;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Failed to fetch data";
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

export const getSeverity = (apiSeverity: string): `${MaterialUISeverity}` => {
  switch (apiSeverity) {
    case APISeverity.Advisory:
      return MaterialUISeverity.Info;
    case APISeverity.Watch:
      return MaterialUISeverity.Warning;
    case APISeverity.Warning:
      return MaterialUISeverity.Error;
    default:
      return MaterialUISeverity.Info;
  }
};

export const getPastDays = (pastDaysNumber: number): string => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - pastDaysNumber);

  return getISODateFormat(pastDate);
};

export const getISODateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getShortMonthDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options).replace(",", "");
};
