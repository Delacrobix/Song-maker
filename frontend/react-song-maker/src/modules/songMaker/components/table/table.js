import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Row from './row';
import { useNavigate } from 'react-router-dom';
import { binarySearch } from '../../controllers/controllers';

const Table = (props) => {
  const { songList } = props;
  const navigate = useNavigate();
  const [songListState, setSongListState] = useState([]);

  useEffect(() => {
    setSongListState(songList);
  }, [songList]);

  function watchRowDetails(id) {
    //Searching the song in the array list
    const song = songListState[binarySearch(songListState, id)];

    navigate(`/community/${id}`, { state: { song: song } });
  }

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th>
            <h6>OWNER</h6>
          </th>
          <th>
            <h6>NAME</h6>
          </th>
          <th>
            <h6>RHYTHM</h6>
          </th>
          <th>
            <h6>CHORDS</h6>
          </th>
          <th>
            <h6>DATE</h6>
          </th>
          {/* <th>
            <h6>ID</h6>
          </th> */}
        </tr>
      </thead>
      <tbody>
        {songList.map((song) => {
          return (
            <Row
              key={uuidv4()}
              clickFunction={() => watchRowDetails(song._id)}
              song={song}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
