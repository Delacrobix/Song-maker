import { openai } from '../config/apiConfiguration';
import modelsExported from '../../songMakerApi/models/exports';

const tonality = 're menor';

const prompt = `Dame una progresión armonica de 4 acordes en ${tonality}. Escribe los acordes en cifrado americano y con el siguiente formato: acorde | acorde | acorde | acorde`;

const temperature = 1.25;

//This method send the prompt to the OpenAI server
export async function createCompletion() {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: temperature,
    n: 1,
    max_tokens: 25,
  });

  const data = response.data;

  //Saving tokens spent
  await saveTokensSpent(data);

  //Saving the response
  await savePromptResults(data);

  return data;
}

//This method save in a MongoDB database the number of OpenAi tokens spent by the api request
async function saveTokensSpent(data) {
  try {
    const tokensConsumed = new modelsExported.TokensConsumed({
      tokens: Number(data.usage.total_tokens),
      openAiModel: data.model,
    });

    const saved = await tokensConsumed.save();

    console.log('Tokens consumed saved successfully: ', saved);
  } catch (err) {
    console.log(err);

    throw new Error('Error saving tokens consumed');
  }
}

//This method save the response by de AI in text plain without
async function savePromptResults(data) {
  const aux = [...data.choices];

  for (let i = 0; i < aux.length; i++) {
    let text = aux[i].text.replace(/\s/g, '');

    try {
      const testChords = new modelsExported.TestChords({
        chords: text,
        temperature: temperature,
        openAiModel: data.model,
      });

      const saved = await testChords.save();

      console.log('Chords for test saved:', saved);
    } catch (err) {
      console.error(err);

      throw new Error('Error saving chords for testing');
    }
  }
}
