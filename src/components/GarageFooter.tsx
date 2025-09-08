import Pagination from './ui/Pagination';

function GarageFooter() {
  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <div className="text-black text-xl font-semibold">Garage (111)</div>
      <Pagination currentPage={1} totalPages={20} onChange={() => {}} />
    </div>
  );
}

export default GarageFooter;
