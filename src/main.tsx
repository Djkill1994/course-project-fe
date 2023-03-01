import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./common/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssVarsProvider>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
