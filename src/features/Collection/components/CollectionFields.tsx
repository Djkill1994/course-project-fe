import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import { useForm } from "react-hook-form";

export interface ICollectionFieldsForm {
  name: string | undefined;
  type: string | undefined;
  minLength?: number;
  maxLength?: number;
}

interface IProps {
  fieldName: string;
  onChange: (fieldName: string, values: ICollectionFieldsForm) => void;
}

export const CollectionFields: FC<IProps> = ({ fieldName, onChange }) => {
  const { register, watch } = useForm<ICollectionFieldsForm>({
    defaultValues: {
      name: fieldName,
      type: "string",
    },
  });
  watch((data) => onChange(fieldName, { name: data.name, type: data.type }));

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{fieldName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" flexWrap="wrap" gap="10px">
          <FormControl sx={{ minWidth: "222px" }}>
            <InputLabel>Type</InputLabel>
            <Select {...register("type")} label="Type">
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
              <MenuItem value="date">Data</MenuItem>
              <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Name" {...register("name")} />
          {/*{select === "string" && (*/}
          {/*  <Stack gap="10px" direction="row">*/}
          {/*    <TextField label="Min length" {...register("minLength")} />*/}
          {/*    <TextField label="Max length" {...register("maxLength")} />*/}
          {/*  </Stack>*/}
          {/*)}*/}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
