import * as Tone from "tone";

export function test() {
  const player = new Tone.Player(
    "../../../../../../sound-bank/major-scale/D.mp3"
  ).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
}

export function doMajorChord() {}
