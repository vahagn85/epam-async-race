import { usePagination } from '../hooks/usePagination';
import Pagination from './ui/Pagination';

function WinnersPagination() {
  const { page, totalPages, setPage } = usePagination('winners');

  return (
    <div className="mt-4">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}

export default WinnersPagination;
