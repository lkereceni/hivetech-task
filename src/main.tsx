import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { theme } from "./theme.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <CssBaseline />
          <App />
        </ClerkProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
