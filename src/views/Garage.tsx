import { useEffect, useRef } from 'react';
import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';
import { useAppStore } from '../store/appStore';
import Heading from '../components/ui/Heading';
import Loader from '../components/ui/Loader';
import WinnerModal from '../components/WinnerModal';
import ErrorMessage from '../components/ErrorMessage';

function Garage() {
  const getCars = useAppStore((state) => state.getCars);
  const page = useAppStore((state) => state.page);
  const loading = useAppStore((state) => state.loading);
  const resetAllCars = useAppStore((state) => state.resetAllCars);
  const error = useAppStore((state) => state.error);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    getCars(page).finally(() => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
    });
    return () => {
      resetAllCars();
    };
  }, [getCars, page, resetAllCars]);

  function renderContent() {
    if (isFirstLoad.current && loading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage msg={error} />;
    }
    return (
      <>
        <CarsControl />
        <RaceTrack />
        <GarageFooter />
      </>
    );
  }
  return (
    <>
      <Heading>Garage</Heading>
      {renderContent()}
      <WinnerModal />
    </>
  );
}

export default Garage;
