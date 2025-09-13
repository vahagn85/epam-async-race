import type { StateCreator } from 'zustand';
import type { Car, CarWin, EngineStatus, FormFields } from '../../types';
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
  stopCarHandle,
  updateCarHandle,
  updateCarPositionHandle,
} from '../handlers/garageHandlers';
import type { WinnerSlice } from './winnersSlice';

export interface GarageSlice {
  loading: boolean;
  page: number;
  cars: Car[];
  total: number;
  error: string | null;
  selectedCar: Car | null;
  createForm: FormFields;
  trackDistance: number;
  winner: CarWin | null;
  raceStatus: EngineStatus;

  getCars: (page: number) => Promise<void>;
  createCar: (_car: Pick<Car, 'name' | 'color'>) => Promise<void>;
  deleteCar: (_id: number) => Promise<void>;
  selectCar: (_id: number) => void;
  updateCar: (_car: Pick<Car, 'id' | 'name' | 'color'>) => Promise<void>;
  generateCars: () => Promise<void>;
  updateCarPosition: (
    _id: number,
    _race: { distance: number; time: number }
  ) => void;
  startCar: (_id: number, _isRace?: boolean) => Promise<void>;
  stopCar: (_id: number, _distance?: number) => void;
  resetCar: (_id: number, _isRace?: boolean) => Promise<void>;
  setTrackDistance: (_px: number) => void;
  startAllCars: () => Promise<void>;
  resetAllCars: () => Promise<void>;
  setPage: (page: number) => void;
  resetWinner: () => void;
  setCreateForm: (field: Partial<FormFields>) => void;
}

export const createGarageSlice: StateCreator<
  GarageSlice & Partial<WinnerSlice>
> = (set, get) => ({
  loading: false,
  page: 1,
  cars: [],
  total: 0,
  error: null,
  selectedCar: null,
  createForm: { text: '', color: '#ffffff' },
  trackDistance: 0,
  winner: null,
  raceStatus: 'stopped',

  getCars: async (page) => getCarsHandle(page, set),
  createCar: async (car) => createCarHandle(car, get, set),
  deleteCar: async (id) => deleteCarHandle(id, get, set),
  selectCar: (id) => selectCarHandle(id, get, set),
  updateCar: async (car) => updateCarHandle(car, get, set),
  generateCars: async () => generateCarsHandle(get, set),
  updateCarPosition: (id, { distance, time }) =>
    updateCarPositionHandle(id, { distance, time }, set),
  startCar: async (id, isRace) => startCarHandle(id, get, set, isRace),
  stopCar: (id, distance) => stopCarHandle(id, set, distance),
  resetCar: async (id, isRace) => resetCarHandle(id, get, set, isRace),
  setTrackDistance: (px: number) => set(() => ({ trackDistance: px })),
  startAllCars: async () => startAllCarsHandle(get, set),
  resetAllCars: async () => resetAllCarsHandle(get, set),
  setPage: (page) => set(() => ({ page })),
  resetWinner: () => set(() => ({ winner: null })),
  setCreateForm: (field) =>
    set((state) => ({ createForm: { ...state.createForm, ...field } })),
});
