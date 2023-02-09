import {
  Box,
  Typography,
  List,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { FC, useState } from "react";
import {
  Add,
  ExpandMore,
  ChevronRight,
  DeleteForever,
} from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  onClose: () => void;
}

// todo перевести,

interface ISettingsForm {
  nameCollection: string;
  type: string;
  minLength: number | null;
  maxLength: number | null;
}

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const [select, setSelect] = useState("");
  const { register, handleSubmit, reset, control } = useForm<ISettingsForm>({
    defaultValues: {
      nameCollection: "CollectionPage NAME",
      type: "",
      minLength: null,
      maxLength: null,
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Name</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" flexWrap="wrap" gap="10px">
                  <FormControl sx={{ minWidth: "222px" }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      {...register("type", { required: true })}
                      value={select}
                      label="Type"
                      onChange={({ target: { value } }) => setSelect(value)}
                    >
                      <MenuItem value="string">String</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="boolean">Boolean</MenuItem>
                      <MenuItem value="date">Data</MenuItem>
                      <MenuItem value="text">Text</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Name"
                    {...register("nameCollection", { required: true })}
                  />
                  <TextField
                    label="Min length"
                    {...register("minLength", { required: true })}
                  />
                  <TextField
                    label="Max length"
                    {...register("maxLength", { required: true })}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              fullWidth
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
