import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import Button from './ui/Button';

function CarRaceControls({ id }: { id: number }) {
  const { resetCar, startCar } = useAppStore();
  const [status, setStatus] = useState<'started' | 'stopped'>('stopped');
  const handleStart = async () => {
    setStatus('started');
    await startCar(id);
  };

  const handleStop = async () => {
    await resetCar(id);
    setStatus('stopped');
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
