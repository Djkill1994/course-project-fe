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
import { MoreVert } from "@mui/icons-material";
import {
  ICollection,
  useDeleteCollectionMutation,
  useGetCollectionsQuery,
} from "../api/collections.api";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { useNavigate, generatePath } from "react-router-dom";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";

export const CollectionCard: FC<
  Omit<ICollection, "optionFields" | "fields">
> = ({ theme, description, date, name, imgSrc, id }) => {
  const [isOpened, setIsOpened] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteCollection] = useDeleteCollectionMutation();
  const { data: collectionsData } = useGetCollectionsQuery();
  const { data: userData } = useAuthRefreshQuery();
  //todo зарефать 2 вызова IconButton
  return (
    <Card>
      <CardHeader
        action={collectionsData?.map((collection) =>
          collection.id === id ? (
            <IconButton
              key={id}
              onClick={({ currentTarget }) => setIsOpened(currentTarget)}
            >
              <MoreVert />
            </IconButton>
          ) : undefined
        )}
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
          {/*todo сделать модалку на удаление*/}
          <MenuItem onClick={() => deleteCollection(id)}>
            {t("general.delete")}
          </MenuItem>
        </Menu>
        <Box
          onClick={() =>
            navigate(generatePath(ROUTE_PATHS.Items, { id: id }), {
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
