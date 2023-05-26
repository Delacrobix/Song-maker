import mongoose, { model, Schema } from 'mongoose';

const SongSchema = new Schema(
  {
    owner: {
      type: String,
    },
    songName: {
      type: String,
      required: true,
    },
    rhythmObject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rhythm',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Song', SongSchema);
