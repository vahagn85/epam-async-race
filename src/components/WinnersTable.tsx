import { useAppStore } from '../store/appStore';
import type { WinnerTable } from '../types';
import CarIcon from './CarIcon';
import Table, { type Column } from './ui/Table';

const columns: Column<WinnerTable>[] = [
  { key: 'carId', header: 'NUMBER' },
  {
    key: 'car',
    header: 'CAR',
    render: (value) => <CarIcon color={value as string} />,
  },
  { key: 'name', header: 'NAME' },
  { key: 'wins', header: 'WINS' },
  {
    key: 'time',
    header: 'BEST TIME (SECONDS)',
  },
];

function WinnersTable() {
  const winners = useAppStore((state) => state.winners);
  return (
    <div className="overflow-x-auto bg-gray-600 rounded-lg shadow-md">
      <Table columns={columns} data={winners} emptyText="No Winners" />
    </div>
  );
}

export default WinnersTable;
