import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSearch } from "../../store/city-search-slice";

import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import {
  searchBoxStyles,
  searchButtonStyles,
  searchTextFieldStyles,
} from "./styles";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const SearchForm = () => {
  const initialCity = useSelector((state: RootState) => state.search.city);
  const [city, setCity] = useState(initialCity);

  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(city));
  };

  return (
    <Box sx={searchBoxStyles}>
      <Form onSubmit={handleSubmit}>
        <TextField
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={searchTextFieldStyles}
        />
        <Button variant="text" type="submit" sx={searchButtonStyles}>
          Search
        </Button>
      </Form>
    </Box>
  );
};
