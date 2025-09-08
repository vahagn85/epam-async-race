import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';

function Garage() {
  return (
    <div>
      <h1 className="text-3xl mb-4">Garage</h1>
      <CarsControl />
      <RaceTrack />
    </div>
  );
}

export default Garage;
