import { useAppStore } from '../store/appStore';
import Button from './ui/Button';
import CarRaceControls from './CarRaceControls';

function CarControl({ id }: { id: number }) {
  const { deleteCar, selectCar } = useAppStore();

  return (
    <div className="flex items-center gap-2 p-2 w-27 text-xs">
      <div className="flex flex-col flex-0 gap-2">
        <Button
          className="!px-2 !py-1 bg-cyan-700 hover:bg-cyan-600"
          name="Select"
          onClick={() => selectCar(id)}
        />
        <Button
          className="!px-2 !py-1 bg-pink-700 hover:bg-pink-600"
          name="Remove"
          onClick={() => deleteCar(id)}
        />
      </div>
      <CarRaceControls id={id} />
    </div>
  );
}

export default CarControl;
