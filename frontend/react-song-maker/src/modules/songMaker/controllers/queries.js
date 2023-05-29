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

export const insertUserSongMutation = (data) => {
  return gql`
    mutation {
      insertSong(
        song: {
          owner: "${data.owner}"
          songName: "${data.songName}"
          rhythmType: { 
            rhythmName: "${data.rhythmName}", 
            tempo: "${data.tempo}", 
            score: "${data.score}" 
          }
          date: "${data.date}"
        }
      )
    }
  `;
};
