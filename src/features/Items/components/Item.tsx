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
  Modal,
} from "@mui/material";
import { FC, useEffect } from "react";
import { Favorite, Send } from "@mui/icons-material";
import {
  IComment,
  IItem,
  useCreateCommentMutation,
  useGetItemQuery,
  useLikeMutation,
  useUnLikeMutation,
} from "../api/item.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import { useChatScroll } from "../../../common/hooks/useChatScroll";
import { useModal } from "../../../common/hooks/useModal";

// todo перевести i18n реализовать запросы на бэк и рендеринг компонентов, переделать немного по аналогии с pinterest комментарии добавить в Collapse, разобратся с получением данных из пропсов и запросом , какой-то возможно убрать

type CommentForm = Pick<IComment, "sender" | "comment">;

export const Item: FC<Omit<IItem, "comments">> = ({ name, imgSrc, id }) => {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const { data: userData } = useAuthRefreshQuery();
  const { data: itemData } = useGetItemQuery(id, {
    pollingInterval: 2000,
  });
  const [like] = useLikeMutation();
  const [unLike] = useUnLikeMutation();
  const [createComment, { isSuccess }] = useCreateCommentMutation();
  const ref = useChatScroll(itemData?.comments || []);
  const { isOpened, open, close } = useModal();

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    createComment({
      itemId: id,
      newComment: {
        sender: userData?.userName,
        comment: data.comment,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <Card sx={{ display: "flex", width: "80vw", height: "80vh", m: "auto" }}>
      {isOpened && (
        <Modal open>
          <Stack alignItems="center">
            <CardMedia
              sx={{ height: "100vh", width: "auto", cursor: "zoom-out" }}
              onClick={close}
              component="img"
              image={imgSrc}
              alt="Item images"
            />
          </Stack>
        </Modal>
      )}
      <CardMedia
        onClick={open}
        component="img"
        sx={{ cursor: "zoom-in" }}
        image={imgSrc}
        alt="Item images"
      />
      <Box display="flex" flexDirection="column" width="100%">
        <CardContent
          sx={{ height: "100%", "&:last-child": { p: "12px 12px 6px" } }}
        >
          <Stack height="100%" justifyContent="space-between">
            <Stack direction="column" alignItems="space-between" gap="22px">
              <Stack direction="row" alignItems="center" gap="8px">
                <Avatar src={itemData?.author.avatarSrc} />
                <Typography>{itemData?.author.userName}</Typography>
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
                  <Stack
                    ref={ref}
                    maxHeight="200px"
                    sx={{ overflow: "auto" }}
                    border="1px solid #dbdbdb"
                    borderRadius="5px"
                    p="4px"
                    gap="4px"
                  >
                    {itemData?.comments.map((comment) => (
                      <Stack
                        sx={{ wordWrap: "break-word", overflow: "x:hidden" }}
                        direction="column"
                        key={id}
                        p="6px"
                        border="1px solid #dbdbdb"
                        borderRadius="14px"
                        gap="4px"
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack direction="row" alignItems="center" gap="8px">
                            <Avatar src={comment.sender.avatarSrc} />
                            <Typography fontWeight="bolder">
                              {comment.sender.userName}
                            </Typography>
                          </Stack>
                          <Box>
                            <Typography fontSize="10px" color="text.secondary">
                              {comment.date}
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography>{comment.comment}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
            <Stack
              alignItems="center"
              component="form"
              flexDirection="row"
              gap="6px"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack alignItems="center">
                {itemData?.likes.sender.includes(userData?.id) ? (
                  <IconButton
                    onClick={() =>
                      unLike({ itemId: id, like: { sender: userData?.id } })
                    }
                  >
                    <Favorite color="error" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      like({ itemId: id, like: { sender: userData?.id } })
                    }
                  >
                    <Favorite />
                  </IconButton>
                )}
                <Typography>{itemData?.likes.count}</Typography>
              </Stack>
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
