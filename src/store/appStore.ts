import { create } from 'zustand';
import { createGarageSlice, type GarageSlice } from './slice/garageSlice';
import { createWinnersSlice, type WinnerSlice } from './slice/winnersSlice';

export type AppStoreState = GarageSlice & WinnerSlice;

export const useAppStore = create<AppStoreState>((...args) => ({
  ...createGarageSlice(...args),
  ...createWinnersSlice(...args),
}));
