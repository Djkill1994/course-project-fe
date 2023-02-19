import {
  AppBar,
  Avatar,
  Button,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate, generatePath } from "react-router-dom";
import { FC } from "react";
import { Logout } from "@mui/icons-material";
import { useAuthRefreshQuery } from "../../features/Profile/api/user.api";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import { HeaderThemeSwitcher } from "./HeaderThemeSwitcher";
import { ROUTE_PATHS } from "../../App";
import { HeaderSearchApp } from "./HeaderSearchApp";
import { AUTH_TOKEN_KEY } from "../constans/localStorage";
import { useTranslation } from "react-i18next";
import { logOutUser } from "../utils/logOutUser";

export const Header: FC = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const navigate = useNavigate();
  const { data } = useAuthRefreshQuery(undefined, { skip: !token });
  const { t } = useTranslation();

  return (
    <AppBar color="default" position="sticky">
      <Stack
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        height="50px"
        borderBottom="1px solid #dbdbdb"
        p="0 10px"
      >
        <Stack gap="18px" direction="row" alignItems="center">
          {data && (
            <Stack gap="8px" direction="row" alignItems="center">
              <IconButton
                onClick={() =>
                  navigate(
                    generatePath(ROUTE_PATHS.MyProfile, { id: data?.id }),
                    {
                      replace: true,
                    }
                  )
                }
              >
                <Avatar src={data?.avatarSrc} />
              </IconButton>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(ROUTE_PATHS.Collection, { replace: true })
                }
                fontWeight="bold"
              >
                {t("general.collections")}
              </Typography>
            </Stack>
          )}
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(ROUTE_PATHS.Home, { replace: true })}
            fontWeight="bold"
          >
            {t("general.home")}
          </Typography>
        </Stack>
        <HeaderSearchApp />
        <Stack direction="row" alignItems="center" gap="10px">
          <HeaderSelectLeague />
          <HeaderThemeSwitcher />
          <Stack>
            {data ? (
              <IconButton onClick={logOutUser}>
                <Logout />
              </IconButton>
            ) : (
              <Button
                size="small"
                onClick={() => navigate(ROUTE_PATHS.Login, { replace: true })}
                variant="contained"
              >
                {t("general.logIn")}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </AppBar>
  );
};
