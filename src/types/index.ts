export interface Car {
  id: number;
  name: string;
  color: string;
  distance?: number;
  time?: number;
  status?: EngineStatus;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export interface CarEngine {
  velocity: number;
  distance: number;
}

export interface CarEngineDrive {
  success: boolean;
}

export type SortBy = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type WinnerTable = Winner & {
  carId: number;
  name: string;
  car: string;
};

export interface CarWin {
  id: number;
  name: string;
  time: number;
}

export interface FormFields {
  id?: number;
  text: string;
  color: string;
}

export interface StatusError extends Error {
  status?: number;
}
