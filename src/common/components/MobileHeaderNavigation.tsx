import {
  Avatar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { generatePath, useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { ROUTE_PATHS } from "../../App";
import { useTranslation } from "react-i18next";
import { IHeaderNavigationProps } from "./HeaderNavigation";

export const MobileHeaderNavigation: FC<IHeaderNavigationProps> = ({
  id,
  role,
  avatarSrc,
}) => {
  const [isOpened, setIsOpened] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 0 }}>
      {id ? (
        <Box>
          {" "}
          <IconButton
            onClick={({ currentTarget }) => setIsOpened(currentTarget)}
            sx={{ p: 0 }}
          >
            <Avatar alt="Avatar" src={avatarSrc} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={isOpened}
            open={!!isOpened}
            onClose={() => setIsOpened(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() =>
                navigate(generatePath(ROUTE_PATHS.MyProfile, { id: id }), {
                  replace: true,
                })
              }
            >
              {t("general.myProfile")}
            </MenuItem>
            {role === "admin" && (
              <MenuItem
                onClick={() => navigate(ROUTE_PATHS.Admin, { replace: true })}
              >
                {t("general.adminArea")}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => navigate(ROUTE_PATHS.Home, { replace: true })}
            >
              {t("general.home")}
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <IconButton
          onClick={() => navigate(ROUTE_PATHS.Home, { replace: true })}
        >
          <Home sx={{ color: "black" }} />
        </IconButton>
      )}
    </Box>
  );
};
