import { usePagination } from '../hooks/usePagination';
import Pagination from './ui/Pagination';

function GarageFooter() {
  const { total, page, totalPages, setPage } = usePagination('garage');

  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <div className="text-black text-xl font-semibold">Garage ({total})</div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}

export default GarageFooter;
