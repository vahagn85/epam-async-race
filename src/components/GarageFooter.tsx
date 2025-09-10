import { PAGINATION_LIMIT } from '../constant';
import { useAppStore } from '../store/appStore';
import Pagination from './ui/Pagination';

function GarageFooter() {
  const total = useAppStore((state) => state.total);
  const page = useAppStore((state) => state.page);
  const setPage = useAppStore((state) => state.setPage);

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGINATION_LIMIT.GARAGE_LIMIT)
  );

  const handlePageChange = (num: number) => {
    setPage(num);
  };

  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <div className="text-black text-xl font-semibold">Garage ({total})</div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default GarageFooter;
