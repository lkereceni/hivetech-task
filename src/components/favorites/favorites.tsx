import { Favorite } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import useFavoritesLocalStorage from "../../hooks/use-favorites-local-storage";
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../../store/city-search-slice";
import { CityFind } from "../../types";

export const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useFavoritesLocalStorage();

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleItemClick = (selectedItem: CityFind) => {
    setAnchor(null);
    dispatch(setSelectedCity(selectedItem));
  };

  return (
    <div>
      <IconButton size="large" onClick={handleClick}>
        <Favorite />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
        {favorites.map((favorite) => (
          <MenuItem key={favorite.id} onClick={() => handleItemClick(favorite)}>
            {favorite.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
