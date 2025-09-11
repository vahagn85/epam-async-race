import Pagination from './ui/Pagination';

function WinnersPagination() {
  return (
    <div className="mt-4">
      <Pagination currentPage={1} totalPages={10} onChange={() => {}} />
    </div>
  );
}

export default WinnersPagination;
