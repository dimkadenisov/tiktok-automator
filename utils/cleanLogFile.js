import { writeFile } from 'fs/promises';

async function cleanLogFile() {
  writeFile('log.txt', '');
}

export { cleanLogFile };
