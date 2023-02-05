import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const SelectLeague: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Button
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")}
      variant="outlined"
      size="small"
    >
      {i18n.language === "en" ? "Eng" : "Рус"}
    </Button>
  );
};
