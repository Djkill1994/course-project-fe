import React, { ChangeEvent, FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { Block, CheckCircleOutline } from "@mui/icons-material";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTableToolbar } from "./UsersTableToolbar";
import { useGetUsersQuery } from "../../api/users.api";

export const UsersTable: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const { data } = useGetUsersQuery();

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

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <UsersTableToolbar
        selectedIds={selected}
        onActionComplete={() => setSelected([])}
      />
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <UsersTableHeader
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data?.length || 0}
          />
          <TableBody>
            {data?.map(
              ({
                email,
                username,
                id,
                status,
                registrationDate,
                lastVisit,
              }) => {
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
                    <TableCell>{username}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{registrationDate}</TableCell>
                    <TableCell>{lastVisit}</TableCell>
                    <TableCell>
                      {status ? (
                        <Block color="error" />
                      ) : (
                        <CheckCircleOutline color="success" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
