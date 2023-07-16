import * as Tone from 'tone';
import { CircularList } from '../classes/circularList';

const REPOSITORY = process.env.REACT_APP_G_CLOUD_BUCKET_REPOSITORY;

//This build a circular list with the twelve sounds of occidental music
const table = buildNotesTable();

function peek(stack) {
  return stack[stack.length - 1];
}

export async function playRhythm(tempoAndMapObject) {
  // console.log('tempoAndMapObject: ', tempoAndMapObject);

  let score = [...tempoAndMapObject.score];

  //The first element now will be the last for use this array like a stack object
  score.reverse();

  let quarterNote;
  //This is the click in 4/4
  quarterNote = 60 / tempoAndMapObject.tempo;

  let aux = [...score];
  let durationArr = [];

  while (aux.length > 0) {
    durationArr[aux.length - 1] = aux.pop().duration * quarterNote * 1000;
  }

  // console.log('durationArr: ', durationArr);
  // console.log("score-1: ", score);

  playMeasures(score, quarterNote, durationArr);
}

//Recursive function
function playMeasures(score, quarterNote, durationArr) {
  if (score.length === 0) {
    return;
  }

  setTimeout(() => {
    //console.log("score-2: ", score);
    let lastElement = peek(score);
    //console.log("lastElement: ", lastElement);
    let duration = lastElement.duration * quarterNote;

    //rst is a rest
    if (lastElement.chordName !== 'rst') {
      doChord(
        lastElement.chordName,
        lastElement.inversion,
        lastElement.seventh,
        duration
      );
    }

    score.pop();

    playMeasures(score, quarterNote, durationArr);
  }, durationArr[score.length]);
}

//This function is called for play a single note, for example, for play the piano bases with a duration different than the chord's duration
export function playSingleNote(octave, note, duration) {
  const noteWithPitch = `${note}${octave}`;
  const sampler = new Tone.Sampler({
    urls: {
      [noteWithPitch]: `${noteWithPitch}.mp3`,
    },
    release: 1,
    baseUrl: `${REPOSITORY}/${octave}/`,
  }).toDestination();

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(noteWithPitch, duration);
  });
}

/**
 * @param {name: string} name is the name of the of the chord that will be played
 * @param {inversion: int} inversion is the number of inversion to be played: Example: with the chord C7 (Do major with seventh minor) we have 4 possibles inversions, 1: E G Bb C, 2: G Bb C E and 3: Bb C E G
 * @param {seventh: string} seventh is a string indicating whether the chord will be played with the seventh and what kind of seventh is (7min, 7maj, 7dim)
 * @param {duration: float} duration is the duration of the playback in seconds
 */
export async function doChord(name, inversion, seventh, duration) {
  let indexName = table.indexOf(name);

  // console.log('TONIC: ', table.find(indexName), 'INDEX: ', indexName);

  let chordArr = [];

  //If is not a major chord
  if (indexName === -1) {
    //Extracting the tonic
    indexName = table.indexOf(name.charAt(0));

    chordArr = [
      table.find(indexName),
      table.find(indexName + 3),
      table.find(indexName + 7),
    ];
  } else {
    chordArr = [
      table.find(indexName),
      table.find(indexName + 4),
      table.find(indexName + 7),
    ];
  }

  // console.log(
  //   'name: ' + name,
  //   'inversion: ' + inversion,
  //   'seventh: ' + seventh,
  //   'duration: ' + duration
  // );

  // console.log(name, ' CHORD ARR: ', chordArr);

  // If the chord have seventh
  const SWITCH_SEVENTH = {
    '7dim': () => {
      chordArr.push(table.find(indexName + 9));
      return chordArr;
    },
    '7min': () => {
      chordArr.push(table.find(indexName + 10));
      return chordArr;
    },
    '7maj': () => {
      chordArr.push(table.find(indexName + 11));
      return chordArr;
    },
  };

  const SWITCH_SEVENTH_DEFAULT = chordArr;

  chordArr = SWITCH_SEVENTH[seventh]
    ? SWITCH_SEVENTH[seventh]()
    : SWITCH_SEVENTH_DEFAULT;

  //inverting chord
  [chordArr[0], chordArr[inversion]] = [chordArr[inversion], chordArr[0]];

  //console.log("ChordArr: ", chordArr);
  playChord(chordArr, duration);
}

function playChord(chordArr, duration) {
  const urls = {};
  let soundsArr = [];

  urls[`${chordArr[0]}4`] = `${chordArr[0].replace(/#/g, '%23')}.mp3`;
  //setting the tonic one octave down
  soundsArr[0] = `${chordArr[0]}3`;

  for (let i = 1; i < chordArr.length; i++) {
    urls[`${chordArr[i]}4`] = `${chordArr[i].replace(/#/g, '%23')}.mp3`;
    soundsArr[i] = `${chordArr[i]}4`;
  }

  const sampler = new Tone.Sampler({
    urls: urls,
    release: 1,
    baseUrl: `${REPOSITORY}/4/`,
  }).toDestination();

  try {
    Tone.loaded().then(() => {
      sampler.triggerAttackRelease(soundsArr, duration);
    });
  } catch (e) {
    console.error(e);
    console.log('error al reproducir');
  }
}

function buildNotesTable() {
  let table = new CircularList();

  let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  for (let i = 0; i < notes.length; i++) {
    table.add(notes[i]);
  }

  return table;
}
