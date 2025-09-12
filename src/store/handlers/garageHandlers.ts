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
import type { WinnerSlice } from '../slice/winnersSlice';
import type { GarageSlice } from '../slice/garageSlice';
import { convertMsToSeconds, saveWinner } from '../../helper/winners';

type Get = () => Partial<WinnerSlice> & GarageSlice;
type Set = StoreApi<AppStoreState>['setState'];

export async function getCarsHandle(page: number, set: Set) {
  set({ loading: true });
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
  } finally {
    set({ loading: false });
  }
}

export async function createCarHandle(
  car: Pick<Car, 'name' | 'color'>,
  get: Get,
  set: Set
) {
  try {
    const { cars, total } = get();

    const data = await createCarApi(car);

    set({
      cars:
        cars.length >= PAGINATION_LIMIT.GARAGE_LIMIT
          ? [...cars]
          : [...cars, data],
      total: total + 1,
    });
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
    set({
      cars: get().cars.map((c) => (c.id === data?.id ? data : c)),
      selectedCar: null,
    });
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}

export async function generateCarsHandle(get: Get, set: Set) {
  try {
    const { cars, total } = get();

    const promises = Array.from({ length: RANDOM_CARS_COUNT }, async () => {
      const car = generateCar();
      const data = await createCarApi(car);
      return data;
    });

    const newCars = await Promise.all(promises);

    set({
      cars: [...cars, ...newCars].slice(0, PAGINATION_LIMIT.GARAGE_LIMIT),
      total: total + newCars.length,
    });
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
}

export function updateCarPositionHandle(
  id: number,
  race: { distance: number; time: number },
  set: Set
) {
  const { distance, time } = race;
  set((state) => ({
    cars: state.cars.map((car) =>
      car.id === id ? { ...car, distance, time, status: 'started' } : car
    ),
  }));
}

export async function startCarHandle(
  id: number,
  get: Get,
  set: Set,
  isRace?: boolean
) {
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
    } else if (driveData?.success && isRace) {
      const carWinner = get().winner;
      if (!carWinner) {
        const carById = get().cars.find((car) => car.id === id);

        const time = +convertMsToSeconds(timeMs);
        const winnerResult = { id, time };
        set({
          winner: { id, time, name: carById?.name as string },
          winnerModal: true,
        });
        await saveWinner(winnerResult);
      }
    }
  } catch {
    stopCar(id);
  }
}

export function stopCarHandle(id: number, set: Set, distance?: number) {
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
  }));
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

export async function startAllCarsHandle(get: Get, set: Set) {
  const { cars, startCar, stopCar } = get();

  set({ winner: null });
  try {
    await Promise.all(cars.map((car) => startCar(car.id, true)));
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
