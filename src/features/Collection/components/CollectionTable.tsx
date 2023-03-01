import { FC, useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  ListItemIcon,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add, FileDownload, Settings } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  useDeleteItemMutation,
  useGetCollectionQuery,
} from "../api/collections.api";
import MaterialReactTable from "material-react-table";
import { CollectionSettingsDrawer } from "./CollectionSettingsDrawer";
import { useModal } from "../../../common/hooks/useModal";
import { NewItemDrawer } from "./NewItemDrawer";
import csvDownload from "json-to-csv-export";
import { useParams } from "react-router-dom";
import { ItemSettingsDrawer } from "./ItemSettingsDrawer";
import i18n from "../../../common/i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";

export const CollectionTable: FC = () => {
  const params = useParams();
  const { data: collectionData, isLoading: isCollectionLoading } =
    useGetCollectionQuery(params.id as string);
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
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string>("");

  return (
    <Paper sx={{ width: "100%" }}>
      {isOpenedSettings && <CollectionSettingsDrawer onClose={closeSettings} />}
      {isOpenedNewItem && <NewItemDrawer onClose={closeNewItem} />}
      {openId && (
        <ItemSettingsDrawer id={openId} onClose={() => setOpenId("")} />
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
              Collection settings
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
              Export All Data
            </Button>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={() =>
                table.getSelectedRowModel().flatRows.map((row) => {
                  deleteItem(row.getValue("id"));
                })
              }
            >
              {t("general.delete")}
            </LoadingButton>
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
