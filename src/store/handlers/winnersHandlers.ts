import type { StoreApi } from 'zustand';
import type { AppStoreState } from '../appStore';
import { fetchWinners } from '../../api/winners';
import { PAGINATION_LIMIT } from '../../constant';
import { transformToWinners } from '../../helper/winners';

type Set = StoreApi<AppStoreState>['setState'];

export async function getWinnersHandle(page: number, set: Set) {
  try {
    const { winners, total } = await fetchWinners(
      page,
      'id',
      'ASC',
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

export default getWinnersHandle;
