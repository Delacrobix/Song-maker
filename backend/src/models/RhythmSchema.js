import { Schema, model } from 'mongoose';

const RhythmSchema = new Schema(
  {
    rhythmName: {
      type: String,
      required: true,
    },
    tempo: {
      type: Number,
      required: true,
    },
    score: [
      {
        chordName: {
          type: String,
          required: true,
        },
        seventh: {
          type: String,
        },
        inversion: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model('Rhythm', RhythmSchema);
