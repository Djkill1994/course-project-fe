import { Accordion, AccordionDetails, Button, Stack } from "@mui/material";
import { FC } from "react";
import { Add } from "@mui/icons-material";
import { CollectionFields } from "./CollectionFields";
import { incrementString } from "../../../common/utils/incrementString";
import { useTranslation } from "react-i18next";
import { IOptionalFields } from "../api/collections.api";

const generateOptionFieldName = (optionalFields: IOptionalFields[]): string => {
  let optionFieldName = incrementString("newOptionField0");
  while (optionalFields?.some(({ name }) => name === optionFieldName)) {
    optionFieldName = incrementString(optionFieldName);
  }
  return optionFieldName;
};

interface IProps {
  optionalFields: IOptionalFields[];
  onChange: (optionalFields: IOptionalFields[]) => void;
}

export const AddedNewField: FC<IProps> = ({ optionalFields, onChange }) => {
  const { t } = useTranslation();
  return (
    <Accordion>
      <AccordionDetails>
        <Stack gap="8px">
          {optionalFields?.map((optionField, index) => (
            <CollectionFields
              key={index}
              defaultValue={optionField}
              onChange={(value) =>
                onChange([
                  ...optionalFields.map((optionField, newIndex) =>
                    index === newIndex ? value : optionField
                  ),
                ])
              }
            />
          ))}
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
            fullWidth
            onClick={() =>
              onChange([
                ...optionalFields,
                {
                  name: generateOptionFieldName(optionalFields),
                  type: "string",
                },
              ])
            }
          >
            <Add sx={{ width: "14px" }} />{" "}
            {t(
              "features.CollectionPage.CollectionSettingsDrawer.buttons.newField"
            )}
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
