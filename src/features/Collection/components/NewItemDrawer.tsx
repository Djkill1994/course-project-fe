import {
  Box,
  Typography,
  List,
  TextField,
  Stack,
  Button,
  IconButton,
  Drawer,
  CardMedia,
} from "@mui/material";
import { FC, useState } from "react";
import { ChevronRight, CloudDownload } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationForm } from "../../Auth/components/RegistrationForm";
import { useRegistrationMutation } from "../../Auth/api/registration.api";
import { useCreateItemMutation } from "../../Items/api/item.api";
import { useParams } from "react-router-dom";

interface IProps {
  onClose: () => void;
}

// todo перевести, зарефачить код, добавление полей доработать

interface INewItemForm {
  collectionId: string;
  name: string;
  imgSrc: string;
}

export const NewItemDrawer: FC<IProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue, watch } = useForm<INewItemForm>();
  // todo доработать компонент , на загрузку и успешное создание реализовать логику
  const [createItem, { isSuccess, isLoading }] = useCreateItemMutation();
  const params = useParams();
  // todo collectionId зарефачить ошибку
  const onSubmit: SubmitHandler<INewItemForm> = (data) => {
    createItem({
      collectionId: params.id,
      name: data.name,
      imgSrc: data.imgSrc,
    });
  };

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Stack gap="18px">
          <Typography>New item</Typography>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            gap="18px"
          >
            <TextField
              fullWidth
              size="small"
              label="Name"
              {...register("name", { required: true })}
            />
            <Box sx={{ cursor: "pointer" }} component="label">
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={async ({ target: { files } }) => {
                  const img = new FormData();
                  img.append("file", files[0]);
                  img.append("upload_preset", "course-prt");
                  img.append("cloud_name", "djkill");
                  const { url } = await fetch(
                    "https://api.cloudinary.com/v1_1/djkill/image/upload",
                    {
                      method: "post",
                      body: img,
                    }
                  ).then((resp) => resp.json());
                  setValue("imgSrc", url);
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
                <Typography variant="body2">Download images</Typography>
              </Stack>
            </Box>
            <Button type="submit">Save</Button>
          </Stack>
        </Stack>
      </List>
    </Drawer>
  );
};
