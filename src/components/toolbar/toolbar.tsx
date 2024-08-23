import { ViewModule, ShowChart, Settings } from "@mui/icons-material";
import {
  Stack,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { Forecast, ForecastView } from "../../enums";
import { Favorites } from "../favorites/favorites";
import { ForecastOption, ForecastViewOption } from "../../types";
import { FC, SyntheticEvent } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { SignIn } from "../auth/sign-in";
import { SignUp } from "../auth/sign-up";
import { useAppSelector } from "../../hooks";

type ToolbarProps = {
  forecastTabValue: ForecastOption;
  toggleButtonValue: ForecastViewOption;
  handleTabChange: (event: SyntheticEvent, newValue: ForecastOption) => void;
  handleToggleChange: (
    event: SyntheticEvent,
    newValue: ForecastViewOption
  ) => void;
};

export const Toolbar: FC<ToolbarProps> = ({
  forecastTabValue,
  toggleButtonValue,
  handleTabChange,
  handleToggleChange,
}) => {
  const user = useAppSelector((state) => state.auth.currentUser);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      paddingRight={4}
    >
      <Tabs value={forecastTabValue} onChange={handleTabChange}>
        <Tab value={Forecast.Hourly} label={Forecast.Hourly} />
        <Tab value={Forecast.Daily} label={Forecast.Daily} />
      </Tabs>
      <ToggleButtonGroup
        orientation="horizontal"
        value={toggleButtonValue}
        exclusive
        onChange={handleToggleChange}
      >
        <ToggleButton value={ForecastView.Card} aria-label={ForecastView.Card}>
          <ViewModule />
        </ToggleButton>
        <ToggleButton
          value={ForecastView.Chart}
          aria-label={ForecastView.Chart}
        >
          <ShowChart />
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" alignItems="center" spacing={2}>
        {user ? (
          <>
            <Favorites />
            <Settings />
            <Button variant="contained" color="primary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <SignUp />
            <SignIn />
          </>
        )}
      </Stack>
    </Stack>
  );
};
