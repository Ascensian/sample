import React, { useState } from 'react';
import Track from './Track';
import Player from './Player';
import { Howl } from 'howler';

interface TrackDetail {
  id: string;
  src: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  imageUrl: string;
}

const MusicInstances = [
  {
    id: 't1',
    src: '/music/04. The Heaviest of Storms (Devotion, Pt. 1).mp3',
    title: 'The Heaviest of Storms',
    artist: 'Pale Honey',
    album: 'Devotion',
    duration: '5:52',
    imageUrl: '/album-art.jpg',
  },
  {
    id: 't2',
    src: '/music/GeoPoet - Rabbit Rebellion.mp3',
    title: 'Rabbit Rebellion',
    artist: 'GeoPoet',
    album: 'Album Name',
    duration: '8:32',
    imageUrl: '/album-art.jpg',
  },
  {
    id: 't3',
    src: '/music/Khruangbin - Maria También.mp3',
    title: 'Maria Tambien',
    artist: 'Khruangbin',
    album: 'Album Name',
    duration: '3:10',
    imageUrl: '/album-art.jpg',
  },
  {
    id: 't6',
    src: '/music/1_4 - The Moment (Outro) - Bell Witch (128).mp3',
    title: 'The Moment (Outro)',
    artist: 'Bell Witch',
    album: 'Album Name',
    duration: '3:06',
    imageUrl: '/album-art.jpg',
  },
  {
    id: 't8',
    src: '/music/Sufjan Stevens - To Be Alone With You.mp3',
    title: 'To Be Alone With You',
    artist: 'Sufjan Stevens',
    album: 'Album Name',
    duration: '2:48',
    imageUrl: '/album-art.jpg',
  },
  {
    id: 't9',
    src: '/music/01 Song Seven.mp3',
    title: 'Song Seven',
    artist: 'Interpol',
    album: 'Album Name',
    duration: '4:52',
    imageUrl: '/album-art.jpg',
  },
];

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedMusic, setSelectedMusic] = useState<Howl | null>(null);
  const [trackDetail, setTrackDetail] = useState<TrackDetail | undefined>(
    undefined,
  );

  return (
    <>
      <ul className="space-y-1 p-2 m-2 pb-32">
        {MusicInstances.map((track, index) => (
          <li key={track.id}>
            <Track
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              selectedMusic={selectedMusic}
              setSelectedMusic={setSelectedMusic}
              // Pass the entire track object when setting the track detail
              setTrackDetail={() => setTrackDetail(track)}
              track={track}
              isFirstTrack={index === 0}
            />
          </li>
        ))}
      </ul>
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        selectedMusic={selectedMusic}
        // Ensure the Player component can accept and utilize the expanded trackDetail
        trackDetail={trackDetail}
      />
    </>
  );
}
