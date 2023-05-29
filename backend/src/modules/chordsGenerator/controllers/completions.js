import { openai } from '../config/apiConfiguration';
import modelsExported from '../models/exports';
import { SavingError, ConnectionError } from '../Errors/errorsController';

let i = 0;

const temperature = 1.25;

//This method send the prompt to the OpenAI server
export async function openAIchordRequest(prompt) {
  let data;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: temperature,
      n: 1,
      max_tokens: 25,
    });

    data = response.data;
  } catch (error) {
    console.error(error);

    throw new ConnectionError('Error connecting to openAI api');
  }
  i++;

  //Saving tokens spent
  await saveTokensSpent(data);

  const aux = [...data.choices];
  let chords;

  for (let i = 0; i < aux.length; i++) {
    chords = aux[i].text.replace(/\s/g, '');

    //Saving the response
    await savePromptResults(chords, data);
  }

  return chords;
}

//This method save in a MongoDB database the number of OpenAi tokens spent by the api request
async function saveTokensSpent(data) {
  try {
    const tokensConsumed = new modelsExported.TokensConsumed({
      tokens: Number(data.usage.total_tokens),
      openAiModel: data.model,
    });

    const saved = await tokensConsumed.save();

    console.log('Tokens consumed saved successfully ', i);
  } catch (err) {
    console.log(err);

    throw new SavingError('Error saving tokens consumed');
  }
}

//This method save the response by de AI in text plain without
async function savePromptResults(chords, data) {
  try {
    const testChords = new modelsExported.TestChords({
      chords: chords,
      temperature: temperature,
      openAiModel: data.model,
    });

    const saved = await testChords.save();

    console.log('Chords for test saved ', i);
  } catch (err) {
    console.error(err);

    throw new SavingError('Error saving chords for testing');
  }
}
