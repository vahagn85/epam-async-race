import type { StateCreator } from 'zustand';
import { fetchCars } from '../../api/garage';
import type { Car } from '../../types';

export interface garageSlice {
  page: number;
  cars: Car[];
  total: number;
  error: string | null;
  getCars: () => Promise<void>;
}
export const createGarageSlice: StateCreator<garageSlice> = (set) => ({
  page: 1,
  cars: [],
  total: 0,
  error: null,

  getCars: async () => {
    try {
      const { cars, total } = await fetchCars();
      set({ cars, total });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unexpected error',
      });
    }
  },
});
