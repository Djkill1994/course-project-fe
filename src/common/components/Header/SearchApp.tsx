import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const SearchApp: FC = () => {
  const { t } = useTranslation();
  return (
    <TextField
      size="small"
      placeholder={t("general.search")}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
