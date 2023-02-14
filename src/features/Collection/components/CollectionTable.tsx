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
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { CollectionTableToolbar } from "./CollectionTableToolbar";
import { CollectionTableHeader } from "./CollectionTableHeader";
import { useTranslation } from "react-i18next";
import { useGetCollectionQuery } from "../api/collections.api";
import { useParams } from "react-router-dom";

// todo зарефачить кнопку Delete

export const CollectionTable: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const params = useParams();
  const { data } = useGetCollectionQuery(params.id as string);
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
    <Paper sx={{ width: "100%" }}>
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
              const labelId = `enhanced-table-checkbox-${id}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {id}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{imgSrc}</TableCell>
                  <TableCell>{comments}</TableCell>
                  <TableCell>{tags}</TableCell>
                  <TableCell>{likes}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!!selected.length && <Button>{t("general.delete")}</Button>}
      </TableContainer>
    </Paper>
  );
};
