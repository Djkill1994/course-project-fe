import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Block, CheckCircleOutline } from "@mui/icons-material";
import { UsersTableHeader } from "./UsersTableHeader";
import { UserActions } from "./UserActions";
import { useGetUsersQuery } from "../api/users.api";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../App";

export const UsersTable: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: usersData } = useGetUsersQuery();
  const { data: authData } = useAuthRefreshQuery();

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <UsersTableHeader />
          <TableBody>
            {usersData?.map(({ userName, id, avatarSrc, banned, role }) => (
              <TableRow
                sx={{ cursor: "pointer" }}
                hover={true}
                key={id}
                onClick={() =>
                  navigate(
                    generatePath(ROUTE_PATHS.Collection, { userId: id }),
                    {
                      replace: true,
                    }
                  )
                }
              >
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
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {authData?.id !== id && (
                    <UserActions userId={id} role={role} banned={banned} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
