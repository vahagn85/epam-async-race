import { useAppStore } from '../store/appStore';
import { PAGINATION_LIMIT } from '../constant';

export function usePagination(type: 'garage' | 'winners') {
  const total = useAppStore((s) =>
    type === 'garage' ? s.total : s.winnerTotal
  );
  const page = useAppStore((s) => (type === 'garage' ? s.page : s.winnerPage));
  const setPage = useAppStore((s) =>
    type === 'garage' ? s.setPage : s.setWinnerPage
  );

  const limit =
    type === 'garage'
      ? PAGINATION_LIMIT.GARAGE_LIMIT
      : PAGINATION_LIMIT.WINNERS_LIMIT;

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return { total, page, totalPages, setPage };
}

export default usePagination;
