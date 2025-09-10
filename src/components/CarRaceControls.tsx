import { useAppStore } from '../store/appStore';
import Button from './ui/Button';
import type { EngineStatus } from '../types';

interface CarRaceControlsProps {
  id: number;
  status: EngineStatus;
}

function CarRaceControls({ id, status }: CarRaceControlsProps) {
  const { resetCar, startCar } = useAppStore();
  const handleStart = () => {
    startCar(id);
  };

  const handleStop = () => {
    resetCar(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="w-6 h-6 !p-1 bg-green-500 hover:!bg-green-700"
        name="A"
        onClick={handleStart}
        disabled={status === 'started'}
      />
      <Button
        className="w-6 h-6 !p-1 bg-red-500 hover:!bg-red-700"
        name="B"
        onClick={handleStop}
        disabled={status === 'stopped'}
      />
    </div>
  );
}

export default CarRaceControls;
