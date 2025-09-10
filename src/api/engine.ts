import { DOMAIN } from '../constant';
import type { CarEngine, CarEngineDrive, EngineStatus } from '../types';
import { getEngineError } from './errors';

export default async function carEngine(
  id: number,
  status: EngineStatus
): Promise<CarEngine | CarEngineDrive | undefined> {
  try {
    const response = await fetch(`${DOMAIN}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      getEngineError(response.status);
    }

    return await response.json();
  } catch {
    return undefined;
  }
}
