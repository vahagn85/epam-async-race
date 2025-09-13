import { useAppStore } from '../store/appStore';
import Heading from './ui/Heading';
import Modal from './ui/Modal';

function WinnerModal() {
  const winner = useAppStore((state) => state.winner);
  const winnerModal = useAppStore((state) => state.winnerModal);
  const closeWinnerModal = useAppStore((state) => state.closeWinnerModal);

  return (
    <Modal isOpen={winnerModal} onClose={closeWinnerModal} size="sm">
      <Heading size="xl">Winner:</Heading>
      <Heading level={2} size="lg">
        Car: {winner?.name}
      </Heading>
      <Heading level={3} size="lg">
        Time: {winner?.time} (S)
      </Heading>
    </Modal>
  );
}

export default WinnerModal;
