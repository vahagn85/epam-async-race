import CarIcon from './CarIcon';
import Table, { type Column } from './ui/Table';

interface Winner {
  id: number;
  carId: number;
  car: string;
  name: string;
  wins: number;
  time: string;
}

const columns: Column<Winner>[] = [
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
const winners = [
  {
    id: 1,
    carId: 1,
    car: '#000',
    name: 'CAr 1',
    wins: 5,
    time: '2.92',
  },
  {
    id: 2,
    carId: 2,
    car: '#ccc',
    name: 'CAr 2',
    wins: 3,
    time: '2.52',
  },
];
function WinnersTable() {
  return (
    <div className="overflow-x-auto bg-gray-600 rounded-lg shadow-md">
      <Table columns={columns} data={winners} emptyText="No Winners" />
    </div>
  );
}

export default WinnersTable;
