import type { StateCreator } from 'zustand';
import type { Car } from '../../types';
import {
  createCarHandle,
  deleteCarHandle,
  generateCarsHandle,
  getCarsHandle,
  selectCarHandle,
  updateCarHandle,
} from '../handlers/garageHandlers';

export interface garageSlice {
  page: number;
  cars: Car[];
  total: number;
  error: string | null;
  selectedCar: Car | null;

  getCars: () => Promise<void>;
  createCar: (_car: Pick<Car, 'name' | 'color'>) => Promise<void>;
  deleteCar: (_id: number) => Promise<void>;
  selectCar: (_id: number) => void;
  updateCar: (_car: Pick<Car, 'id' | 'name' | 'color'>) => Promise<void>;
  generateCars: () => Promise<void>;
}

export const createGarageSlice: StateCreator<garageSlice> = (set, get) => ({
  page: 1,
  cars: [],
  total: 0,
  error: null,
  selectedCar: null,

  getCars: async () => getCarsHandle(set),
  createCar: async (car) => createCarHandle(car, get, set),
  deleteCar: async (id) => deleteCarHandle(id, get, set),
  selectCar: (id) => selectCarHandle(id, get, set),
  updateCar: async (car) => updateCarHandle(car, get, set),
  generateCars: async () => generateCarsHandle(get),
});
