import { Button } from "@mui/material";
import { FC, useState } from "react";
import { i18n } from "../../../i18n";
import { LANGUAGE_KEY } from "../../../constans/localStorage";

export const SelectLeague: FC = () => {
  const [lang, setLang] = useState(() => localStorage.getItem(LANGUAGE_KEY));

  return (
    <Button
      onClick={() => {
        const lng = localStorage.getItem(LANGUAGE_KEY) === "en" ? "ru" : "en";
        setLang(lng);
        i18n.changeLanguage(lng);
        localStorage.setItem(LANGUAGE_KEY, lng);
      }}
      variant="outlined"
      size="small"
    >
      {lang === "en" ? "Eng" : "Рус"}
    </Button>
  );
};
