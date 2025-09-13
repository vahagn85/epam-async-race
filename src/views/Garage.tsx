import { useEffect, useRef } from 'react';
import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';
import { useAppStore } from '../store/appStore';
import Heading from '../components/ui/Heading';
import Loader from '../components/ui/Loader';
import WinnerModal from '../components/WinnerModal';

function Garage() {
  const getCars = useAppStore((state) => state.getCars);
  const page = useAppStore((state) => state.page);
  const loading = useAppStore((state) => state.loading);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    getCars(page).finally(() => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
    });
  }, [getCars, page]);

  return (
    <>
      <Heading>Garage</Heading>
      {isFirstLoad.current && loading ? (
        <Loader />
      ) : (
        <>
          <CarsControl />
          <RaceTrack />
          <GarageFooter />
        </>
      )}

      <WinnerModal />
    </>
  );
}

export default Garage;
