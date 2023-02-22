import { CloudDownload } from "@mui/icons-material";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { uploadImage } from "../utils/uploadImage";
//todo типизировать setValue and watch
interface IProps {
  onChange: (imgSrc: string) => void;
  imgSrc?: string;
}

export const UploadImages: FC<IProps> = ({ onChange, imgSrc }) => {
  return (
    <Box sx={{ cursor: "pointer" }} component="label">
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={async ({ target: { files } }) => {
          onChange(await uploadImage(files?.[0]));
        }}
      />
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
        <Typography variant="body2">Upload images</Typography>
      </Stack>
    </Box>
  );
};
