import { useAppStore } from '../store/appStore';
import Button from './ui/Button';

function RacePanel() {
  const { generateCars } = useAppStore();

  const handleGenerate = () => {
    generateCars();
  };

  return (
    <div className="flex gap-2">
      <Button name="Race" className="bg-green-500 hover:bg-green-700" />
      <Button name="Reset" className="bg-red-500 hover:bg-red-700" />
      <Button name="Generate Cars" onClick={handleGenerate} />
    </div>
  );
}

export default RacePanel;
