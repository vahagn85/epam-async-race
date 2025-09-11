import type { StateCreator } from 'zustand';
import type { WinnerTable } from '../../types';
import { getWinnersHandle } from '../handlers/winnersHandlers';
import type { GarageSlice } from './garageSlice';

export interface WinnerSlice {
  winnerPage: number;
  winners: WinnerTable[];
  winnerTotal: number;
  winnerError: string | null;

  getWinners: (page: number) => Promise<void>;
}

export const createWinnersSlice: StateCreator<
  WinnerSlice & Partial<GarageSlice>
> = (set, get) => ({
  winnerPage: 1,
  winners: [],
  winnerTotal: 0,
  winnerError: null,

  getWinners: async (page) => getWinnersHandle(page, set),
});
