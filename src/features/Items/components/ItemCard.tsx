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

interface IProps {
  id: string;
  name: string;
  imgSrc: string;
}
// todo ошибки в консоле из за модал , зарефачть
export const ItemCard: FC<IProps> = ({ name, imgSrc, id }) => {
  const { isOpened, open, close } = useModal();
  return (
    <Card>
      {isOpened && (
        <Modal open onClose={close} sx={{ display: "flex" }}>
          <Item id={id} />
        </Modal>
      )}
      <CardActionArea onClick={open}>
        <CardMedia
          component="img"
          height="194"
          image={imgSrc}
          alt="green iguana"
        />
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
              label="Nordic"
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
