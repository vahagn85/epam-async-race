import { fetchCar } from '../api/garage';
import { createWinnerApi, fetchWinner, updateWinnerApi } from '../api/winners';
import { STATUS_CODE, FIX_POINT_TIME, MS_PER_SECOND } from '../constant';
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

export function convertMsToSeconds(ms: number) {
  return (ms / MS_PER_SECOND).toFixed(FIX_POINT_TIME);
}

export async function saveWinner(winner: { id: number; time: number }) {
  try {
    await createWinnerApi({
      id: winner.id,
      wins: 1,
      time: winner.time,
    });
  } catch (err) {
    if (err instanceof Error) {
      const errorWithStatus = err as Error & { status?: number };

      if (errorWithStatus.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
        const existing = await fetchWinner(winner.id);
        if (!existing) return;

        await updateWinnerApi({
          id: winner.id,
          wins: existing.wins + 1,
          time: Math.min(existing.time, winner.time),
        });
      }
    } else {
      throw err;
    }
  }
}
