import { useEffect, useRef } from 'react';
import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';
import { useAppStore } from '../store/appStore';
import Heading from '../components/ui/Heading';
import Modal from '../components/ui/Modal';
import Loader from '../components/ui/Loader';

function Garage() {
  const getCars = useAppStore((state) => state.getCars);
  const page = useAppStore((state) => state.page);
  const winner = useAppStore((state) => state.winner);
  const winnerModal = useAppStore((state) => state.winnerModal);
  const closeWinnerModal = useAppStore((state) => state.closeWinnerModal);
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

      <Modal isOpen={winnerModal} onClose={closeWinnerModal} size="sm">
        <Heading size="xl">Winner:</Heading>
        <Heading level={2} size="lg">
          Car: {winner?.name}
        </Heading>
        <Heading level={3} size="lg">
          Time: {winner?.time} (S)
        </Heading>
      </Modal>
    </>
  );
}

export default Garage;
