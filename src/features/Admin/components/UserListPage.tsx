import { Box } from "@mui/material";
import { FC } from "react";
import { UsersTable } from "./UsersTable";

export const UserListPage: FC = () => (
  <Box>
    <Box m="auto" maxWidth="1000px">
      <UsersTable />
    </Box>
  </Box>
);
