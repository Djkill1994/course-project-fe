import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";

interface ICollectionTableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export const CollectionTableHeader: FC<ICollectionTableHeaderProps> = ({
  numSelected,
  onSelectAllClick,
  rowCount,
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
          {t("features.CollectionPage.CollectionTableHeader.comments")}
        </TableCell>
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.tags")}
        </TableCell>
        <TableCell>
          {t("features.CollectionPage.CollectionTableHeader.likes")}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
