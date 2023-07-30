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

export const insertSongMutation = gql`
  mutation InsertSong(
    $owner: String!
    $songName: String!
    $rhythmType: RhythmInputType!
    $date: String!
    $chords: String!
  ) {
    insertSong(
      song: {
        owner: $owner
        songName: $songName
        chords: $chords
        rhythmType: $rhythmType
        date: $date
      }
    ) {
      id
    }
  }
`;

export const getAllSongsQuery = gql`
  query {
    getAllSongs {
      _id
      owner
      songName
      date
      chords
      rhythmType {
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
  }
`;

export const getAllSongsByUserNameQuery = (userName) => {
  return gql`
  query {
    getAllSongsByUserName(userName: "${userName}") {
      _id
      owner
      songName
      date
      chords
      rhythmType {
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
  }
`;
};
