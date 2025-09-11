import { useEffect } from 'react';
import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';
import { useAppStore } from '../store/appStore';
import Heading from '../components/ui/Heading';

function Garage() {
  const getCars = useAppStore((state) => state.getCars);
  const page = useAppStore((state) => state.page);

  useEffect(() => {
    getCars(page);
  }, [getCars, page]);

  return (
    <>
      <Heading>Garage</Heading>
      <CarsControl />
      <RaceTrack />
      <GarageFooter />
    </>
  );
}

export default Garage;
