import TrackRow from './TrackRow';

function RaceTrack() {
  return (
    <div className="w-full bg-gray-800 flex flex-col mt-8">
      <TrackRow name="Car1" color="#ccc" />
      <TrackRow name="Car2" color="#eee" />
    </div>
  );
}

export default RaceTrack;
