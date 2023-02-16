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
import {
  ICollection,
  useDeleteCollectionMutation,
} from "../api/collections.api";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { useNavigate, generatePath } from "react-router-dom";

export const CollectionCard: FC<ICollection> = ({
  theme,
  description,
  date,
  name,
  imgSrc,
  id,
}) => {
  const [isOpened, setIsOpened] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteCollection] = useDeleteCollectionMutation();

  return (
    <Card>
      <CardHeader
        action={
          <IconButton
            onClick={({ currentTarget }) => setIsOpened(currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={theme}
      />
      <CardActionArea>
        <Menu
          anchorEl={isOpened}
          open={Boolean(isOpened)}
          onClose={() => setIsOpened(null)}
        >
          <MenuItem
            onClick={() =>
              navigate(generatePath(ROUTE_PATHS.CollectionId, { id: id }), {
                replace: true,
              })
            }
          >
            {t("features.CollectionPage.CollectionCard.buttons.edit")}
          </MenuItem>
          <MenuItem onClick={() => deleteCollection(id)}>
            {t("general.delete")}
          </MenuItem>
        </Menu>
        {/*todo переход к станице айтемов коллекции*/}
        <Box
          onClick={() =>
            navigate(generatePath(ROUTE_PATHS.CollectionId, { id: id }), {
              replace: true,
            })
          }
        >
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
        </Box>
      </CardActionArea>
    </Card>
  );
};
