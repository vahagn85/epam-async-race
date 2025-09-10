import { useEffect } from 'react';
import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';
import { useAppStore } from '../store/appStore';

function Garage() {
  const getCars = useAppStore((state) => state.getCars);
  useEffect(() => {
    getCars();
  }, [getCars]);

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
