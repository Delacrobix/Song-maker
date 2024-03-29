import * as Tone from 'tone';
import { CircularList } from '../utils/classes/circularList';

const usePlaySounds = () => {
  const REPOSITORY = process.env.REACT_APP_BUCKET_REPOSITORY;

  //This build a circular list with the twelve sounds of occidental music
  const table = buildNotesTable();

  function peek(stack) {
    return stack[stack.length - 1];
  }

  async function playRhythm(tempoAndMapObject) {
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

    playMeasures(score, quarterNote, durationArr);
  }

  //Recursive function
  function playMeasures(score, quarterNote, durationArr) {
    if (score.length === 0) {
      return;
    }

    setTimeout(() => {
      let lastElement = peek(score);
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
  function playSingleNote(octave, note, duration) {
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
  async function doChord(name, inversion, seventh, duration) {
    const tonic = getTonic(name);
    let indexName;

    //If the chordName have not 'b' letter, is not bemol
    if (name.indexOf('b') === -1) {
      indexName = table.indexOf(tonic);
    } else {
      //if bemol case, the array index is one less than the table index
      indexName = table.indexOf(tonic) - 1;
    }

    const typeChord = getTypeChord(name, seventh);
    const switchChord = {
      major: [
        table.find(indexName),
        table.find(indexName + 4),
        table.find(indexName + 7),
      ],

      minor: [
        table.find(indexName),
        table.find(indexName + 3),
        table.find(indexName + 7),
      ],

      dim: [
        table.find(indexName),
        table.find(indexName + 3),
        table.find(indexName + 6),
      ],
    };
    let chordArr = switchChord[typeChord];

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

    playChord(chordArr, duration);
  }

  async function playChord(chordArr, duration) {
    let urls = {};
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
      baseUrl: `${REPOSITORY}`,
    }).toDestination();

    try {
      // await Tone.loaded();
      await Tone.loaded().then(() => {
        sampler.triggerAttackRelease(soundsArr, duration);
      });
    } catch (e) {
      console.error('error al reproducir: ', e);
    }
  }

  function buildNotesTable() {
    let table = new CircularList();

    let notes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];

    for (let i = 0; i < notes.length; i++) {
      table.add(notes[i]);
    }

    return table;
  }

  function getTypeChord(chord, seventh) {
    //Major chords
    if (chord.length === 1) {
      return 'major';
    } else if (chord.length === 2 && (chord[1] === 'b' || chord[1] === '#')) {
      return 'major';
    }

    //Minor chords
    if (chord[1] === 'm' && chord[2] !== 'a') {
      return 'minor';
    } else if (chord[1] === '#' || chord[1] === 'b') {
      if (chord[2] === 'm' && chord[3] !== 'a') {
        return 'minor';
      }
    }

    //Dim chords
    if (seventh === '7dim') {
      return 'dim';
    }
  }

  function getTonic(chord) {
    if (chord[1] === '#') {
      return chord.slice(0, 2);
    } else {
      return chord.slice(0, 1);
    }
  }

  return playRhythm;
};

export default usePlaySounds;
