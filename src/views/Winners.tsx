import Heading from '../components/ui/Heading';
import WinnersPagination from '../components/WinnersPagination';
import WinnersTable from '../components/WinnersTable';

function Winners() {
  return (
    <>
      <Heading>Winners</Heading>
      <WinnersTable />
      <WinnersPagination />
    </>
  );
}

export default Winners;
