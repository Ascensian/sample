import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

interface TrackProps {
  src: string;
  title: string;
  artist: string;
  album: string;
  duration: string | number;
  imageUrl: string;
}

interface PlaylistProps {
  track: TrackProps;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  selectedMusic: Howl | null;
  setSelectedMusic: (value: Howl) => void;
  isFirstTrack: boolean;
  setTrackDetail: ({
    trackTitle,
    trackArtist,
  }: {
    trackTitle: string;
    trackArtist: string;
  }) => void;
}

export default function Track({
  track,
  isPlaying,
  setIsPlaying,
  selectedMusic,
  setSelectedMusic,
  setTrackDetail,
  isFirstTrack,
}: PlaylistProps) {
  const [music, setMusic] = useState<Howl | null>(null);

  useEffect(() => {
    const newMusic = new Howl({
      src: [track.src],
      autoplay: false,
      loop: true,
    });

    setMusic(newMusic);

    if (isFirstTrack) setSelectedMusic(newMusic);
  }, [track, setSelectedMusic, isFirstTrack]);

  function handleToggle() {
    setTrackDetail({ trackTitle: track.title, trackArtist: track.artist });

    if (music && music.playing()) {
      music.pause();
      setIsPlaying(false);
    } else {
      if (selectedMusic && selectedMusic.playing()) {
        selectedMusic.pause();
      }
      setIsPlaying(true);
      if (music) {
        music.play();
        setSelectedMusic(music);
      }
    }
  }

  return (
    <>
      <div
        className={`${selectedMusic === music && isPlaying ? 'bg-gray-200' : ''} grid grid-flow-col border-b-2 hover:bg-slate-100 justify-normal`}
      >
        <div className="flex items-center space-x-1">
          <button
            onClick={handleToggle}
            className="bg-white rounded-full p-3 m-2 hover:cursor-pointer hover:shadow-md"
          >
            {selectedMusic === music && isPlaying ? (
              <img src="pause-30.png" alt="Pause" />
            ) : (
              <img src="play-30.png" alt="Play" />
            )}
          </button>
          <img
            src={track.imageUrl}
            alt={`${track.title} artwork`}
            className="h-20 w-20"
          />
        </div>
        <div className="col-span-12 grid grid-flow-col items-center">
          <div className="row-span-5 flex flex-row items-center justify-center">
            <span>{track.title}</span>
            <span className="px-1">-</span>
            <span>{track.artist}</span>
          </div>
        </div>
        <div className="flex m-auto justify-end">
          <p>{track.duration}</p>
        </div>
      </div>
    </>
  );
}
