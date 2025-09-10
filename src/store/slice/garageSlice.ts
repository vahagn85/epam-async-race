import type { StateCreator } from 'zustand';
import type { Car } from '../../types';
import {
  createCarHandle,
  deleteCarHandle,
  generateCarsHandle,
  getCarsHandle,
  resetAllCarsHandle,
  resetCarHandle,
  selectCarHandle,
  startAllCarsHandle,
  startCarHandle,
  updateCarHandle,
} from '../handlers/garageHandlers';

export interface garageSlice {
  page: number;
  cars: Car[];
  total: number;
  error: string | null;
  selectedCar: Car | null;
  trackDistance: number;

  getCars: () => Promise<void>;
  createCar: (_car: Pick<Car, 'name' | 'color'>) => Promise<void>;
  deleteCar: (_id: number) => Promise<void>;
  selectCar: (_id: number) => void;
  updateCar: (_car: Pick<Car, 'id' | 'name' | 'color'>) => Promise<void>;
  generateCars: () => Promise<void>;
  updateCarPosition: (
    _id: number,
    _race: { distance: number; time: number }
  ) => void;
  startCar: (_id: number) => Promise<void>;
  stopCar: (_id: number, _distance?: number) => void;
  resetCar: (_id: number) => Promise<void>;
  setTrackDistance: (_px: number) => void;
  startAllCars: () => Promise<void>;
  resetAllCars: () => Promise<void>;
}

export const createGarageSlice: StateCreator<garageSlice> = (set, get) => ({
  page: 1,
  cars: [],
  total: 0,
  error: null,
  selectedCar: null,
  trackDistance: 0,

  getCars: async () => getCarsHandle(set),
  createCar: async (car) => createCarHandle(car, get, set),
  deleteCar: async (id) => deleteCarHandle(id, get, set),
  selectCar: (id) => selectCarHandle(id, get, set),
  updateCar: async (car) => updateCarHandle(car, get, set),
  generateCars: async () => generateCarsHandle(get),
  updateCarPosition: (id, { distance, time }) =>
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id ? { ...car, distance, time } : car
      ),
    })),
  startCar: async (id) => startCarHandle(id, get),
  stopCar: (id, distance?: number) =>
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id
          ? {
              ...car,
              distance: distance || 0,
              time: 0,
            }
          : car
      ),
    })),

  resetCar: async (id) => resetCarHandle(id, get, set),
  setTrackDistance: (px: number) => set(() => ({ trackDistance: px })),
  startAllCars: async () => startAllCarsHandle(get),
  resetAllCars: async () => resetAllCarsHandle(get),
});
