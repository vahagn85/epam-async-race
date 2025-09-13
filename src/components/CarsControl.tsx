import CarCreateEditPanel from './CarCreateEditPanel';
import RacePanel from './RacePanel';

function CarsControl() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
      <RacePanel />
      <CarCreateEditPanel />
    </div>
  );
}

export default CarsControl;
