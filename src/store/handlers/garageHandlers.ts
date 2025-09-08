import type { StoreApi } from 'zustand';
import type { Car } from '../../types';
import type { AppStoreState } from '../appStore';
import { createCarApi, deleteCarApi, fetchCars } from '../../api/garage';

type Get = StoreApi<AppStoreState>['getState'];
type Set = StoreApi<AppStoreState>['setState'];

export async function getCarsHandle(set: Set) {
  try {
    const { cars, total } = await fetchCars();
    set({ cars, total });
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}
export async function createCarHandle(
  car: Pick<Car, 'name' | 'color'>,
  get: Get,
  set: Set
) {
  try {
    const data = await createCarApi(car);
    set({ cars: [...get().cars, data], total: get().total + 1 });
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}
export async function deleteCarHandle(id: number, get: Get, set: Set) {
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
}
