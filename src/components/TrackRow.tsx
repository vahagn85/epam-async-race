import CarIcon from './CarIcon';
import CarControl from './CarControl';

interface TrackRowProps {
  name: string;
  color: string;
  id: number;
}

function TrackRow({ name, color, id }: TrackRowProps) {
  return (
    <div className="flex items-center border-t border-gray-500 relative">
      <CarControl id={id} />
      <div className="flex items-center justify-center w-20">
        <CarIcon color={color} />
      </div>
      <div className="flex-1 relative h-16 flex items-center bg-gray-700 mr-20">
        <span className="absolute left-2 text-gray-400 font-mono text-lg">
          {name}
        </span>
        <div className="border-l-2 h-full w-full border-r-2 border-dashed border-white"></div>
      </div>
    </div>
  );
}

export default TrackRow;
