import { useAppStore } from '../store/appStore';
import TrackRow from './TrackRow';

function RaceTrack() {
  const cars = useAppStore((state) => state.cars);

  return (
    <div className="w-full bg-gray-800 flex flex-col mt-8">
      {cars.map((car) => (
        <TrackRow key={car.id} name={car.name} color={car.color} id={car.id} />
      ))}
    </div>
  );
}

export default RaceTrack;
