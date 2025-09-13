import type { StateCreator } from 'zustand';
import type { GarageSlice } from './garageSlice';

export interface ControllerSlice {
  controllers: Record<number, AbortController>;
  controllerError: string | null;

  addController: (id: number, controller: AbortController) => void;
  removeController: (id: number) => void;
  abortControllerById: (id: number) => void;
  abortAllControllers: () => void;
}

export const createControllerSlice: StateCreator<
  ControllerSlice & Partial<GarageSlice>
> = (set, get) => ({
  controllers: {},
  controllerError: null,

  addController: (id, controller) =>
    set((state) => ({
      controllers: { ...state.controllers, [id]: controller },
    })),
  removeController: (id) =>
    set((state) => {
      const copyControllers = { ...state.controllers };
      delete copyControllers[id];
      return { controllers: copyControllers };
    }),
  abortControllerById: (id) => {
    const controllerById = get().controllers[id];
    if (controllerById) {
      try {
        controllerById.abort();
      } catch {
        set({ controllerError: 'About ById' });
      }
      set((state) => {
        const copy = { ...state.controllers };
        delete copy[id];
        return { controllers: copy };
      });
    }
  },
  abortAllControllers: () => {
    const { controllers } = get();
    Object.values(controllers).forEach((c) => {
      try {
        c.abort();
      } catch {
        set({ controllerError: 'About All' });
      }
    });
    set({ controllers: {} });
  },
});
