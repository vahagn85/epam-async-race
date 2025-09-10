import { create } from 'zustand';
import { createGarageSlice, type GarageSlice } from './slice/garageSlice';

export type AppStoreState = GarageSlice;

export const useAppStore = create<AppStoreState>((...args) => ({
  ...createGarageSlice(...args),
}));
