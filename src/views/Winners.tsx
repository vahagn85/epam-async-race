import WinnersPagination from '../components/WinnersPagination';
import WinnersTable from '../components/WinnersTable';

function Winners() {
  return (
    <>
      <h1 className="text-3xl mb-4">Winners</h1>
      <WinnersTable />
      <WinnersPagination />
    </>
  );
}

export default Winners;
