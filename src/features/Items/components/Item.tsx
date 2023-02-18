import {
  Avatar,
  Box,
  Card,
  Stack,
  TextField,
  Typography,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
} from "@mui/material";
import { FC } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import { useGetItemQuery } from "../api/item.api";
// todo перевести i18n реализовать запросы на бэк и рендеринг компонентов, переделать немного по аналогии с pinterest комментарии добавить в Collapse

interface IProps {
  id: string;
}

export const Item: FC<IProps> = ({ id }) => {
  const { data } = useGetItemQuery(id);

  return (
    <Card sx={{ display: "flex", width: "80%", height: "480px", m: "auto" }}>
      <CardMedia
        component="img"
        sx={{ maxWidth: "55%" }}
        image={data?.imgSrc}
        alt="Item images"
      />
      <Box display="flex" flexDirection="column" width="100%">
        <CardContent sx={{ height: "100%" }}>
          <Stack height="100%" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap="8px">
              <Avatar />
              <Typography>UserName</Typography>
              <Typography>{data?.name}</Typography>
            </Stack>
            <Stack gap="4px" flexWrap="wrap" direction="row">
              <Chip label="Tatto" variant="outlined" />
              <Chip label="Skecth" variant="outlined" />
              <Chip label="Nordic" variant="outlined" />
            </Stack>
            <Box>
              Comments
              <Box
                maxHeight="200px"
                sx={{ overflow: "auto" }}
                border="1px solid #dbdbdb"
                borderRadius="5px"
                p="0 4px"
              >
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
                <Box>Comment</Box>
              </Box>
            </Box>
            <Stack flexDirection="row">
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <TextField fullWidth size="small" label="Comment" />
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
