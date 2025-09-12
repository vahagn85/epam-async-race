import type { ReactNode } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export interface Column<T, K extends keyof T = keyof T> {
  key: K;
  header: string;
  sortable?: boolean;
  sortKey?: K;
  render?: (value: T[K], row: T) => ReactNode;
}

interface TableProps<T extends { id: number | string }> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
  sort?: keyof T;
  order?: 'asc' | 'desc';
  onSortChange?: (key: keyof T | string) => void;
}

function Table<T extends { id: number | string }>(props: TableProps<T>) {
  const {
    columns,
    data,
    emptyText = 'No data',
    sort,
    order,
    onSortChange,
  } = props;
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <TableHeader
        columns={columns}
        sort={sort}
        order={order}
        onSortChange={onSortChange}
      />

      <TableBody columns={columns} data={data} emptyText={emptyText} />
    </table>
  );
}

export default Table;
