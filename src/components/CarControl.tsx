import { useAppStore } from '../store/appStore';
import Button from './ui/Button';

function CarControl({ id }: { id: number }) {
  const { deleteCar } = useAppStore((state) => state);

  return (
    <div className="flex items-center gap-2 p-2 w-27 text-xs">
      <div className="flex flex-col flex-0 gap-2">
        <Button
          className="!px-2 !py-1 bg-cyan-700 hover:bg-cyan-600"
          name="Select"
        />
        <Button
          className="!px-2 !py-1 bg-pink-700 hover:bg-pink-600"
          name="Remove"
          onClick={() => deleteCar(id)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-6 h-6 !p-1 bg-yellow-600" name="A" />
        <Button className="w-6 h-6 !p-1 bg-gray-600" name="B" />
      </div>
    </div>
  );
}

export default CarControl;
