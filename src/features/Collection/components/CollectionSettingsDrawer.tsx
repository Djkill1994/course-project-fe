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

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const [newField, setNewField] = useState(false);
  const { register, handleSubmit } = useForm<ISettingsForm>({
    defaultValues: {
      nameCollection: "Names",
      nameFieldName: "",
      nameFieldDescription: "",
      typeFieldName: "",
      typeFieldDescription: "",
      minLengthFieldName: null,
      minLengthFieldDescription: null,
      maxLengthFieldName: null,
      maxLengthFieldDescription: null,
    },
  });

  const onSubmit: SubmitHandler<ISettingsForm> = (data) => {
    console.log(data);
  };

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <Stack direction="row" justifyContent="space-between">
          <IconButton onClick={onClose}>
            <ChevronRight />
          </IconButton>
          <IconButton size="small" sx={{ textTransform: "none" }}>
            <DeleteForever color="error" />
            <Typography fontSize="14px" color="error">
              Delete
            </Typography>
          </IconButton>
        </Stack>
        <Stack gap="18px">
          <Typography>Edit collection</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Name"
              {...register("nameCollection", { required: true })}
            />
            <Typography>Fields</Typography>
            <Stack gap="4px">
              <CollectionFields
                fieldName="Name"
                registerType={register("typeFieldName")}
                registerName={register("nameFieldName")}
                registerMinLength={register("minLengthFieldName")}
                registerMaxLength={register("maxLengthFieldName")}
              />
              <CollectionFields
                fieldName="Description"
                registerType={register("typeFieldDescription")}
                registerName={register("nameFieldDescription")}
                registerMinLength={register("minLengthFieldDescription")}
                registerMaxLength={register("maxLengthFieldDescription")}
              />
              {newField && (
                <CollectionFields
                  fieldName="New field"
                  registerType={register("typeFieldDescription")}
                  registerName={register("nameFieldDescription")}
                  registerMinLength={register("minLengthFieldDescription")}
                  registerMaxLength={register("maxLengthFieldDescription")}
                />
              )}
              {/*<CollectionFields fieldName="Theme" register={register} />*/}
              {/*<CollectionFields fieldName="Image" register={register} />*/}
            </Stack>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              fullWidth
              onClick={() => setNewField(true)}
            >
              <Add sx={{ width: "14px" }} /> New field
            </Button>
            <Button type="submit">Save</Button>
          </Box>
        </Stack>
      </List>
    </Drawer>
  );
};
