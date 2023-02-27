import { CloudDownload } from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUploadImage } from "../hooks/useUploadImage";

interface IProps {
  onChange: (imgSrc: string) => void;
  imgSrc?: string;
}

export const UploadImages: FC<IProps> = ({ onChange, imgSrc }) => {
  const { isLoading, url, uploadImage } = useUploadImage();
  const { t } = useTranslation();

  useEffect(() => {
    if (url) {
      onChange(url);
    }
  }, [url]);

  return (
    <Box sx={{ cursor: "pointer" }} component="label">
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={({ target: { files } }) => uploadImage(files?.[0])}
      />
      {isLoading ? (
        <CircularProgress />
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
    </Box>
  );
};
