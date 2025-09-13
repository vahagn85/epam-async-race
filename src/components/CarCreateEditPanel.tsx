import CarForm from './CarForm';
import { useAppStore } from '../store/appStore';

function CarCreateEditPanel() {
  const { createCar, selectedCar, updateCar, createForm, setCreateForm } =
    useAppStore();

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
        key={createForm?.id || 'create'}
        initTextValue={createForm.text || ''}
        initColorValue={createForm.color || '#ffffff'}
        btnName="Create"
        onSubmit={handleCreate}
        onChangeText={(val) => setCreateForm({ text: val })}
        onChangeColor={(val) => setCreateForm({ color: val })}
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
