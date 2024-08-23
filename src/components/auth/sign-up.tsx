import { createUserWithEmailAndPassword } from "firebase/auth";
import { FC, FormEvent, useState } from "react";
import { auth } from "../../firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "../../theme";

export const SignUp: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Sign Up
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ backgroundColor: theme.palette.secondary.main }}>
          Sign Up
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.secondary.main }}>
          <form onSubmit={handleSignup}>
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
          <Button type="submit" variant="contained" color="info">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
