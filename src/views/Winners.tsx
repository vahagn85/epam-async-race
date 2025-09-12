import { useEffect } from 'react';
import Heading from '../components/ui/Heading';
import WinnersPagination from '../components/WinnersPagination';
import WinnersTable from '../components/WinnersTable';
import { useAppStore } from '../store/appStore';

function Winners() {
  const getWinners = useAppStore((state) => state.getWinners);
  const winnerPage = useAppStore((state) => state.winnerPage);
  const sort = useAppStore((state) => state.sort);
  const order = useAppStore((state) => state.order);

  useEffect(() => {
    getWinners(winnerPage);
  }, [getWinners, winnerPage, sort, order]);

  return (
    <>
      <Heading>Winners</Heading>
      <WinnersTable />
      <WinnersPagination />
    </>
  );
}

export default Winners;
