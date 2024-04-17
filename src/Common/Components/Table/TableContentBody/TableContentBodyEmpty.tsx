import { memo } from "react";

import TableContentBodyEmptyItem from "./TableContentBodyEmptyItem";

export interface TableBodyEmptyProps {
  columns: number;
}

const TableBodyEmpty = ({ columns }: TableBodyEmptyProps) => {
  return (
    <tr>
      <td colSpan={columns}>
        <TableContentBodyEmptyItem />
      </td>
    </tr>
  );
};

export default memo(TableBodyEmpty);
