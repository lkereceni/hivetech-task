import { SxProps } from "@mui/material";
import { theme } from "../../theme";
import styled from "@emotion/styled";

export const searchTextFieldStyles: SxProps = {
  backgroundColor: theme.palette.secondary.main,
  border: "none",
  borderRadius: 2,
  minWidth: 260,
};

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
