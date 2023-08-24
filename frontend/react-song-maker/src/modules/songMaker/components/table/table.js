import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Row from './row';
import { useNavigate } from 'react-router-dom';
// import { binarySearch } from '../../../../utils/sorts';
import { useTranslation } from 'react-i18next';

const Table = (props) => {
  const { songList, userNames } = props;
  const { t } = useTranslation();

  const navigate = useNavigate();

  function watchRowDetails(id) {
    //Searching the song in the array list
    // const song = songListState[binarySearch(songListState, id)];

    navigate(`/community/${id}`);
  }

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th>
            <h6>{t('SongMaker.community.table.head.t1')}</h6>
          </th>
          <th>
            <h6>{t('SongMaker.community.table.head.t2')}</h6>
          </th>
          <th>
            <h6>{t('SongMaker.community.table.head.t4')}</h6>
          </th>
          <th>
            <h6>{t('SongMaker.community.table.head.t3')}</h6>
          </th>
          <th>
            <h6>{t('SongMaker.community.table.head.t5')}</h6>
          </th>
          {/* <th>
            <h6>{t('SongMaker.community.table.head.t6')}</h6>
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
              userNames={userNames}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
