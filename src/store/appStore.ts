import { create } from 'zustand';
import { createGarageSlice, type GarageSlice } from './slice/garageSlice';
import { createWinnersSlice, type WinnerSlice } from './slice/winnersSlice';
import {
  createControllerSlice,
  type ControllerSlice,
} from './slice/controllerSlice';

export type AppStoreState = GarageSlice & WinnerSlice & ControllerSlice;

export const useAppStore = create<AppStoreState>((...args) => ({
  ...createGarageSlice(...args),
  ...createWinnersSlice(...args),
  ...createControllerSlice(...args),
}));
