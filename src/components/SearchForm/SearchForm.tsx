import {
  ChangeEvent,
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { setSearch, setSelectedCity } from "../../redux/citySearchSlice";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { Form, searchTextFieldStyles } from "./styles";
import { Search } from "@mui/icons-material";
import { theme } from "../../theme";
import { CityFind } from "../../types";
import { z } from "zod";
import { cityValidationSchema } from "../../zod/schema";
import { fetchCityFindData } from "../../redux/cityFindSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { initialState, searchFormReducer } from "./searchFormReducer";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const searchCity = useAppSelector((state) => state.search.searchCity);
  const selectedCity = useAppSelector((state) => state.search.selectedCity);

  const { data: cityFinds, loading } = useAppSelector(
    (state) => state.cityFind
  );

  const [state, dispatchReducer] = useReducer(searchFormReducer, {
    ...initialState,
    city: selectedCity,
  });

  const { city, inputValue, validationError } = state;

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(fetchCityFindData(searchCity));
  }, [dispatch, searchCity]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchReducer({ type: "SET_INPUT_VALUE", payload: value });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      try {
        cityValidationSchema.parse(value);
        dispatchReducer({ type: "SET_VALIDATION_ERROR", payload: null });
        dispatch(setSearch(value));
      } catch (error) {
        if (error instanceof z.ZodError) {
          dispatchReducer({
            type: "SET_VALIDATION_ERROR",
            payload: error.errors[0].message,
          });
        }
      }
    }, 500);
  };

  const handleOptionSelect = (e: SyntheticEvent, value: CityFind | null) => {
    e.preventDefault();
    if (value) {
      dispatchReducer({ type: "SET_CITY", payload: value });
      dispatchReducer({ type: "SET_INPUT_VALUE", payload: value.name });
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (city) {
      dispatch(setSelectedCity(city));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Autocomplete
        disablePortal
        forcePopupIcon={false}
        options={cityFinds ?? []}
        loading={loading}
        inputValue={inputValue}
        getOptionLabel={(option) => option.name}
        noOptionsText={validationError || "No options"}
        onChange={handleOptionSelect}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            {`${option.name}, ${option.country}`}
            <img
              src={`https://openweathermap.org/images/flags/${option.country.toLowerCase()}.png`}
              alt={`${option.country} flag`}
              style={{ marginLeft: 16 }}
            />
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={searchTextFieldStyles}
            error={!!validationError}
            inputProps={{
              ...params.inputProps,
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              },
            }}
          />
        )}
      />
      <IconButton type="submit" sx={{ color: theme.palette.secondary.light }}>
        <Search />
      </IconButton>
    </Form>
  );
};
