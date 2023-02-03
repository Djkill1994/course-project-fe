import { Stack, Typography } from "@mui/material";
import { RegistrationForm } from "./RegistrationForm";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../App";
import { FC } from "react";

export const RegistrationPage: FC = () => (
  <Stack alignItems="center">
    <Stack m="20px" alignItems="center">
      <LockOutlined sx={{ width: "36px", height: "36px" }} />
      <Typography fontSize="1.5rem">Sign Up</Typography>
    </Stack>
    <Stack
      alignItems="flex-end"
      border="1px solid #dbdbdb"
      borderRadius="10px"
      padding="30px"
    >
      <RegistrationForm />
      <Link
        to={ROUTE_PATHS.Login}
        style={{ color: "#0095f6", textDecoration: "inherit" }}
      >
        <Typography fontSize="14px" fontWeight="bolder" mt="20px">
          Sign In
        </Typography>
      </Link>
    </Stack>
  </Stack>
);
