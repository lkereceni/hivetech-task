import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSearch } from "../../store/city-search-slice";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
};
