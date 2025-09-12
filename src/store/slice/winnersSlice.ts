import type { StateCreator } from 'zustand';
import type { SortBy, SortOrder, WinnerTable } from '../../types';
import { getWinnersHandle, setSortHandle } from '../handlers/winnersHandlers';
import type { GarageSlice } from './garageSlice';

export interface WinnerSlice {
  winnerPage: number;
  winners: WinnerTable[];
  winnerTotal: number;
  winnerError: string | null;
  sort: SortBy;
  order: SortOrder;

  getWinners: (page: number) => Promise<void>;
  setSort: (key: SortBy) => void;
}

export const createWinnersSlice: StateCreator<
  WinnerSlice & Partial<GarageSlice>
> = (set, get) => ({
  winnerPage: 1,
  winners: [],
  winnerTotal: 0,
  winnerError: null,
  sort: 'id',
  order: 'ASC',

  getWinners: async (page) => getWinnersHandle(page, get, set),
  setSort: async (key) => setSortHandle(key, set),
});
