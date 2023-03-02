import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";
import { FC } from "react";
import { ROUTE_PATHS } from "../../App";
import { useTranslation } from "react-i18next";

export interface IHeaderNavigationProps {
  id?: string;
  role?: string;
  avatarSrc?: string;
}

export const HeaderNavigation: FC<IHeaderNavigationProps> = ({
  id,
  role,
  avatarSrc,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack gap="18px" direction="row" alignItems="center">
      {id && (
        <Stack gap="8px" direction="row" alignItems="center">
          <IconButton
            onClick={() =>
              navigate(generatePath(ROUTE_PATHS.MyProfile, { id: id }), {
                replace: true,
              })
            }
          >
            <Avatar src={avatarSrc} />
          </IconButton>
          {role === "admin" && (
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTE_PATHS.Admin, { replace: true })}
              fontWeight="bold"
            >
              {t("general.adminArea")}
            </Typography>
          )}
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() =>
              navigate(generatePath(ROUTE_PATHS.Collection, { userId: id }), {
                replace: true,
              })
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
  );
};
