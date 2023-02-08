import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { ChangeEvent, FC } from "react";

interface ICollectionTableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export const CollectionTableHeader: FC<ICollectionTableHeaderProps> = ({
  numSelected,
  onSelectAllClick,
  rowCount,
}) => (
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
      <TableCell>ID</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Img</TableCell>
      <TableCell>Comments</TableCell>
      <TableCell>Tags</TableCell>
      <TableCell>Like</TableCell>
    </TableRow>
  </TableHead>
);
