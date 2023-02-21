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
import { Item } from "./Item";
import { useModal } from "../../../common/hooks/useModal";
import { IItem } from "../api/item.api";

// todo ошибки в консоле из за модал , зарефачть
export const ItemCard: FC<Pick<IItem, "name" | "tags" | "imgSrc" | "id">> = ({
  name,
  imgSrc,
  id,
  tags,
}) => {
  const { isOpened, open, close } = useModal();
  return (
    <Card>
      {isOpened && (
        <Modal open onClose={close} sx={{ display: "flex" }}>
          <Item id={id} />
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
            <Chip
              size="small"
              label={tags}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </CardContent>
        <Typography>Likes</Typography>
      </CardActionArea>
    </Card>
  );
};
