import type { StoreApi } from 'zustand';
import type { Car } from '../../types';
import type { AppStoreState } from '../appStore';
import {
  createCarApi,
  deleteCarApi,
  fetchCars,
  updateCarApi,
} from '../../api/garage';
import { generateCar } from '../../utils/generateCar';
import {
  CAR_PADDING,
  PAGINATION_LIMIT,
  RANDOM_CARS_COUNT,
} from '../../constant';
import carEngine from '../../api/engine';
import { getCarDistanceFromDOM } from '../../utils/getDistance';

type Get = StoreApi<AppStoreState>['getState'];
type Set = StoreApi<AppStoreState>['setState'];

export async function getCarsHandle(page: number, set: Set) {
  try {
    const { cars, total } = await fetchCars(
      page,
      PAGINATION_LIMIT.GARAGE_LIMIT
    );
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
        selectedCar: null,
      });
    }
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}

export async function selectCarHandle(id: number, get: Get, set: Set) {
  set({ selectedCar: get().cars.find((car) => car.id === id) });
}

export async function updateCarHandle(
  car: Pick<Car, 'id' | 'name' | 'color'>,
  get: Get,
  set: Set
) {
  try {
    const data = await updateCarApi(car);
    set({ cars: get().cars.map((c) => (c.id === data?.id ? data : c)) });
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}

export async function generateCarsHandle(get: Get) {
  const promises = Array.from({ length: RANDOM_CARS_COUNT }, () =>
    get().createCar(generateCar())
  );
  await Promise.all(promises);
}

export async function startCarHandle(id: number, get: Get) {
  const { updateCarPosition, trackDistance, stopCar } = get();

  try {
    const startData = await carEngine(id, 'started');
    if (!startData || !('velocity' in startData)) return;

    const { velocity, distance: serverDistance } = startData;

    const timeMs = serverDistance / velocity;

    updateCarPosition(id, {
      distance: trackDistance,
      time: timeMs,
    });

    const driveData = await carEngine(id, 'drive');
    if (!driveData || !('success' in driveData)) {
      const currentDistance = getCarDistanceFromDOM(id);
      if (currentDistance) {
        stopCar(id, currentDistance + CAR_PADDING);
      }
    }
  } catch {
    stopCar(id);
  }
}

export async function resetCarHandle(id: number, get: Get, set: Set) {
  try {
    await carEngine(id, 'stopped');
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id
          ? { ...car, distance: 0, time: 0, status: 'stopped' }
          : car
      ),
    }));
  } catch {
    get().stopCar(id);
  }
}

export async function startAllCarsHandle(get: Get) {
  const { cars, startCar, stopCar } = get();

  try {
    await Promise.all(cars.map((car) => startCar(car.id)));
  } catch {
    cars.forEach((car) => {
      stopCar(car.id);
    });
  }
}

export async function resetAllCarsHandle(get: Get) {
  const { cars, resetCar, stopCar } = get();

  try {
    await Promise.all(cars.map((car) => resetCar(car.id)));
  } catch {
    cars.forEach((car) => {
      stopCar(car.id);
    });
  }
}
