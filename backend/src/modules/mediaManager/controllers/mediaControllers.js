import fs from 'fs';

export async function getFileNames(folderPath) {
  try {
    const files = await fs.promises.readdir(folderPath);

    return files;
  } catch (e) {
    throw new Error(`Error getting name files from ${folderPath}: `, e);
  }
}

export async function loadAudioFiles(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const audioFiles = files.filter((file) => file.endsWith('.mp3'));

        resolve(audioFiles);
      }
    });
  });
}

export async function readAudioFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
