import { FC, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  ICollection,
  useDeleteCollectionMutation,
} from "../api/collections.api";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { generatePath, useNavigate } from "react-router-dom";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import * as Showdown from "showdown";
import { MoreVert } from "@mui/icons-material";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const CollectionCard: FC<Omit<ICollection, "optionalFields">> = ({
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
  const { data: userData } = useAuthRefreshQuery();

  return (
    <Card sx={{ height: "400px" }}>
      <CardHeader
        action={
          userData?.collections?.some(
            (collectionId) => collectionId === id || userData.role === "admin"
          ) ? (
            <IconButton
              onClick={({ currentTarget }) => setIsOpened(currentTarget)}
            >
              <MoreVert />
            </IconButton>
          ) : undefined
        }
        title={name}
        subheader={theme}
      />
      <CardActionArea>
        <Menu
          anchorEl={isOpened}
          open={!!isOpened}
          onClose={() => setIsOpened(null)}
        >
          <MenuItem
            onClick={() =>
              navigate(
                generatePath(ROUTE_PATHS.CollectionId, {
                  id: id,
                  userId: userData?.id,
                })
              )
            }
          >
            {t("features.CollectionPage.CollectionCard.buttons.edit")}
          </MenuItem>
          {/*todo сделать модалку на удаление*/}
          <MenuItem onClick={() => deleteCollection(id)}>
            {t("general.delete")}
          </MenuItem>
        </Menu>
        <Box
          onClick={() =>
            navigate(
              generatePath(ROUTE_PATHS.Items, {
                collectionId: id,
                collectionName: name,
              })
            )
          }
        >
          <CardMedia
            component="img"
            height="194"
            image={imgSrc}
            alt="Collection img"
          />
          <CardContent>
            <Typography
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(description),
              }}
            />
          </CardContent>
          <Box display="flex" justifyContent="flex-end" p="5px 15px">
            <Typography fontSize="10px" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
