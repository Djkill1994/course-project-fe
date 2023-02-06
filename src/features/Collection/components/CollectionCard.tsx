import { FC } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ICollection } from "../api/collections.api";

export const CollectionCard: FC<ICollection> = ({
  theme,
  description,
  date,
  name,
  imgSrc,
  id,
}) => {
  return (
    <Card key={id} sx={{ width: 345 }}>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={theme}
      />
      <CardMedia
        component="img"
        height="194"
        image={imgSrc}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p="5px 15px">
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </Box>
    </Card>
  );
};
