import { Stack } from "@mui/material";
import { FC } from "react";
import { Login } from "./Login";

export const LoginPage: FC = () => (
  <Stack flexDirection="row" height="100%">
    <img
      alt="img"
      src={
        "https://mirpozitiva.ru/wp-content/uploads/2019/11/1472042660_10.jpg"
      }
      width="60%"
    />
    <Login />
  </Stack>
);
