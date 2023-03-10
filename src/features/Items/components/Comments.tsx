import { Avatar, Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useChatScroll } from "../../../common/hooks/useChatScroll";
import { IComment } from "../api/item.api";

interface IProps {
  comments?: IComment[];
}

export const Comments: FC<IProps> = ({ comments }) => {
  const { t } = useTranslation();
  const ref = useChatScroll(comments || []);

  return (
    <Stack height="100%">
      {t("features.Item.comments")}
      <Stack
        ref={ref}
        height="100%"
        sx={{ overflow: "auto", minHeight: "200px" }}
        border="1px solid #dbdbdb"
        borderRadius="5px"
        p="4px"
        gap="4px"
      >
        {comments?.map((comment, index) => (
          <Stack
            sx={{ wordWrap: "break-word", overflow: "x:hidden" }}
            direction="column"
            key={index}
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
                <Avatar src={comment?.sender?.avatarSrc} />
                <Typography fontWeight="bolder">
                  {comment?.sender?.userName}
                </Typography>
              </Stack>
              <Box>
                <Typography fontSize="10px" color="text.secondary">
                  {comment?.date}
                </Typography>
              </Box>
            </Stack>
            <Typography>{comment?.comment}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
