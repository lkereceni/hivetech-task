import { Alert, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { getSeverity } from "../../utils";
import { ArrowForwardIos } from "@mui/icons-material";

type WeatherAlertProps = {
  text: string;
  subText?: string;
  severity: string;
  href: string;
};

export const WeatherAlert: FC<WeatherAlertProps> = ({
  text,
  subText,
  severity,
  href,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Alert variant="filled" severity={getSeverity(severity)}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="column" justifyContent="center" alignItems="start">
            <Typography>{text}</Typography>
            <Typography variant="caption">{subText}</Typography>
          </Stack>
          <ArrowForwardIos />
        </Stack>
      </Alert>
    </a>
  );
};
