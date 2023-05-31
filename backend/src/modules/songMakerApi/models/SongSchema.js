import { model, Schema } from 'mongoose';

const SongSchema = new Schema({
  owner: {
    type: String,
  },
  songName: {
    type: String,
    required: true,
  },
  rhythmObject: {
    rhythmName: {
      type: String,
      required: true,
    },
    tempo: {
      type: Number,
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
  date: {
    type: Date,
  },
});

export default model('Song', SongSchema);
