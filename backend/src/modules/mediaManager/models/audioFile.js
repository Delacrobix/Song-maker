import { model, Schema } from 'mongoose';

const AudioFileSchema = new Schema({
  filename: String,
  audio: Buffer,
});

export default model('AudioFile', AudioFileSchema);
