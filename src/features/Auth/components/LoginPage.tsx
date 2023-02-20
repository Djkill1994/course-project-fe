import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../App";
import { useTranslation } from "react-i18next";

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Stack alignItems="center" m="0 20px">
      <Stack mb="40px" alignItems="center">
        <LockOutlined sx={{ width: "36px", height: "36px", margin: "10px" }} />
        <Typography fontSize="1.5rem">{t("general.logIn")}</Typography>
      </Stack>
      <Stack
        alignItems="flex-end"
        border="1px solid #dbdbdb"
        borderRadius="10px"
        padding="30px"
      >
        <LoginForm />
        <Link
          to={ROUTE_PATHS.Registration}
          replace={true}
          style={{ color: "#0095f6", textDecoration: "inherit" }}
        >
          <Typography fontSize="14px" fontWeight="bolder" mt="20px">
            {t("general.signUp")}
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
};
