import { FC, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  CardActionArea,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ICollection } from "../api/collections.api";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../Auth/api/login.api";

export const CollectionCard: FC<ICollection> = ({
  theme,
  description,
  date,
  name,
  imgSrc,
  id,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card key={id} sx={{ width: 345 }}>
      <CardHeader
        action={
          <IconButton
            aria-controls={anchorEl ? "long-menu" : undefined}
            aria-expanded={anchorEl ? "true" : undefined}
            aria-haspopup="true"
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={theme}
      />
      <CardActionArea
        onClick={() => navigate(ROUTE_PATHS.CollectionId, { replace: true })}
      >
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => navigate(ROUTE_PATHS.Login, { replace: true })}
          >
            {t("features.CollectionPage.CollectionCard.buttons.edit")}
          </MenuItem>
          <MenuItem
            onClick={() =>
              navigate(ROUTE_PATHS.Registration, { replace: true })
            }
          >
            {t("features.CollectionPage.CollectionCard.buttons.delete")}
          </MenuItem>
        </Menu>
        <CardMedia
          component="img"
          height="194"
          image={imgSrc}
          alt="Collection img"
        />
        <CardContent>
          <Typography variant="body1">{description}</Typography>
        </CardContent>
        <Box display="flex" justifyContent="flex-end" p="5px 15px">
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
