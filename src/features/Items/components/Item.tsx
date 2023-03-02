import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Modal,
  Popover,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Send, Close } from "@mui/icons-material";
import {
  IComment,
  IItem,
  useCreateCommentMutation,
  useGetItemQuery,
} from "../api/item.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import { useTranslation } from "react-i18next";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";

type CommentForm = Pick<IComment, "sender" | "comment">;
interface IProps {
  onClose: () => void;
}

export const Item: FC<Pick<IItem, "id"> & IProps> = ({ id, onClose }) => {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const { data: userData } = useAuthRefreshQuery();
  const { data: itemData, isLoading } = useGetItemQuery(id, {
    pollingInterval: 2000,
  });
  const [createComment, { isSuccess }] = useCreateCommentMutation();
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState<null | HTMLElement>(null);
  const deviceMediaQuery = useMediaQuery("(min-width:600px)");

  const popupState = usePopupState({
    variant: "popover",
    popupId: "popover",
  });

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

  if (isLoading) {
    return (
      <Box position="absolute" top="50%" left="50%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Modal open onClose={onClose} sx={{ display: "flex" }}>
      <Card
        sx={
          deviceMediaQuery
            ? { display: "flex", m: "10px auto" }
            : { flexDirection: "column", overflow: "auto" }
        }
      >
        <CardMedia
          sx={deviceMediaQuery ? { width: "50%" } : undefined}
          component="img"
          image={itemData?.imgSrc}
          alt="Image"
        />
        {!deviceMediaQuery && (
          // todo подправить кнопку
          <IconButton
            size="large"
            sx={{
              position: "absolut",
              bottom: "76%",
              left: "6%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
        )}
        <Box display="flex" flexDirection="column" width="100%">
          <CardContent
            sx={{ height: "100%", "&:last-child": { p: "12px 12px 6px" } }}
          >
            <Stack height="100%" justifyContent="space-between">
              <Stack direction="column" alignItems="space-between" gap="22px">
                <Stack direction="row" alignItems="center" gap="8px">
                  <Avatar src={itemData?.author?.avatarSrc} />
                  <Typography>{itemData?.author?.userName}</Typography>
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
                  <Box>
                    <Button
                      size="small"
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      {t("features.Item.additionInformation")}
                    </Button>
                    <Popover
                      sx={{ padding: "10px" }}
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Box p="5px">
                        {itemData?.optionalFields.map(({ name, value, id }) => (
                          <Stack key={id} direction="row" gap="8px">
                            <Typography fontWeight="bold">{name}:</Typography>
                            <Typography>{value}</Typography>
                          </Stack>
                        ))}
                      </Box>
                    </Popover>
                  </Box>
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
