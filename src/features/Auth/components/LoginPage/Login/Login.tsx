import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../../App";

export const Login: FC = () => (
  <Stack justifyContent="center" m="0 20px">
    <Stack mb="40px" alignItems="center">
      <LockOutlined sx={{ width: "36px", height: "36px", margin: "10px" }} />
      <Typography fontSize="1.5rem">Sign in</Typography>
    </Stack>
    <Stack alignItems="flex-end">
      <LoginForm />
      <Link
        to={ROUTE_PATHS.Registration}
        style={{ color: "#0095f6", textDecoration: "inherit" }}
      >
        <Typography fontSize="14px" fontWeight="bolder" mt="20px">
          Sign Up
        </Typography>
      </Link>
    </Stack>
  </Stack>
);
