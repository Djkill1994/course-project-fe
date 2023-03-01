import { ChangeEvent, FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Box,
  InputAdornment,
  Avatar,
  Typography,
  Button,
  Stack,
  IconButton,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Settings, Add, FileDownload } from "@mui/icons-material";
import { CollectionTableToolbar } from "./CollectionTableToolbar";
import { CollectionTableHeader } from "./CollectionTableHeader";
import { useTranslation } from "react-i18next";
import {
  ICollection,
  useDeleteItemMutation,
  useGetCollectionQuery,
} from "../api/collections.api";
import { useParams } from "react-router-dom";
import { ItemSettingsDrawer } from "./ItemSettingsDrawer";
import MaterialReactTable from "material-react-table";
import { CollectionSettingsDrawer } from "./CollectionSettingsDrawer";
import { useModal } from "../../../common/hooks/useModal";
import { NewItemDrawer } from "./NewItemDrawer";
import csvDownload from "json-to-csv-export";

export const CollectionTable: FC<ICollection> = ({ collectionData }) => {
  // const [selected, setSelected] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string>("");
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

  const [rowSelection, setRowSelection] = useState({});

  // const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
  //   if (event.target.checked) {
  //     const newSelected = collectionData?.items?.map((item) => item.id);
  //     setSelected(newSelected || []);
  //   } else {
  //     setSelected([]);
  //   }
  // };

  // const handleClick = (event: React.MouseEvent, name: string): void => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: string[] = [];
  //
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //
  //   setSelected(newSelected);
  // };
  return (
    <Paper sx={{ width: "100%" }}>
      {isOpenedSettings && <CollectionSettingsDrawer onClose={closeSettings} />}
      {isOpenedNewItem && <NewItemDrawer onClose={closeNewItem} />}
      <MaterialReactTable
        enableColumnFilters={false}
        data={collectionData?.items || []}
        renderTopToolbarCustomActions={({ table }) => {
          const deleteSelected = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              deleteItem(row.getValue("id"));
            });
          };
          return (
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
                    data: collectionData,
                    filename: "csvFile",
                    delimiter: ",",
                    headers: collectionData?.items,
                  })
                }
              >
                Export All Data
              </Button>
              <LoadingButton
                variant="contained"
                loading={isLoading}
                onClick={deleteSelected}
              >
                {t("general.delete")}
              </LoadingButton>
            </Stack>
          );
        }}
        muiSearchTextFieldProps={{
          placeholder: "I18n translite",
          variant: "outlined",
        }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
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
            accessorKey: "tags",
            header: t("features.CollectionPage.CollectionTableHeader.tags"),
            Cell: ({ renderedCellValue }) =>
              renderedCellValue.map(({ tag, id }) => (
                <Chip key={id} label={tag} variant="outlined" color="primary" />
              )),
          },

          // {
          //   accessorKey: "optionalFields.name",
          //   header: "optionalFields.name",
          // Cell: ({ renderedCellValue }) =>
          //   renderedCellValue.map(({ tag, _id }) => (
          //     <Chip
          //       key={_id}
          //       label={tag}
          //       variant="outlined"
          //       color="primary"
          //     />
          //   )),
          // },

          {
            enableColumnActions: false,
            enableSorting: false,
            accessorKey: "edit",
            header: t("features.CollectionPage.CollectionTableHeader.edit"),
            Cell: ({ renderedCellValue }) => (
              <IconButton
              // onClick={() => {
              //   setOpenId(id);
              // }}
              >
                <Settings />
              </IconButton>
            ),
          },
        ]}
      />
    </Paper>

    // <Paper sx={{ width: "100%", mb: 2 }}>
    //   <CollectionTableToolbar collectionName={data?.name} />
    //   <Box p="5px 20px">
    //     <TextField
    //       size="small"
    //       fullWidth
    //       placeholder={t("general.search")}
    //       InputProps={{
    //         startAdornment: (
    //           <InputAdornment position="start">
    //             <Search />
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   </Box>
    //   <TableContainer>
    //     <Table aria-labelledby="tableTitle">
    //       <CollectionTableHeader
    //         numSelected={selected.length}
    //         onSelectAllClick={handleSelectAllClick}
    //         rowCount={data?.items?.length || 0}
    //         optionalFields={data?.optionalFields}
    //       />
    //       <TableBody>
    //         {data?.items?.map(({ name, imgSrc, tags, optionalFields, id }) => {
    //           const isItemSelected = selected.indexOf(id) !== -1;
    //           return (
    //             <TableRow key={id}>
    //               <TableCell padding="checkbox">
    //                 <Checkbox
    //                   onClick={(event) => handleClick(event, id)}
    //                   color="primary"
    //                   checked={isItemSelected}
    //                 />
    //               </TableCell>
    //               <TableCell scope="row">{id}</TableCell>
    //               <TableCell>{name}</TableCell>
    //               <TableCell>
    //                 <Avatar src={imgSrc} />
    //               </TableCell>
    //               <TableCell>
    //                 {tags.map(({ tag, id }) => (
    //                   <Chip
    //                     key={id}
    //                     label={tag}
    //                     variant="outlined"
    //                     color="primary"
    //                   />
    //                 ))}
    //               </TableCell>
    //               {optionalFields?.map(({ value, name }) => (
    //                 <TableCell key={name}>{value}</TableCell>
    //               ))}
    //               <TableCell>
    //                 <IconButton
    //                   onClick={() => {
    //                     setOpenId(id);
    //                   }}
    //                 >
    //                   <Settings />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           );
    //         })}
    //       </TableBody>
    //       {openId && (
    //         <ItemSettingsDrawer id={openId} onClose={() => setOpenId("")} />
    //       )}
    //     </Table>
    //     {!!selected.length && (
    //       <Box p="8px">
    //         <LoadingButton
    //           variant="contained"
    //           loading={isLoading}
    //           onClick={() => deleteItem(selected)}
    //         >
    //           {t("general.delete")}
    //         </LoadingButton>
    //       </Box>
    //     )}
    //   </TableContainer>
    // </Paper>
  );
};
