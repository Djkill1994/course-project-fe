import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Block, CheckCircleOutline } from "@mui/icons-material";
import { UsersTableHeader } from "./UsersTableHeader";
import { UserActions } from "./UserActions";
import { useGetUsersQuery } from "../api/users.api";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const UsersTable: FC = () => {
  const { data } = useGetUsersQuery();
  const { t } = useTranslation();

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <UsersTableHeader />
          <TableBody>
            {data?.map(({ username, id, avatarSrc, banned, roles }) => {
              return (
                <TableRow key={id}>
                  <TableCell scope="row">{id}</TableCell>
                  <TableCell>{avatarSrc}</TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell>
                    {banned ? (
                      <Block color="error" />
                    ) : (
                      <CheckCircleOutline color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    {roles === "admin"
                      ? t("features.Admin.UsersTable.roles.admin")
                      : t("features.Admin.UsersTable.roles.user")}
                  </TableCell>
                  <TableCell>
                    <UserActions userId={id} role={roles} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
