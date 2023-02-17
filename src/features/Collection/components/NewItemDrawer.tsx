import {
  Box,
  Typography,
  List,
  TextField,
  Stack,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { FC, useState } from "react";
import { Add, ChevronRight, DeleteForever } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CollectionFields } from "./CollectionFields";

interface IProps {
  onClose: () => void;
}

// todo перевести, зарефачить код, добавление полей доработать

interface ISettingsForm {
  nameCollection: string;
  nameFieldName: string;
  nameFieldDescription: string;
  typeFieldName: string;
  typeFieldDescription: string;
  minLengthFieldName: number | null;
  minLengthFieldDescription: number | null;
  maxLengthFieldName: number | null;
  maxLengthFieldDescription: number | null;
}

export const NewItemDrawer: FC<IProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<ISettingsForm>();

  const onSubmit: SubmitHandler<ISettingsForm> = (data) => {
    console.log(data);
  };

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Stack gap="18px">
          <Typography>New item</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Name"
              {...register("nameCollection", { required: true })}
            />
            <TextField
              label="Tags"
              {...register("nameCollection", { required: true })}
            />
            <Button type="submit">Save</Button>
          </Box>
        </Stack>
      </List>
    </Drawer>
  );
};
