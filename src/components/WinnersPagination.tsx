import { PAGINATION_LIMIT } from '../constant';
import { useAppStore } from '../store/appStore';
import Pagination from './ui/Pagination';

function WinnersPagination() {
  const total = useAppStore((state) => state.winnerTotal);
  const page = useAppStore((state) => state.winnerPage);
  const setPage = useAppStore((state) => state.setWinnerPage);

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGINATION_LIMIT.WINNERS_LIMIT)
  );

  const handlePageChange = (num: number) => {
    setPage(num);
  };
  return (
    <div className="mt-4">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default WinnersPagination;
