import React, { ChangeEvent, FC, useState } from "react";
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

const data = [
  {
    id: "1",
    name: "Nok",
    imgSrc: "img",
    comments: "Comment[]",
    like: "Like[]",
    tags: "Tag[]",
  },
  {
    id: "2",
    name: "NokJod",
    imgSrc: "img1",
    comments: "Comment[2]",
    like: "Like[2]",
    tags: "Tag[2]",
  },
  {
    id: "3",
    name: "Nok901",
    imgSrc: "img3",
    comments: "Comment[3]",
    like: "Like[3]",
    tags: "Tag[3]",
  },
];

// todo сделать перевод, зарефачить кнопку Delete

export const CollectionTable: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  // const { data } = useGetUsersQuery();
  const { t } = useTranslation();

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      const newSelected = data?.map((n) => n.id);
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
  console.log(selected);
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <CollectionTableToolbar />
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
            rowCount={data?.length || 0}
          />
          <TableBody>
            {data?.map(({ name, imgSrc, comments, tags, like, id }) => {
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
                  <TableCell>{like}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {selected[0] ? <Button>Delete</Button> : undefined}
      </TableContainer>
    </Paper>
  );
};
