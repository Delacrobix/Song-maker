import { openai } from './apiConfiguration';

//This method send the prompt to the OpenAI server
export async function createCompletion() {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt:
      'Dame una progresión armonica de 4 acordes en do menor. Escribe los acordes en cifrado americano y con el siguiente formato: acorde1 | acorde2 | acorde3 | acorde4',
    temperature: 1.35,
    n: 1,
    max_tokens: 25,
  });

  return response.data;
}
