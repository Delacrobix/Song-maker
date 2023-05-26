import { model, Schema } from 'mongoose';

const TestChordsSchema = new Schema({
  chords: {
    type: String,
  },
  temperature: {
    type: String,
  },
  openAiModel: {
    type: String,
  },
});

export default model('TestChords', TestChordsSchema);
