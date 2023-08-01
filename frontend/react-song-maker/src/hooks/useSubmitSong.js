import { useEffect, useState } from 'react';
import usePrintableDate from './usePrintableDate';
import usePlayableSong from './usePlayableSong';

const useSubmitSong = (props) => {
  const { userName, songName, chordsReceived } = props;

  const [song, setSong] = useState(null);

  const currentDate = usePrintableDate(new Date());
  const rhythmType = usePlayableSong({ chordsReceived: chordsReceived });

  useEffect(() => {
    setSong({
      owner: userName,
      songName: songName,
      chords: chordsReceived,
      rhythmType: rhythmType,
      date: currentDate,
    });
  }, [chordsReceived, userName, songName, currentDate, rhythmType]);

  return song;
};

export default useSubmitSong;
