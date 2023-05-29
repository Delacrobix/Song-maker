import { model, Schema } from 'mongoose';

const TokensConsumedSchema = new Schema({
  tokens: {
    type: Number,
  },
  openAiModel: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('TokensConsumed', TokensConsumedSchema);
