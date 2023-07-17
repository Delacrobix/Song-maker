import { GraphQLString } from 'graphql';
import path from 'path';
import { PathInputType } from './types';
import { loadAudioFiles, readAudioFile } from '../controllers/mediaControllers';
import AudioFile from '../models/audioFile';

export const setAudioFiles = {
  name: 'setAudioFile',
  type: GraphQLString,
  description: 'This mutation sets the audio files from the given path.',
  args: {
    folderPath: { type: PathInputType },
  },
  async resolve(__, args) {
    const { folderPath } = args;
    const audioFolderPath = folderPath.path;

    try {
      const audioFiles = await loadAudioFiles(audioFolderPath);
      const savedAudioFiles = [];

      for (const audioFile of audioFiles) {
        const filePath = `${audioFolderPath}\\${audioFile}`;

        try {
          const audioData = await readAudioFile(filePath);
          const name = path.basename(filePath);

          const audioDocument = new AudioFile({
            filename: name,
            audio: audioData,
          });

          const result = await audioDocument.save();

          savedAudioFiles.push({ id: result._id, filename: result.filename });
        } catch (error) {
          console.log('Error saving audio file to MongoDB:', error);
        }
      }

      return `Audio files saved to MongoDB: ${JSON.stringify(savedAudioFiles)}`;
    } catch (error) {
      console.log('Error loading and saving audio files:', error);
    }
  },
};
