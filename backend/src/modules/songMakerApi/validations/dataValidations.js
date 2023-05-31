import { ValidationError } from '../Errors/errorsController';

export function rhythmValidation(functionName, rhythm) {
  if (!rhythm) {
    throw new ValidationError(
      `Data required: rhythm arg is needed in: ${functionName}`
    );
  }

  // console.log('Rhythm: ' + JSON.stringify(rhythm));

  const { tempo, rhythmName, score } = rhythm;

  if (!tempo || !rhythmName || !score) {
    throw new ValidationError(
      `Data required: All fields in rhythm arg are needed in: ${functionName}`
    );
  }

  if (!score.length) {
    throw new ValidationError(
      `Data required: rhythm.score arr is empty in: ${functionName}`
    );
  }

  // console.log('Score: ' + JSON.stringify(score));

  score.forEach((item) => {
    // console.log('forEach item: ', item);

    if (!item.chordName) {
      throw new ValidationError(
        `Data required: All fields in rhythm.score arg are needed in: ${functionName}`
      );
    }

    //Number validation allowing zero
    if (
      ((item.inversion === undefined || item.inversion === null) &&
        item.inversion !== 0) ||
      ((item.duration === undefined || item.duration === null) &&
        item.duration !== 0)
    ) {
      throw new ValidationError(
        `Data required: All fields in rhythm.score arg are needed in: ${functionName}`
      );
    }
  });
}

export function SongValidation(functionName, Song) {
  if (!Song) {
    throw new ValidationError(
      `Data required: Song arg is needed in: ${functionName}`
    );
  }

  const { owner, songName, rhythmType, date } = Song;

  if (!owner || !songName || !date) {
    throw new ValidationError(
      `Data required: All fields in Song arg are needed in: ${functionName}`
    );
  }

  rhythmValidation(functionName, rhythmType);
}
