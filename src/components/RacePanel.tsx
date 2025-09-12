import { useAppStore } from '../store/appStore';
import Button from './ui/Button';

function RacePanel() {
  const { generateCars, startAllCars, resetAllCars, raceStatus } =
    useAppStore();

  const handleGenerate = () => {
    generateCars();
  };

  const handleRace = async () => {
    await startAllCars();
  };

  const handleReset = async () => {
    await resetAllCars();
  };

  return (
    <div className="flex gap-2">
      <Button
        name="Race"
        onClick={handleRace}
        disabled={raceStatus === 'started' || raceStatus === 'drive'}
        className="bg-green-500 hover:bg-green-700"
      />
      <Button
        name="Reset"
        onClick={handleReset}
        disabled={raceStatus === 'stopped' || raceStatus === 'started'}
        className="bg-red-500 hover:bg-red-700"
      />
      <Button name="Generate Cars" onClick={handleGenerate} />
    </div>
  );
}

export default RacePanel;
