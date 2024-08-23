import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { FC } from "react";
import { SignUp } from "./sign-up";
import { SignIn } from "./sign-in";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  authType: "signup" | "signin";
};

export const AuthModal: FC<AuthModalProps> = ({ open, onClose, authType }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        {authType === "signup" ? <SignUp /> : <SignIn />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
