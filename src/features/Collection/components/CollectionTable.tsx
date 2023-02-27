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
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Search, Settings } from "@mui/icons-material";
import { CollectionTableToolbar } from "./CollectionTableToolbar";
import { CollectionTableHeader } from "./CollectionTableHeader";
import { useTranslation } from "react-i18next";
import {
  useDeleteItemMutation,
  useGetCollectionQuery,
} from "../api/collections.api";
import { useParams } from "react-router-dom";
import { ItemSettingsDrawer } from "./ItemSettingsDrawer";

// todo зарефачить кнопку Delete, зарефачить id и в apicollection

export const CollectionTable: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string>("");
  const params = useParams();
  const { data } = useGetCollectionQuery(params.id as string);
  const [deleteItem, { isLoading }] = useDeleteItemMutation();
  const { t } = useTranslation();

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      const newSelected = data?.items?.map((item) => item.id);
      setSelected(newSelected || []);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: React.MouseEvent, name: string): void => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <CollectionTableToolbar collectionName={data?.name} />
      <Box p="5px 20px">
        <TextField
          size="small"
          fullWidth
          placeholder={t("general.search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <CollectionTableHeader
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data?.items?.length || 0}
          />
          <TableBody>
            {data?.items?.map(({ name, imgSrc, comments, tags, likes, id }) => {
              const isItemSelected = selected.indexOf(id) !== -1;
              return (
                <TableRow key={id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={(event) => handleClick(event, id)}
                      color="primary"
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell scope="row">{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <Avatar src={imgSrc} />
                  </TableCell>
                  <TableCell>{comments}</TableCell>
                  <TableCell>{tags}</TableCell>
                  <TableCell>{likes}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setOpenId(id);
                      }}
                    >
                      <Settings />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {openId && (
            <ItemSettingsDrawer id={openId} onClose={() => setOpenId("")} />
          )}
        </Table>
        {!!selected.length && (
          <Box p="8px">
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={() => deleteItem(selected)}
            >
              {t("general.delete")}
            </LoadingButton>
          </Box>
        )}
      </TableContainer>
    </Paper>
  );
};
