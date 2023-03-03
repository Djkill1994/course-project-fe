import { CloudDownload } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUploadImage } from "../hooks/useUploadImage";

interface IProps {
  onChange: (imgSrc: string) => void;
  imgSrc?: string;
  avatar?: boolean;
  avatarSize?: string;
}

export const UploadImages: FC<IProps> = ({
  onChange,
  imgSrc,
  avatar,
  avatarSize,
}) => {
  const { isLoading, url, uploadImage } = useUploadImage();
  const { t } = useTranslation();

  useEffect(() => {
    if (url) {
      onChange(url);
    }
  }, [url]);

  return (
    <Stack
      sx={{ cursor: "pointer" }}
      component="label"
      alignItems="center"
      gap="8px"
    >
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={({ target: { files } }) => uploadImage(files?.[0])}
      />
      {isLoading ? (
        <Box display="flex" justifyContent="space-evenly">
          <CircularProgress />
        </Box>
      ) : avatar ? (
        <Avatar src={imgSrc} sx={{ width: avatarSize, height: avatarSize }} />
      ) : (
        <Stack direction="column" alignItems="center">
          {imgSrc ? (
            <CardMedia
              component="img"
              height="194"
              image={imgSrc}
              alt="Collection img"
            />
          ) : (
            <CloudDownload />
          )}
          <Typography variant="body2">{t("general.uploadImages")}</Typography>
        </Stack>
      )}
      {avatar && (
        <Typography variant="body2">
          {t("features.Auth.downloadAvatar")}
        </Typography>
      )}
    </Stack>
  );
};
