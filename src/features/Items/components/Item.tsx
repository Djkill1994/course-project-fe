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
import { FavoriteBorder, Send } from "@mui/icons-material";
import {
  IComment,
  IItem,
  useCreateCommentMutation,
  useGetItemQuery,
} from "../api/item.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
// todo перевести i18n реализовать запросы на бэк и рендеринг компонентов, переделать немного по аналогии с pinterest комментарии добавить в Collapse, разобратся с получением данных из пропсов и запросом , какой-то возможно убрать

type CommentForm = Pick<IComment, "sender" | "comment">;

export const Item: FC<Omit<IItem, "comments">> = ({
  name,
  imgSrc,
  id,
  tags,
  likes,
}) => {
  const { register, handleSubmit } = useForm<CommentForm>();
  const { data: userData } = useAuthRefreshQuery();
  const { data: itemData } = useGetItemQuery(id);
  const [createComment] = useCreateCommentMutation();
  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    createComment({
      itemId: id,
      newComment: {
        sender: userData?.userName,
        comment: data.comment,
      },
    });
  };

  return (
    <Card sx={{ display: "flex", width: "80%", height: "480px", m: "auto" }}>
      <CardMedia
        component="img"
        sx={{ maxWidth: "55%" }}
        image={imgSrc}
        alt="Item images"
      />
      <Box display="flex" flexDirection="column" width="100%">
        <CardContent sx={{ height: "100%" }}>
          <Stack height="100%" justifyContent="space-between">
            <Stack direction="column" alignItems="space-between" gap="22px">
              <Stack direction="row" alignItems="center" gap="8px">
                <Avatar />
                <Typography>UserName</Typography>
              </Stack>
              <Stack gap="22px">
                <Typography variant="h5">{name}</Typography>
                <Stack gap="4px" flexWrap="wrap" direction="row">
                  {itemData?.tags.map(({ tag, id }) => (
                    <Chip
                      key={id}
                      label={tag}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
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
                    {itemData?.comments.map(({ sender, comment, id }) => (
                      <Stack key={id}>
                        <Box>{sender}</Box>
                        <Box>{comment}</Box>
                        {/*<Box>{date}</Box>*/}
                      </Stack>
                    ))}
                  </Box>
                </Box>
              </Stack>
            </Stack>

            <Stack
              component="form"
              flexDirection="row"
              onSubmit={handleSubmit(onSubmit)}
            >
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <TextField
                fullWidth
                size="small"
                label="Comment"
                {...register("comment", { required: true })}
              />
              <IconButton type="submit">
                <Send />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
