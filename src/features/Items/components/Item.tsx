import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Modal,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect } from "react";
import { Close, Info, Send } from "@mui/icons-material";
import {
  IComment,
  IItem,
  useCreateCommentMutation,
  useGetItemQuery,
} from "../api/item.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { generatePath, useNavigate } from "react-router-dom";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import { useTranslation } from "react-i18next";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { ROUTE_PATHS } from "../../../App";

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
  const deviceMediaQuery = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
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
            ? {
                display: "flex",
                m: "10px auto",
                alignItems: "center",
                width: "70vw",
              }
            : { flexDirection: "column", overflow: "auto", width: "100%" }
        }
      >
        <IconButton
          size="large"
          sx={{
            position: "absolute",
            top: { xs: 0, sm: "20px" },
          }}
          onClick={onClose}
        >
          <Close color="primary" />
        </IconButton>
        <CardMedia
          sx={deviceMediaQuery ? { width: "55%" } : undefined}
          component="img"
          image={itemData?.imgSrc}
          alt="Image"
        />
        <Box
          display="flex"
          flexDirection="column"
          width={deviceMediaQuery ? "45%" : undefined}
          sx={{ height: { sm: "100%" } }}
        >
          <CardContent
            sx={{
              "&:last-child": { p: "12px 12px 6px" },
              overflow: "auto",
              height: "100%",
            }}
          >
            <Stack height="100%" justifyContent="space-between">
              <Stack
                height="100%"
                direction="column"
                alignItems="space-between"
                gap="8px"
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <Avatar src={itemData?.author?.avatarSrc} />
                  <Typography>{itemData?.author?.userName}</Typography>
                </Stack>
                <Stack height="100%" gap="8px">
                  <Typography variant="h5">{itemData?.name}</Typography>
                  <Stack gap="4px" flexWrap="wrap" direction="row">
                    {itemData?.tags.map(({ tag, id }) => (
                      <Chip
                        onClick={() =>
                          navigate(
                            generatePath(ROUTE_PATHS.FoundTags, {
                              id: id,
                              tagName: tag,
                            })
                          )
                        }
                        key={id}
                        label={tag}
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Stack>
                  {itemData?.optionalFields.length ? (
                    <Box>
                      <IconButton
                        size="small"
                        color="warning"
                        sx={{ textTransform: "none" }}
                        {...bindTrigger(popupState)}
                      >
                        <Info />
                        <Typography pl="6px" fontSize="14px">
                          {t("features.Item.additionInformation")}
                        </Typography>
                      </IconButton>
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
                          {itemData?.optionalFields.map(
                            ({ name, value }, index) => (
                              <Stack key={index} direction="row" gap="8px">
                                <Typography fontWeight="bold">
                                  {name}:
                                </Typography>
                                <Typography>{value}</Typography>
                              </Stack>
                            )
                          )}
                        </Box>
                      </Popover>
                    </Box>
                  ) : undefined}
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
                {userData && (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      label={t("features.Item.comment")}
                      {...register("comment", { required: true })}
                    />
                    <IconButton type="submit">
                      <Send />
                    </IconButton>
                  </>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Modal>
  );
};
