import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Favorite } from "@mui/icons-material";
import { Item } from "./Item";
import { useModal } from "../../../common/hooks/useModal";
import { IItem, useGetItemQuery } from "../api/item.api";

// todo ошибки в консоле из за модал , зарефачть
export const ItemCard: FC<Omit<IItem, "comments">> = ({
  name,
  imgSrc,
  id,
  tags,
  likes,
  date,
}) => {
  const { isOpened, open, close } = useModal();
  const { data } = useGetItemQuery(id);

  return (
    <Card>
      {isOpened && (
        <Modal open onClose={close} sx={{ display: "flex" }}>
          <Item
            date={date}
            id={id}
            name={name}
            imgSrc={imgSrc}
            tags={tags}
            likes={likes}
          />
        </Modal>
      )}
      <CardActionArea onClick={open}>
        <CardMedia component="img" height="194" image={imgSrc} alt="Image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Tags
          </Typography>
          <Stack direction="row" gap="4px" flexWrap="wrap">
            {data?.tags.map(({ tag, id }) => (
              <Chip key={id} label={tag} variant="outlined" color="primary" />
            ))}
          </Stack>
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
      </CardActionArea>
    </Card>
  );
};
