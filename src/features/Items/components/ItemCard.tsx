import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Favorite } from "@mui/icons-material";
import { Item } from "./Item";
import { useModal } from "../../../common/hooks/useModal";
import { IItem, useGetItemQuery } from "../api/item.api";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../App";

export const ItemCard: FC<
  Omit<IItem, "comments" | "tags" | "optionalFields">
> = ({ name, imgSrc, id, likes, date }) => {
  const navigate = useNavigate();
  const { isOpened, open, close } = useModal();
  const { data } = useGetItemQuery(id);

  return (
    <Card sx={{ overflow: "auto" }}>
      {isOpened && <Item id={id} onClose={close} />}
      <CardActionArea onClick={open}>
        <CardMedia component="img" height="194" image={imgSrc} alt="Image" />
      </CardActionArea>
      <CardContent>
        <Box height="100px" sx={{ overflow: "auto" }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Stack direction="row" gap="4px" flexWrap="wrap" alignItems="center">
            {data?.tags.map(({ tag, id }) => (
              <Chip
                onClick={() =>
                  navigate(
                    generatePath(ROUTE_PATHS.FoundTags, {
                      id: id,
                      tagName: tag,
                    })
                  )
                }
                key={id}
                label={tag}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
      <Stack
        direction="row"
        justifyContent="space-between"
        p="0 8px 4px 8px"
        alignItems="center"
      >
        <Typography display="flex" gap="4px">
          <Favorite color="error" /> {likes?.count}
        </Typography>
        <Typography fontSize="10px" color="text.secondary">
          {date}
        </Typography>
      </Stack>
    </Card>
  );
};
