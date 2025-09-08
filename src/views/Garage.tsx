import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';

function Garage() {
  return (
    <>
      <h1 className="text-3xl mb-4">Garage</h1>
      <CarsControl />
      <RaceTrack />
      <GarageFooter />
    </>
  );
}

export default Garage;
