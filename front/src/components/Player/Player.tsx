import React, { useState, useEffect } from 'react';
import { Howler } from 'howler';

interface PlayerProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  selectedMusic: Howl | null; // Use Howl type for selectedMusic
  trackDetail: {
    tracktitle?: string;
    trackArtist?: string;
  }; // Define a more specific type for trackDetail
}

export default function Player({
  isPlaying,
  selectedMusic,
  setIsPlaying,
  trackDetail,
}: PlayerProps) {
  const [currentTime, setCurrentTime] = useState<number>(0); // Initialize currentTime as 0 instead of null

  console.log('current time type is: ', typeof currentTime);

  function togglePlay() {
    if (!selectedMusic) return;

    if (isPlaying) {
      selectedMusic.pause();
      setIsPlaying(false);
    } else {
      selectedMusic.play();
      setIsPlaying(true);
    }
  }

  // Howler.volume is a global volume controller for all the howl in project
  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    Howler.volume(parseFloat(e.target.value) / 100); // Use parseFloat for more accurate volume control
  }

  // It resets the range button to the beginning when the music is changed NOT the current but the actual Music
  // and commit the action if the music exist in state
  useEffect(() => {
    setCurrentTime(0);
    if (selectedMusic) selectedMusic.seek(0);
  }, [selectedMusic]);

  // This function get the value of input:range which is parsed value of currentTime
  function handleSeekChange(e: React.ChangeEvent<HTMLInputElement>) {
    const seekTime = parseInt(e.target.value, 10);
    setCurrentTime(seekTime);
    if (selectedMusic) selectedMusic.seek(seekTime); // Check if selectedMusic exists before calling seek
  }

  // This useEffect sets an Interval for each 1sec and update the value of the
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null; // Use NodeJS.Timeout for timerInterval type
    if (selectedMusic) {
      const updaterTimer = () => {
        const seekTimer = Math.round(selectedMusic.seek() as number); // Cast seek() return value to number
        setCurrentTime(seekTimer);
      };
      timerInterval = setInterval(updaterTimer, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [selectedMusic]);

  // Takes the timeInSeconds Value and converts it into the timer format
  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  const formattedTime = formatTime(currentTime);

  console.log('formattedTime type is :', typeof formattedTime);

  return (
    <>
      <div className="z-50 grid-flow-row fixed bottom-0 w-screen bg-white shadow-md h-auto p-3">
        <div className="my-auto border-t-4 border-gray-400 pt-2 mr-7">
          <div className="flex justify-center items-center xl:justify-start">
            {trackDetail?.tracktitle
              ? `${trackDetail.tracktitle} - ${trackDetail.trackArtist}`
              : 'Music Name'}
          </div>
          <div className="relative flex max-lg:justify-center space-x-3">
            <label htmlFor="durationController">Duration</label>
            <input
              className="rounded-sm cursor-pointer"
              type="range"
              min="0"
              max={selectedMusic ? selectedMusic.duration() : 0}
              value={currentTime}
              onChange={handleSeekChange}
            />
            <div>{formattedTime}</div>
            <button
              onClick={togglePlay}
              className="bg-white rounded-full p-2 hover:bg-slate-200 hover:shadow-lg"
            >
              <img
                src={isPlaying ? 'pause-30.png' : 'play-30.png'}
                alt={isPlaying ? 'Pause' : 'Play'}
              />
            </button>
            <label htmlFor="volumeController">Volume</label>
            <input
              className="cursor-pointer"
              onChange={handleVolumeChange}
              name="volumeController"
              type="range"
              max="100"
              defaultValue="100"
            />
          </div>
        </div>
      </div>
    </>
  );
}
