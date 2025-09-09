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

export async function deleteCarApi(id: number): Promise<object | string> {
  try {
    if (!id) {
      throw new Error('ID is required');
    }
    const response = await fetch(`${DOMAIN}/garage/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed id:${id}`);
    }

    return 'success';
  } catch {
    return 'error';
  }
}

export async function updateCarApi(
  car: Pick<Car, 'id' | 'name' | 'color'>
): Promise<Car | undefined> {
  try {
    if (!car.id) {
      throw new Error('ID is required');
    }
    const response = await fetch(`${DOMAIN}/garage/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: car.name, color: car.color }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update id: ${car.id}`);
    }

    return await response.json();
  } catch {
    return undefined;
  }
}
