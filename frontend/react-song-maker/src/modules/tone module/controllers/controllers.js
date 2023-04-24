import * as Tone from "tone";

export function test(){
  const synth = new Tone.Synth().toDestination();

  synth.triggerAttackRelease("c4", "8n");
}