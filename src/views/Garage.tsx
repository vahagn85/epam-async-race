import { useEffect } from 'react';
import CarsControl from '../components/CarsControl';
import RaceTrack from '../components/RaceTrack';
import GarageFooter from '../components/GarageFooter';
import { useAppStore } from '../store/appStore';
import Heading from '../components/ui/Heading';
import Modal from '../components/ui/Modal';

function Garage() {
  const getCars = useAppStore((state) => state.getCars);
  const page = useAppStore((state) => state.page);
  const winner = useAppStore((state) => state.winner);
  const resetWinner = useAppStore((state) => state.resetWinner);

  useEffect(() => {
    getCars(page);
  }, [getCars, page]);

  return (
    <>
      <Heading>Garage</Heading>
      <CarsControl />
      <RaceTrack />
      <GarageFooter />
      <Modal isOpen={winner !== null} onClose={resetWinner} size="sm">
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
