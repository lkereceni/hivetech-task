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
import { searchTextFieldStyles } from "./styles";
import { Search } from "@mui/icons-material";
import { theme } from "../../theme";
import { useCityFindData } from "../../hooks/use-city-find";
import { CityCoord, CityFind } from "../../types";
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const SearchForm = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(
    (state: RootState) => state.search.selectedCity
  );
  const { cityFind, loading } = useCityFindData();

  const [cityCoord, setCityCoord] = useState<CityCoord>({
    lat: selectedCity.lat,
    lon: selectedCity.lon,
  });

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      dispatch(setSearch(value));
    }, 500);
  };

  const handleOptionSelect = (e: SyntheticEvent, value: CityFind | null) => {
    e.preventDefault();
    if (value) {
      setCityCoord(value.coord);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(setSelectedCity(cityCoord));
  };

  return (
    <Autocomplete
      disablePortal
      forcePopupIcon={false}
      options={cityFind ?? []}
      loading={loading}
      onChange={handleOptionSelect}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component={"li"} {...props} key={option.id}>
          {`${option.name}, ${option.country}`}
          <img
            src={`https://openweathermap.org/images/flags/${option.country.toLowerCase()}.png`}
            alt="Country flag"
            style={{ marginLeft: 16 }}
          />
        </Box>
      )}
      renderInput={(params) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            {...params}
            type="text"
            value={selectedCity}
            onChange={handleInputChange}
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={searchTextFieldStyles}
            inputProps={{
              ...params.inputProps,
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              },
            }}
          />
          <IconButton
            type={"submit"}
            sx={{ color: theme.palette.secondary.light }}
          >
            <Search />
          </IconButton>
        </Form>
      )}
    />
  );
};
