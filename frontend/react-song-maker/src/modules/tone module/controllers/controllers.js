import * as Tone from "tone";
import { ListaCircular } from "./circularList";

const table = buildTable();

export async function test() {
  // const player = new Tone.Player(
  //   "https://storage.googleapis.com/song-maker-samples/major-scale/C.mp3"
  // ).toDestination();
  // Tone.loaded().then(() => {
  //   player.start();
  // });
}

/**
 * @param {name: string} name is the name of the of the chord that will be played
 * @param {inversion: int} inversion is the number of inversion to be played: Example: with the chord C7 (Do major with seventh minor) we have 4 possibles inversions, 1: E G Bb C, 2: G Bb C E and 3: Bb C E G
 * @param {seventh: string} seventh is a string indicating whether the chord will be played with the seventh and what kind of seventh is (min, maj, dim)
 */
export function doMajorChord(name, inversion, seventh) {
  let indexName = table.indexOf(name);

  let chordArr = [
    table.find(indexName),
    table.find(indexName + 4),
    table.find(indexName + 7),
  ];

  // If the chord have seventh
  const SWITCH_SEVENTH = {
    dim: () => {
      chordArr.push(table.find(indexName + 9));
      return chordArr;
    },
    min: () => {
      chordArr.push(table.find(indexName + 10));
      return chordArr;
    },
    maj: () => {
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

  playChord(chordArr);
}

function playChord(chordArr) {
  const urls = {}
  let soundsArr = [];

  urls[`${chordArr[0]}4`] = `${chordArr[0]}.mp3`
  soundsArr[0] = `${chordArr[0]}3`;

  for(let i = 1; i < chordArr.length; i++) {
    urls[`${chordArr[i]}4`] = `${chordArr[i]}.mp3`
    soundsArr[i] = `${chordArr[i]}4`;
  }

  const sampler = new Tone.Sampler({
    urls: urls,
    release: 1,
    baseUrl: "https://storage.googleapis.com/song-maker-samples/major-scale/",
  }).toDestination();

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(soundsArr);
  });
}

function buildTable() {
  let table = new ListaCircular();

  let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  for (let i = 0; i < notes.length; i++) {
    table.add(notes[i]);
  }

  return table;
}
