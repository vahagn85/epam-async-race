import { useAppStore } from '../store/appStore';
import type { SortBy, WinnerTable } from '../types';
import CarIcon from './CarIcon';
import type { Column } from './ui/Table';
import Table from './ui/Table';

const columns: Column<WinnerTable>[] = [
  { key: 'carId', header: 'NUMBER', sortable: true, sortKey: 'id' },
  {
    key: 'car',
    header: 'CAR',
    render: (value) => <CarIcon color={value as string} />,
  },
  { key: 'name', header: 'NAME' },
  { key: 'wins', header: 'WINS', sortable: true, sortKey: 'wins' },
  {
    key: 'time',
    header: 'BEST TIME (SECONDS)',
    sortable: true,
    sortKey: 'time',
  },
];

function WinnersTable() {
  const winners = useAppStore((state) => state.winners);
  const sort = useAppStore((state) => state.sort);
  const order = useAppStore((state) => state.order);
  const setSort = useAppStore((state) => state.setSort);

  const handleSortChange = (key: SortBy) => {
    setSort(key);
  };

  return (
    <div className="overflow-x-auto bg-gray-600 rounded-lg shadow-md">
      <Table
        columns={columns}
        data={winners}
        emptyText="No Winners"
        sort={sort}
        order={order.toLowerCase() as 'asc' | 'desc'}
        onSortChange={(key) => handleSortChange(key as SortBy)}
      />
    </div>
  );
}

export default WinnersTable;
