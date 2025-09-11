import type { ReactNode } from 'react';

export interface Column<T, K extends keyof T = keyof T> {
  key: K;
  header: string;
  render?: (value: T[K], row: T) => ReactNode;
}

interface TableProps<T extends { id: number | string }> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
}

function EmptyTableText({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-10 text-center text-sm text-slate-500"
      >
        {text}
      </td>
    </tr>
  );
}

function Table<T extends { id: number | string }>(props: TableProps<T>) {
  const { columns, data, emptyText = 'No data' } = props;
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-800 text-white">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="px-4 py-3 text-left text-sm font-medium "
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {data.length === 0 ? (
          <EmptyTableText colSpan={columns.length} text={emptyText} />
        ) : (
          data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-600">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-4 py-3 text-sm text-gray-100"
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
