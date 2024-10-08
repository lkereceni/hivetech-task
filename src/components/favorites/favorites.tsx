import { Favorite } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { setSelectedCity } from "../../redux/citySearchSlice";
import { CityFind } from "../../types";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorage } from "../../enums";
import { useAppDispatch } from "../../hooks";

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const { storageItems: favorites } = useLocalStorage<CityFind>(
    LocalStorage.Favorites
  );

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
