import { InputAdornment, TextField } from "@mui/material";
import { FC } from "react";

export const Search: FC = () => {
  return (
    <TextField
      size="small"
      placeholder="Search"
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
