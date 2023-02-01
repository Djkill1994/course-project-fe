import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    {/*<Provider>*/}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    {/*</Provider>*/}
  </BrowserRouter>
);
