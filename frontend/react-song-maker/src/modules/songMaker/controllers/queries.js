import { gql } from '@apollo/client';

export const getAllRhythmsQuery = gql`
  query {
    getAllRhythms {
      rhythmName
      tempo
      score {
        chordName
        seventh
        inversion
        duration
      }
    }
  }
`;

export const getAIChordsQuery = (ton) => {
  return gql`
    query {
      getAIChords(tonality: "${ton}")
    }
  `;
};

export const insertUserSongMutation = gql`
  mutation InsertUserSong(
    $owner: String!
    $songName: String!
    $rhythmType: RhythmInputType!
    $date: String!
  ) {
    insertSong(
      song: {
        owner: $owner
        songName: $songName
        rhythmType: $rhythmType
        date: $date
      }
    ) {
      id
    }
  }
`;

export const getAllUserSongsQuery = gql`
  query {
    getAllUserSongs {
      _id
      owner
      songName
      rhythm
      chords
      date
    }
  }
`;

export const getAllSongsByUserNameQuery = (userName) => {
  return gql`
  query {
    getAllSongsByUserName(userName: "${userName}") {
      _id
      owner
      songName
      rhythm
      chords
      date
    }
  }
`;
};
