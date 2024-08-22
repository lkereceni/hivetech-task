import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { ViewModule, ShowChart } from "@mui/icons-material";
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
  return (
    <Stack direction="row" justifyContent="space-between" paddingRight={4}>
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
      <SignedIn>
        <Stack direction="row" spacing={1}>
          <Favorites />
          <UserButton />
        </Stack>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="contained" color="primary" disableElevation>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </Stack>
  );
};
