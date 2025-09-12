import type { Column } from '.';
import TableSortIcon from './TableSortIcon';

interface TableHeaderCellProps<T> {
  col: Column<T>;
  sort?: keyof T | string;
  order?: 'asc' | 'desc';
  onSortChange?: (key: keyof T | string) => void;
}

interface TableHeaderProps<T> {
  columns: Column<T>[];
  sort?: keyof T | string;
  order?: 'asc' | 'desc';
  onSortChange?: (key: keyof T | string) => void;
}

function TableHeaderCell<T>({
  col,
  sort,
  order,
  onSortChange,
}: TableHeaderCellProps<T>) {
  const isActive = sort === (col.sortKey ?? col.key);

  return (
    <th
      className="px-4 py-3 text-left text-sm font-medium"
      onClick={() =>
        col.sortable && onSortChange?.(col.sortKey ?? (col.key as string))
      }
    >
      <div
        className={`flex items-center gap-1 ${
          col.sortable ? 'cursor-pointer' : ''
        }`}
      >
        {col.header}
        {col.sortable &&
          (isActive ? (
            <TableSortIcon direction={order === 'asc' ? 'asc' : 'desc'} />
          ) : (
            <TableSortIcon direction="none" />
          ))}
      </div>
    </th>
  );
}

function TableHeader<T>({
  columns,
  sort,
  order,
  onSortChange,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-800 text-white">
      <tr>
        {columns.map((col) => (
          <TableHeaderCell
            key={String(col.key)}
            col={col}
            sort={sort}
            order={order}
            onSortChange={onSortChange}
          />
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
