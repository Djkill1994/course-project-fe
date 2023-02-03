import { Box } from "@mui/material";
import { FC } from "react";
import { Header } from "../../../../common/components/Header";
import { UsersTable } from "../UsersTable";

export const UserListPage: FC = () => (
  <Box bgcolor="#FAFAFA">
    <Header />
    <Box m="50px auto" maxWidth="1000px">
      <UsersTable />
    </Box>
  </Box>
);
