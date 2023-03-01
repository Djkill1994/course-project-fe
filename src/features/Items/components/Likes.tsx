import { Favorite } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ILike, useLikeMutation, useUnLikeMutation } from "../api/item.api";

interface IProps {
  likes: ILike;
  userId: string;
  itemId: string;
}

export const Likes: FC<IProps> = ({ likes, userId, itemId }) => {
  const [like] = useLikeMutation();
  const [unLike] = useUnLikeMutation();
  return (
    <Stack alignItems="center">
      {likes?.sender?.includes(userId) ? (
        <IconButton
          onClick={() => unLike({ itemId: itemId, like: { sender: userId } })}
        >
          <Favorite color="error" />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => like({ itemId: itemId, like: { sender: userId } })}
        >
          <Favorite />
        </IconButton>
      )}
      <Typography>{likes?.count}</Typography>
    </Stack>
  );
};
