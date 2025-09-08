import { DOMAIN } from '../constant';
import type { Car } from '../types';

export async function fetchCars(
  page?: number,
  limit?: number
): Promise<{ cars: Car[]; total: number }> {
  const response = await fetch(
    `${DOMAIN}/garage?_page=${page}&_limit=${limit}`
  );
  const cars = await response.json();
  const total = limit
    ? Number(response.headers.get('X-Total-Count'))
    : cars.length;

  return { cars, total };
}

export async function createCarApi(
  car: Pick<Car, 'name' | 'color'>
): Promise<Car> {
  const response = await fetch(`${DOMAIN}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });

  return response.json();
}
