import { type Car } from '../types';
import { carModels, makes } from './carModels';

export const randomColor = (): string => {
  const hexDigits = '0123456789abcdef';
  let color = '#';
  const BASE_LENGTH = 6;
  const HEX_LENGTH = 16;

  for (let i = 0; i < BASE_LENGTH; i += 1) {
    color += hexDigits[Math.floor(Math.random() * HEX_LENGTH)];
  }

  return color;
};

export const generateCar = (): Pick<Car, 'name' | 'color'> => {
  const randomMakeIndex = Math.floor(Math.random() * makes.length);
  const selectedMake = makes[randomMakeIndex];

  const models = carModels[selectedMake];
  const randomModelIndex = Math.floor(Math.random() * models.length);

  return {
    name: `${selectedMake} ${models[randomModelIndex]}`,
    color: randomColor(),
  };
};
