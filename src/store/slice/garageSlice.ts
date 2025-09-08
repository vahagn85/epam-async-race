import type { StateCreator } from 'zustand';
import type { Car } from '../../types';
import {
  createCarHandle,
  deleteCarHandle,
  getCarsHandle,
} from '../handlers/garageHandlers';

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

  getCars: async () => getCarsHandle(set),
  createCar: async (car) => createCarHandle(car, get, set),
  deleteCar: async (id) => deleteCarHandle(id, get, set),
});
