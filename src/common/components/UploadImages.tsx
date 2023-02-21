import { CloudDownload } from "@mui/icons-material";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { uploadImage } from "../utils/uploadImage";
//todo типизировать setValue and watch
interface IProps {
  setValue: (name: string, value: string) => string;
  watch: (value: string) => string;
}

export const UploadImages: FC<IProps> = ({ setValue, watch }) => {
  return (
    <Box sx={{ cursor: "pointer" }} component="label">
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={async ({ target: { files } }) => {
          setValue("imgSrc", await uploadImage(files?.[0]));
        }}
      />
      <Stack direction="column" alignItems="center">
        {watch("imgSrc") ? (
          <CardMedia
            component="img"
            height="194"
            image={watch("imgSrc")}
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
