import { useAppStore } from '../store/appStore';
import TrackRow from './TrackRow';

function RaceTrack() {
  const cars = useAppStore((state) => state.cars);

  if (!cars.length) {
    return (
      <div className="w-full bg-gray-800 flex justify-center min-h-20 items-center mt-8">
        <p className="text-gray-200">No Cars. Please generate or create car</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800 flex flex-col mt-8">
      {cars.map((car) => (
        <TrackRow key={car.id} name={car.name} color={car.color} id={car.id} />
      ))}
    </div>
  );
}

export default RaceTrack;
