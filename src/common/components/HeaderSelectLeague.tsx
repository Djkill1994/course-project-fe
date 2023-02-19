import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const HeaderSelectLeague: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Button
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")}
      variant="outlined"
      sx={{ width: "16px", height: "22px" }}
    >
      {i18n.language === "en" ? "Eng" : "Рус"}
    </Button>
  );
};
