import CarIcon from './CarIcon';
import CarControl from './CarControl';
import { useAppStore } from '../store/appStore';
import { useLayoutEffect, useRef } from 'react';

interface TrackRowProps {
  name: string;
  color: string;
  id: number;
}

function TrackRow({ name, color, id }: TrackRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const hasMeasure = useRef(false);

  const { setTrackDistance, cars } = useAppStore();
  useLayoutEffect(() => {
    if (hasMeasure.current) return;
    if (!trackRef.current || !carRef.current) return;

    const trackWidth = trackRef.current.clientWidth;
    const carWidth = carRef.current.clientWidth;

    setTrackDistance(Math.max(0, trackWidth + carWidth));
    hasMeasure.current = true;
  }, [setTrackDistance]);
  const car = cars.find((c) => c.id === id);

  return (
    <div className="flex items-center border-t border-gray-500 relative">
      <CarControl id={id} status={car?.status ?? 'stopped'} />
      <div
        ref={carRef}
        data-car-id={car?.id}
        className="flex items-center justify-center w-20 z-20"
        style={{
          transform: `translateX(${car?.distance ?? 0}px)`,
          transition: car?.time ? `transform ${car.time}ms linear` : 'none',
        }}
      >
        <CarIcon color={color} />
      </div>
      <div
        className="flex-1 relative h-16 flex items-center bg-gray-700 mr-20"
        ref={trackRef}
      >
        <span className="absolute left-2 text-gray-400 font-mono text-lg">
          {name}
        </span>
        <div className="border-l-2 h-full w-full border-r-2 border-dashed border-white"></div>
      </div>
    </div>
  );
}

export default TrackRow;
