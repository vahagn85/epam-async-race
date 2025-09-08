import type { StateCreator } from 'zustand';
import { createCarApi, deleteCarApi, fetchCars } from '../../api/garage';
import type { Car } from '../../types';

export interface garageSlice {
  page: number;
  cars: Car[];
  total: number;

  error: string | null;
  getCars: () => Promise<void>;
  createCar: (_car: Pick<Car, 'name' | 'color'>) => Promise<void>;
  deleteCar: (_id: number) => Promise<void>;
}
export const createGarageSlice: StateCreator<garageSlice> = (set, get) => ({
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
  createCar: async (car) => {
    try {
      const data = await createCarApi(car);
      set({ cars: [...get().cars, data], total: get().total + 1 });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unexpected error',
      });
    }
  },
  deleteCar: async (id) => {
    try {
      const data = await deleteCarApi(id);
      if (data === 'success') {
        set({
          cars: get().cars.filter((car) => car.id !== id),
          total: get().total - 1,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unexpected error',
      });
    }
  },
});
