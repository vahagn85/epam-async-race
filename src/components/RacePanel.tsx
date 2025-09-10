import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import Button from './ui/Button';

function RacePanel() {
  const [status, setStatus] = useState<'started' | 'stopped' | 'finished'>(
    'stopped'
  );
  const { generateCars, startAllCars, resetAllCars } = useAppStore();

  const handleGenerate = () => {
    generateCars();
  };

  const handleRace = async () => {
    setStatus('started');
    await startAllCars();
    setStatus('finished');
  };

  const handleReset = async () => {
    await resetAllCars();
    setStatus('stopped');
  };

  return (
    <div className="flex gap-2">
      <Button
        name="Race"
        onClick={handleRace}
        disabled={status === 'started' || status === 'finished'}
        className="bg-green-500 hover:bg-green-700"
      />
      <Button
        name="Reset"
        onClick={handleReset}
        disabled={status === 'stopped' || status === 'started'}
        className="bg-red-500 hover:bg-red-700"
      />
      <Button name="Generate Cars" onClick={handleGenerate} />
    </div>
  );
}

export default RacePanel;
