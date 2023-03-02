import { FC, useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  ListItemIcon,
  MenuItem,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add, FileDownload, Settings, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  useDeleteItemMutation,
  useGetCollectionQuery,
} from "../api/collections.api";
import MaterialReactTable from "material-react-table";
import { CollectionSettingsDrawer } from "./CollectionSettingsDrawer";
import { useModal } from "../../../common/hooks/useModal";
import { ItemDrawer } from "./ItemDrawer";
import csvDownload from "json-to-csv-export";
import { useParams } from "react-router-dom";
import i18n from "../../../common/i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import {
  useCreateItemMutation,
  useGetItemQuery,
  useSettingsItemMutation,
} from "../../Items/api/item.api";
import { logOutUser } from "../../../common/utils/logOutUser";

export const CollectionTable: FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [openId, setOpenId] = useState<string>("");
  const [createItem, { isLoading: isCreateItemLoading }] =
    useCreateItemMutation();
  const { data: collectionData, isLoading: isCollectionLoading } =
    useGetCollectionQuery(params.id as string);
  const [settingsItem, { isLoading: settingItemLoading }] =
    useSettingsItemMutation();
  const { data: itemData, isLoading: isItemLoading } = useGetItemQuery(openId, {
    skip: !openId,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [deleteItem, { isLoading }] = useDeleteItemMutation();
  const {
    isOpened: isOpenedSettings,
    open: openSettings,
    close: closeSettings,
  } = useModal();
  const {
    isOpened: isOpenedNewItem,
    open: openNewItem,
    close: closeNewItem,
  } = useModal();
  const deviceMediaQuery = useMediaQuery("(min-width:600px)");

  return (
    <Paper sx={{ width: "100%" }}>
      {isOpenedSettings && <CollectionSettingsDrawer onClose={closeSettings} />}
      {isOpenedNewItem && (
        <ItemDrawer
          defaultValues={{ optionalFields: collectionData?.optionalFields }}
          isLoading={isCreateItemLoading}
          onClose={closeNewItem}
          onSubmit={(data) =>
            createItem({
              collectionId: params.id as string,
              newItem: {
                optionalFields: data.optionalFields,
                name: data.name,
                imgSrc:
                  data.imgSrc ||
                  "https://res.cloudinary.com/djkill/image/upload/c_limit,h_200,w_200/v1677759119/default-item-logo_r09x9c.jpg",
                tags: data.tags,
              },
            })
          }
        />
      )}
      {openId && !isItemLoading && (
        <ItemDrawer
          isEditMode
          defaultValues={itemData}
          isLoading={settingItemLoading}
          onClose={() => setOpenId("")}
          onSubmit={(data) =>
            settingsItem({
              itemId: openId,
              settingsItem: data,
            })
          }
        />
      )}
      <MaterialReactTable
        enableColumnFilters={false}
        data={
          collectionData?.items?.map((item) =>
            item.optionalFields.reduce(
              (item, field) => ({ ...item, [field.name]: field.value }),
              item
            )
          ) || []
        }
        localization={
          i18n.language === "en" ? MRT_Localization_EN : MRT_Localization_RU
        }
        renderTopToolbarCustomActions={({ table }) => (
          <Stack direction="row" gap="12px" alignItems="space-between">
            <Button
              variant="contained"
              size="small"
              startIcon={<Settings />}
              sx={{ textTransform: "none" }}
              onClick={openSettings}
            >
              {t(
                "features.CollectionPage.CollectionTableToolbar.collectionSettings"
              )}
            </Button>
            <Button
              onClick={openNewItem}
              variant="contained"
              size="small"
              startIcon={<Add />}
              sx={{ textTransform: "none" }}
            >
              {t("features.CollectionPage.CollectionTableToolbar.newItem")}
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<FileDownload />}
              sx={{ textTransform: "none" }}
              onClick={() =>
                csvDownload({
                  data: collectionData?.items?.map((item) => ({
                    ...item,
                    tags: item.tags?.map(({ tag }) => tag).join(","),
                    optionalFields: item.optionalFields
                      ?.map(({ name, value }) => `${name}: ${value}`)
                      .join(","),
                  })),
                  filename: "csvFile",
                  delimiter: ",",
                  headers: [
                    t("features.CollectionPage.CollectionTableHeader.id"),
                    t("features.CollectionPage.CollectionTableHeader.name"),
                    "Optional fields",
                    t("features.CollectionPage.CollectionTableHeader.img"),
                    t("features.CollectionPage.CollectionTableHeader.tags"),
                  ],
                })
              }
            >
              {t("features.CollectionPage.CollectionTableToolbar.exportData")}
            </Button>
            {!!Object.keys(rowSelection).length && (
              <LoadingButton
                variant="contained"
                size="small"
                startIcon={<Delete />}
                sx={{ textTransform: "none" }}
                loading={isLoading}
                onClick={() =>
                  table.getSelectedRowModel().flatRows.map((row) => {
                    deleteItem(row.getValue("id"));
                  })
                }
              >
                {t("general.delete")}
              </LoadingButton>
            )}
          </Stack>
        )}
        muiSearchTextFieldProps={{
          variant: "outlined",
        }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{
          rowSelection,
          isLoading: isCollectionLoading,
        }}
        enableRowActions
        renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
          <MenuItem
            key={0}
            onClick={() => {
              setOpenId(original.id);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            {t("features.CollectionPage.CollectionTableHeader.edit")}
          </MenuItem>,
        ]}
        columns={[
          {
            accessorKey: "id",
            header: t("features.CollectionPage.CollectionTableHeader.id"),
          },
          {
            accessorKey: "name",
            header: t("features.CollectionPage.CollectionTableHeader.name"),
          },
          {
            enableColumnActions: false,
            enableSorting: false,
            accessorKey: "imgSrc",
            header: t("features.CollectionPage.CollectionTableHeader.img"),
            Cell: ({ renderedCellValue }) => <Avatar src={renderedCellValue} />,
          },
          {
            accessorFn: (row) => row.tags.map(({ tag }) => tag).join(" "),
            header: t("features.CollectionPage.CollectionTableHeader.tags"),
            Cell: ({ row: { original } }) => (
              <Stack direction="row" gap="4px">
                {original.tags?.map(({ id, tag }) => (
                  <Chip key={id} label={tag} variant="outlined" color="primary">
                    {tag}
                  </Chip>
                ))}
              </Stack>
            ),
          },
          ...(collectionData?.optionalFields || [])?.map(({ name }) => ({
            accessorKey: name,
            header: name.charAt(0).toUpperCase() + name.slice(1),
          })),
        ]}
      />
    </Paper>
  );
};
