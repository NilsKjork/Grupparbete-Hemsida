import open from 'open';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = __dirname + '/index.html';

await open(`file://${filePath}`);

console.log('Opening index.html...');
