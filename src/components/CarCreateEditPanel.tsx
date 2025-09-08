import CarForm from './CarForm';
import { useAppStore } from '../store/appStore';

function CarCreateEditPanel() {
  const { createCar } = useAppStore((state) => state);
  const handleCreate = (text: string, color: string) => {
    createCar({ name: text, color });
    console.log('Create car:', text, color);
  };

  const handleUpdate = (text: string, color: string) => {
    console.log('Update car:', text, color);
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
        initTextValue=""
        initColorValue="#ffffff"
        btnName="Update"
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default CarCreateEditPanel;
