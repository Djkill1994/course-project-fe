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
import { useState, FC } from "react";
import { useForm } from "react-hook-form";

export interface ICollectionFieldsForm {
  name: string;
  type: string;
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
  const [select, setSelect] = useState("string"); //todo убрать юз стейт
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
            <Select
              {...register("type")}
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
