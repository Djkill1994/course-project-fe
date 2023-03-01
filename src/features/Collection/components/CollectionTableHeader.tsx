import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { IOptionalFields } from "../api/collections.api";

interface ICollectionTableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  optionalFields?: IOptionalFields[];
}

export const CollectionTableHeader: FC<ICollectionTableHeaderProps> = ({
  numSelected,
  onSelectAllClick,
  rowCount,
  optionalFields,
}) => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.id")}
        </TableCell>
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.name")}
        </TableCell>
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.img")}
        </TableCell>
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.tags")}
        </TableCell>
        {optionalFields?.map(({ name }) => (
          <TableCell key={name}>{name}</TableCell>
        ))}
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.edit")}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
