import { fetchCar } from '../api/garage';
import type { Winner, WinnerTable } from '../types';

export async function transformToWinners(
  winners: Winner[]
): Promise<WinnerTable[]> {
  return Promise.all(
    winners.map(async (winner) => {
      const car = await fetchCar(winner.id);
      return {
        id: winner.id,
        carId: winner.id,
        car: car?.color ?? '#ffffff',
        name: car?.name ?? 'Unknown',
        wins: winner.wins,
        time: winner.time,
      };
    })
  );
}

export default transformToWinners;
