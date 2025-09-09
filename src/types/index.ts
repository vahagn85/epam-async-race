export interface Car {
  id: number;
  name: string;
  color: string;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export interface CarEngine {
  velocity: number;
  distance: number;
}

export interface CarEngineDrive {
  success: boolean;
}
