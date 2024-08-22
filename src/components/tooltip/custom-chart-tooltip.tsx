import { ChartsTooltip } from "@mui/x-charts";

export default function CustomChartsTooltip() {
  return (
    <ChartsTooltip
      slotProps={{
        popper: {
          sx: {
            bgcolor: "#333",
          },
        },
      }}
    />
  );
}
