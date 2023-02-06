import { Box } from "@mui/material";
import { FC } from "react";
import { UsersTable } from "./UsersTable";
import { Header } from "../../../common/components/Header";

export const UserListPage: FC = () => (
  <Box bgcolor="#FAFAFA">
    <Header />
    <Box m="50px auto" maxWidth="1000px">
      <UsersTable />
    </Box>
  </Box>
);
