import React, { useState, useEffect } from 'react';
import Row from './row';
import { useNavigate } from 'react-router-dom';
import { binarySearch } from '../../controllers/controllers';

const Table = (props) => {
  const navigate = useNavigate();
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    setSongList(props.songList);
  }, [props]);

  function watchRowDetails(id) {
    //Searching the song in the array list
    const song = songList[binarySearch(songList, id)];

    navigate(`/community/${id}`, { state: { song: song } });
  }

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th>
            <h1>OWNER</h1>
          </th>
          <th>
            <h1>NAME</h1>
          </th>
          <th>
            <h1>RHYTHM</h1>
          </th>
          <th>
            <h1>CHORDS</h1>
          </th>
          <th>
            <h1>DATE</h1>
          </th>
          <th>
            <h1>ID</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {songList.map((song) => {
          return (
            <Row
              key={song.id}
              clickFunction={() => watchRowDetails(song.id)}
              song={song}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

/**
 * This table and its styles were created by Pablo Garcia
 * and originally taken from Codepen.io source:
 * https://codepen.io/pablorgarcia/pen/ARdVgx
 * it has been adapted for this application by Jeffrey Rerín (Delacrobix).
 * Pablo's github source: https://github.com/pablorgarcia
 */
