import { STATUS_CODE } from '../constant';

export function getEngineError(status: number): Error {
  switch (status) {
    case STATUS_CODE.BAD_REQUEST:
      throw new Error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
      );
    case STATUS_CODE.NOT_FOUND:
      throw new Error(
        'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?'
      );
    case STATUS_CODE.TOO_MANY_REQUESTS:
      throw new Error(
        "Drive already in progress. You can't run drive for the same car twice while it's not stopped."
      );
    case STATUS_CODE.INTERNAL_SERVER_ERROR:
      throw new Error(
        "Car has been stopped suddenly. It's engine was broken down."
      );
    default:
      throw new Error('Unexpected error');
  }
}
export function garageErrorId(): Error {
  throw new Error('ID is required');
}
