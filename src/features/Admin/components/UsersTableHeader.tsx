import { TableHead, TableRow, TableCell } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const UsersTableHeader: FC = () => {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <TableCell>{t("features.Admin.UsersTableHeader.id")}</TableCell>
        <TableCell>{t("features.Admin.UsersTableHeader.avatar")}</TableCell>
        <TableCell>{t("features.Admin.UsersTableHeader.name")}</TableCell>
        <TableCell>{t("features.Admin.UsersTableHeader.status")}</TableCell>
        <TableCell>{t("features.Admin.UsersTableHeader.role")}</TableCell>
        <TableCell>{t("features.Admin.UsersTableHeader.actions")}</TableCell>
      </TableRow>
    </TableHead>
  );
};
