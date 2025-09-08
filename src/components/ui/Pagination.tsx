import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (_page: number) => void;
}

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        name="Prev"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="!px-3 !py-1"
      />
      <span className="text-xl font-semibold">#{currentPage}</span>
      <Button
        name="Next"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="!px-3 !py-1"
      />
    </div>
  );
}

export default Pagination;
