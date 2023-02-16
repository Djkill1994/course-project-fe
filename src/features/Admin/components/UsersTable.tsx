import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
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
            {data?.map(({ userName, id, avatarSrc, banned, role }) => {
              return (
                <TableRow key={id}>
                  <TableCell scope="row">{id}</TableCell>
                  <TableCell>
                    <Avatar src={avatarSrc} />
                  </TableCell>
                  <TableCell>{userName}</TableCell>
                  <TableCell>
                    {banned ? (
                      <Block color="error" />
                    ) : (
                      <CheckCircleOutline color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    {role === "admin"
                      ? t("features.Admin.UsersTable.role.admin")
                      : t("features.Admin.UsersTable.role.user")}
                  </TableCell>
                  <TableCell>
                    <UserActions userId={id} role={role} banned={banned} />
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
