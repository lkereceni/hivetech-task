import {
  ChangeEvent,
  FormEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSearch, setSelectedCity } from "../../store/city-search-slice";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { Form, searchTextFieldStyles } from "./styles";
import { Search } from "@mui/icons-material";
import { theme } from "../../theme";
import { useCityFindData } from "../../hooks/useCityFindData";
import { CityFind } from "../../types";
import { z } from "zod";
import { cityValidationSchema } from "../../zod/schema";

export const SearchForm = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(
    (state: RootState) => state.search.selectedCity
  );
  const { cityFind, loading } = useCityFindData();
  const [city, setCity] = useState(selectedCity);
  const [inputValue, setInputValue] = useState("");

  const [validationError, setValidationError] = useState<string | null>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      try {
        cityValidationSchema.parse(value);
        setValidationError(null);
        dispatch(setSearch(value));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidationError(error.errors[0].message);
        }
      }
    }, 500);
  };

  const handleOptionSelect = (e: SyntheticEvent, value: CityFind | null) => {
    e.preventDefault();
    if (value) {
      setCity(value);
      setInputValue(value.name);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(setSelectedCity(city));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Autocomplete
        disablePortal
        forcePopupIcon={false}
        options={cityFind ?? []}
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
