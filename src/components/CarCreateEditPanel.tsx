import CarForm from './CarForm';

function CarCreateEditPanel() {
  const handleCreate = (text: string, color: string) => {
    console.log('Create car:', text, color);
  };

  const handleUpdate = (text: string, color: string) => {
    console.log('Update car:', text, color);
  };

  return (
    <div className="flex gap-4">
      <CarForm
        initTextValue=""
        initColorValue="#000000"
        btnName="Create"
        onSubmit={handleCreate}
      />
      <CarForm
        initTextValue=""
        initColorValue="#000000"
        btnName="Update"
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default CarCreateEditPanel;
