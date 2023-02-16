import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import defaultImg from "../../../../public/defaulImg.jpg";

interface IProps {
  open: () => void;
}

export const ItemCard: FC<IProps> = ({ open }) => {
  return (
    <Card>
      <CardActionArea onClick={open}>
        <CardMedia
          component="img"
          height="194"
          image={defaultImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Item name
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
            <Chip
              size="small"
              label="Nordic"
              variant="outlined"
              color="primary"
            />
            <Chip
              size="small"
              label="Nordic"
              variant="outlined"
              color="primary"
            />
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
