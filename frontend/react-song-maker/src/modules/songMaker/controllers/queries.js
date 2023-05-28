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
