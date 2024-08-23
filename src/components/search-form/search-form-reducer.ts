import { CityFind } from "../../types";

export interface SearchFormState {
  city: CityFind | null;
  inputValue: string;
  validationError: string | null;
}

export const initialState: SearchFormState = {
  city: null,
  inputValue: "",
  validationError: null,
};

export type Action =
  | { type: "SET_CITY"; payload: CityFind | null }
  | { type: "SET_INPUT_VALUE"; payload: string }
  | { type: "SET_VALIDATION_ERROR"; payload: string | null };

export const searchFormReducer = (
  state: SearchFormState,
  action: Action
): SearchFormState => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload };
    case "SET_VALIDATION_ERROR":
      return { ...state, validationError: action.payload };
    default:
      return state;
  }
};
