import React from 'react';
import Row from './row';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();

  const test = {
    id: '14s4aas1775sd41f',
    owner: 'Delacrobix',
    rhythm: 'Salsa choque',
    chords: 'Cm, G, C, D, Em, Amaj7',
    songName: 'Nana',
    date: '23-01-25',
  };

  function watchRowDetails() {
    navigate(`/community/${test.id}`, { state: { object: test } });
  }

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th>
            <h1>OWNER</h1>
          </th>
          <th>
            <h1>RHYTHM</h1>
          </th>
          <th>
            <h1>CHORDS</h1>
          </th>
          <th>
            <h1>NAME</h1>
          </th>
          <th>
            <h1>ID</h1>
          </th>
          <th>
            <h1>PLAYABLE</h1>
          </th>
          <th>
            <h1>DATE</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
        <Row clickFunction={watchRowDetails} song={test} />
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
