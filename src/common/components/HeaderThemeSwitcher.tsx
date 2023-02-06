import { IconButton, useColorScheme } from "@mui/material";
import { FC } from "react";
import { WbSunny, DarkMode } from "@mui/icons-material";

export const HeaderThemeSwitcher: FC = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "light" ? <DarkMode /> : <WbSunny />}
    </IconButton>
  );
};
