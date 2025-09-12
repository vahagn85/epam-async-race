import type { ReactNode } from 'react';
import type { Column } from '.';
import EmptyTableText from './EmptyTableText';

interface TableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyText: string;
}

function TableBody<T extends { id: number | string }>({
  columns,
  data,
  emptyText,
}: TableBodyProps<T>) {
  return (
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
  );
}

export default TableBody;
