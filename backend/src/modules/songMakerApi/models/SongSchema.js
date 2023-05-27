import mongoose, { model, Schema } from 'mongoose';

const SongSchema = new Schema({
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
  date: {
    type: mongoose.Schema.Types.Date,
  },
});

export default model('Song', SongSchema);
