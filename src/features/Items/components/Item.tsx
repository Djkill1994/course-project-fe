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
import { Send } from "@mui/icons-material";
import {
  IComment,
  IItem,
  useCreateCommentMutation,
  useGetItemQuery,
} from "../api/item.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import { useModal } from "../../../common/hooks/useModal";
import { useTranslation } from "react-i18next";
import { Comments } from "./Comments";
import { Likes } from "./Likes";

type CommentForm = Pick<IComment, "sender" | "comment">;
interface IProps {
  onClose: () => void;
}

export const Item: FC<Pick<IItem, "id"> & IProps> = ({ id, onClose }) => {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const { data: userData } = useAuthRefreshQuery();
  const { data: itemData } = useGetItemQuery(id, {
    pollingInterval: 2000,
  });

  const [createComment, { isSuccess }] = useCreateCommentMutation();
  const { isOpened, open, close } = useModal();
  const { t } = useTranslation();

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
    <Modal open onClose={onClose} sx={{ display: "flex" }}>
      <Card sx={{ display: "flex", width: "80vw", height: "80vh", m: "auto" }}>
        {isOpened && (
          <Modal open>
            <Stack alignItems="center">
              <CardMedia
                sx={{ height: "100vh", width: "auto", cursor: "zoom-out" }}
                onClick={close}
                component="img"
                image={itemData?.imgSrc}
                alt="Item images"
              />
            </Stack>
          </Modal>
        )}
        <CardMedia
          onClick={open}
          component="img"
          width="55%"
          sx={{ cursor: "zoom-in" }}
          image={itemData?.imgSrc}
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
                  <Typography variant="h5">{itemData?.name}</Typography>
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
                  <Comments comments={itemData?.comments} />
                </Stack>
              </Stack>
              <Stack
                alignItems="center"
                component="form"
                flexDirection="row"
                gap="6px"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Likes
                  likes={itemData?.likes}
                  userId={userData?.id}
                  itemId={id}
                />
                <TextField
                  fullWidth
                  size="small"
                  label={t("features.Item.comment")}
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
    </Modal>
  );
};
