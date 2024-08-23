import { FC, FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { auth } from "../../firebase";
import { theme } from "../../theme";

export const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSignin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOpen(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Sign In
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ backgroundColor: theme.palette.secondary.main }}>
          Sign In
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.secondary.main }}>
          <form onSubmit={handleSignin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: theme.palette.secondary.main }}>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            onClick={handleSignin}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
