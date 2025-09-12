import type { StoreApi } from 'zustand';
import type { AppStoreState } from '../appStore';
import { fetchWinners } from '../../api/winners';
import { PAGINATION_LIMIT } from '../../constant';
import { transformToWinners } from '../../helper/winners';
import type { WinnerSlice } from '../slice/winnersSlice';
import type { GarageSlice } from '../slice/garageSlice';
import type { SortBy } from '../../types';

type Get = () => Partial<GarageSlice> & WinnerSlice;
type Set = StoreApi<AppStoreState>['setState'];

export async function getWinnersHandle(page: number, get: Get, set: Set) {
  try {
    const { sort, order } = get();
    const { winners, total } = await fetchWinners(
      page,
      sort,
      order,
      PAGINATION_LIMIT.WINNERS_LIMIT
    );
    const newWinners = await transformToWinners(winners);

    set({ winners: newWinners, total });
  } catch (error) {
    set({
      winnerError: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}

export async function setSortHandle(key: SortBy, set: Set) {
  set((state) => {
    const newOrder =
      state.sort === key && state.order === 'ASC' ? 'DESC' : 'ASC';
    return { sort: key, order: newOrder };
  });
}

export default getWinnersHandle;
