import { DOMAIN, STATUS_CODE } from '../constant';
import type { SortBy, SortOrder, StatusError, Winner } from '../types';

export async function fetchWinners(
  page?: number,
  sort?: SortBy,
  order?: SortOrder,
  limit?: number
): Promise<{ winners: Winner[]; total: number }> {
  const sortParams = sort ? `&_sort=${sort}&_order=${order}` : '';
  const response = await fetch(
    `${DOMAIN}/winners?_page=${page}&_limit=${limit}${sortParams}`
  );
  const winners = await response.json();
  const total = limit
    ? Number(response.headers.get('X-Total-Count'))
    : winners.length;
  return { winners, total };
}

export async function fetchWinner(id: number): Promise<Winner | undefined> {
  try {
    if (!id) {
      throw new Error('ID is required');
    }
    const response = await fetch(`${DOMAIN}/winners/${id}`);

    return await response.json();
  } catch {
    return undefined;
  }
}

export async function createWinnerApi(
  car: Winner
): Promise<Winner | undefined> {
  const response = await fetch(`${DOMAIN}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) {
    const text =
      response.status === STATUS_CODE.INTERNAL_SERVER_ERROR
        ? 'Error: Insert failed, duplicate id'
        : 'Not Created';
    const error: StatusError = new Error(text);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function deleteWinnerApi(id: number): Promise<void | string> {
  try {
    if (!id) {
      throw new Error('ID is required');
    }
    const response = await fetch(`${DOMAIN}/winners/${id}`, {
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

export async function updateWinnerApi(
  car: Winner
): Promise<Winner | undefined> {
  try {
    if (!car.id) {
      throw new Error('ID is required');
    }
    const response = await fetch(`${DOMAIN}/winners/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins: car.wins, time: car.time }),
    });
    return await response.json();
  } catch {
    return undefined;
  }
}
