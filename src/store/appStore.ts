import { create } from 'zustand';
import { createGarageSlice, type garageSlice } from './slice/garageSlice';

export type AppStoreState = garageSlice;

export const useAppStore = create<AppStoreState>((...args) => ({
  ...createGarageSlice(...args),
}));
