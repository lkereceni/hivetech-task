import { Favorite } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import useFavoritesLocalStorage from "../../hooks/use-favorites-local-storage";

export const Favorites = () => {
  const { favorites } = useFavoritesLocalStorage();

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleClick}>
        <Favorite />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
        {favorites.map((favorite) => (
          <MenuItem onClick={handleClose}>{favorite}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};
