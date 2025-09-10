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

export default getCarDistanceFromDOM;
