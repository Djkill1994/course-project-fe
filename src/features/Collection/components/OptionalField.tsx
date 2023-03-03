import { FC } from "react";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { IOptionalFieldsItem } from "../../Items/api/item.api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { convertStringToBoolean } from "../../../common/utils/convertStringToBoolean";

interface IProps {
  optionalField: IOptionalFieldsItem;
  optionalFields?: IOptionalFieldsItem[];
  index: number;
  onChange: (newOptionalFields: IOptionalFieldsItem[]) => void;
}

export const OptionalField: FC<IProps> = ({
  optionalField,
  index,
  optionalFields = [],
  onChange,
}) => {
  if (optionalField.type === "string") {
    return (
      <TextField
        value={optionalFields[index]?.value}
        key={index}
        fullWidth
        onChange={({ target: { value } }) =>
          onChange(
            optionalFields.map(
              (optionField, newIndex) =>
                (index === newIndex
                  ? { ...optionField, value }
                  : optionField) as IOptionalFieldsItem
            )
          )
        }
        size="small"
        label={optionalField.name}
      />
    );
  }

  if (optionalField.type === "number") {
    return (
      <TextField
        value={optionalFields[index]?.value}
        type="number"
        key={index}
        fullWidth
        onChange={({ target: { value } }) =>
          onChange(
            optionalFields.map(
              (optionField, newIndex) =>
                (index === newIndex
                  ? { ...optionField, value: +value }
                  : optionField) as IOptionalFieldsItem
            )
          )
        }
        size="small"
        label={optionalField.name}
      />
    );
  }

  if (optionalField.type === "boolean") {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={convertStringToBoolean(optionalFields[index]?.value)}
              onChange={({ target: { checked } }) =>
                onChange(
                  optionalFields.map(
                    (optionField, newIndex) =>
                      (index === newIndex
                        ? { ...optionField, value: checked + "" }
                        : optionField) as IOptionalFieldsItem
                  )
                )
              }
            />
          }
          label={optionalField.name}
        />
      </FormGroup>
    );
  }

  if (optionalField.type === "date") {
    return (
      <DateTimePicker
        value={optionalFields[index]?.value || null}
        label={optionalField.name}
        onChange={(value) =>
          onChange(
            optionalFields.map(
              (optionField, newIndex) =>
                (index === newIndex
                  ? { ...optionField, value }
                  : optionField) as IOptionalFieldsItem
            )
          )
        }
        renderInput={(params) => <TextField {...params} />}
      />
    );
  }

  if (optionalField.type === "text") {
    return (
      <TextField
        value={optionalFields[index]?.value}
        multiline
        minRows={4}
        maxRows={10}
        key={index}
        fullWidth
        onChange={({ target: { value } }) =>
          onChange(
            optionalFields.map(
              (optionField, newIndex) =>
                (index === newIndex
                  ? { ...optionField, value }
                  : optionField) as IOptionalFieldsItem
            )
          )
        }
        size="small"
        label={optionalField.name}
      />
    );
  }
  return null;
};
