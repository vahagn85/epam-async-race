import { CAR_PADDING } from '../constant';

export const getCarDistanceFromDOM = (id: number) => {
  const carElem = document.querySelector<HTMLElement>(`[data-car-id='${id}']`);
  if (carElem) {
    const computedStyle = getComputedStyle(carElem);
    const matrix = new DOMMatrix(computedStyle.transform);
    const currentDistance = matrix.m41;

    return currentDistance;
  }
  return 0;
};

export function driveFail(
  id: number,
  stopCar: (id: number, distance?: number) => void
) {
  const currentDistance = getCarDistanceFromDOM(id);
  if (currentDistance) {
    stopCar(id, currentDistance + CAR_PADDING);
  }
}
