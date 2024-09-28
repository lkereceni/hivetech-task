import { CircularProgress, Container } from "@mui/material";
import { periodicForecastLoadingContainerStyles } from "./styles";
import { theme } from "../../../theme";

export const PeriodicForecastLoading = () => {
  return (
    <Container sx={periodicForecastLoadingContainerStyles}>
      <CircularProgress sx={{ color: theme.palette.text.primary }} size={56} />
    </Container>
  );
};
