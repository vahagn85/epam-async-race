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
  winnerModal: boolean;

  getWinners: (page: number) => Promise<void>;
  setSort: (key: SortBy) => void;
  setWinnerPage: (page: number) => void;
  closeWinnerModal: () => void;
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
  winnerModal: false,

  getWinners: async (page) => getWinnersHandle(page, get, set),
  setSort: async (key) => setSortHandle(key, set),
  setWinnerPage: (page) => set(() => ({ winnerPage: page })),
  closeWinnerModal: () => set({ winnerModal: false }),
});
