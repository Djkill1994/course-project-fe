import {
  Typography,
  List,
  TextField,
  Stack,
  Button,
  IconButton,
  Drawer,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { FC, useEffect } from "react";
import {
  Add,
  ChevronRight,
  DeleteForever,
  ExpandMore,
} from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CollectionFields } from "./CollectionFields";
import {
  ICollection,
  useGetCollectionQuery,
  useSettingsCollectionMutation,
} from "../api/collections.api";
import { useParams } from "react-router-dom";
import { UploadImages } from "../../../common/components/UploadImages";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

interface IProps {
  onClose: () => void;
}

// todo перевести поля????, зарефачить код,

type SettingsForm = Pick<
  ICollection,
  "name" | "fields" | "optionFields" | "theme" | "description" | "imgSrc"
>;

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const params = useParams();
  const { data } = useGetCollectionQuery(params.id as string);
  const [settingsCollection, { isLoading, isSuccess }] =
    useSettingsCollectionMutation();
  const { register, handleSubmit, setValue, watch } = useForm<SettingsForm>({
    defaultValues: {
      name: data?.name,
      theme: data?.theme,
      description: data?.description,
      imgSrc: data?.imgSrc,
      fields: data?.fields,
      optionFields: data?.optionFields,
    },
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<SettingsForm> = (data) => {
    settingsCollection({
      collectionId: params?.id,
      settingsCollectionForm: {
        name: data.name,
        theme: data.theme,
        description: data.description,
        imgSrc: data.imgSrc,
        fields: data.fields,
        optionFields: data.optionFields,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

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
              {t(
                "features.CollectionPage.CollectionSettingsDrawer.buttons.delete"
              )}
            </Typography>
          </IconButton>
        </Stack>
        <Typography pb="22px">
          {t("features.CollectionPage.CollectionSettingsDrawer.editCollection")}
        </Typography>
        <Stack
          gap="18px"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            fullWidth
            size="small"
            label={t(
              "features.CollectionPage.CollectionSettingsDrawer.labels.name"
            )}
            {...register("name", { required: true })}
          />
          <TextField
            fullWidth
            size="small"
            label={t(
              "features.CollectionPage.CollectionSettingsDrawer.labels.theme"
            )}
            {...register("theme", { required: true })}
          />
          <TextField
            fullWidth
            size="small"
            label={t(
              "features.CollectionPage.CollectionSettingsDrawer.labels.description"
            )}
            {...register("description", { required: true })}
          />
          <UploadImages
            onChange={(imgSrc) => setValue("imgSrc", imgSrc)}
            imgSrc={watch("imgSrc")}
          />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {t("features.CollectionPage.CollectionSettingsDrawer.fields")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap="8px">
                {watch("fields")?.map((field) => (
                  <CollectionFields
                    key={field.name}
                    defaultValue={field}
                    onChange={(value) => setValue("fields", [value])}
                  />
                ))}
                {watch("optionFields")?.map((optionField) => (
                  <CollectionFields
                    key={optionField.name}
                    defaultValue={optionField}
                    onChange={(value) => setValue("optionFields", [value])}
                  />
                ))}
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none" }}
                  fullWidth
                  //todo добавлять разные цифры то бы не повторялись
                  onClick={() =>
                    setValue("optionFields", [
                      {
                        name: t(
                          "features.CollectionPage.CollectionSettingsDrawer.newField"
                        ),
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
          <LoadingButton variant="contained" loading={isLoading} type="submit">
            {t("features.CollectionPage.CollectionSettingsDrawer.buttons.send")}
          </LoadingButton>
        </Stack>
      </List>
    </Drawer>
  );
};
