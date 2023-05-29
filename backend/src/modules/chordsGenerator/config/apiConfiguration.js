import { Configuration, OpenAIApi } from 'openai';

const API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

export const openai = new OpenAIApi(configuration);
