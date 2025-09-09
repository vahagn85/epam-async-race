import CarForm from './CarForm';
import { useAppStore } from '../store/appStore';

function CarCreateEditPanel() {
  const { createCar, selectedCar, updateCar } = useAppStore((state) => state);
  const handleCreate = (text: string, color: string) => {
    createCar({ name: text, color });
  };

  const handleUpdate = (text: string, color: string) => {
    if (!selectedCar) return;
    updateCar({ ...selectedCar, name: text, color });
  };

  return (
    <div className="flex gap-4">
      <CarForm
        initTextValue=""
        initColorValue="#ffffff"
        btnName="Create"
        onSubmit={handleCreate}
      />
      <CarForm
        key={selectedCar?.id || 'new'}
        initTextValue={selectedCar?.name || ''}
        initColorValue={selectedCar?.color || '#ffffff'}
        btnName="Update"
        onSubmit={handleUpdate}
        disabled={!selectedCar}
      />
    </div>
  );
}

export default CarCreateEditPanel;
