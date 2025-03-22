import open from 'open';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = join(__dirname, '..', 'index.html');
await open(`file://${filePath}`);

console.log('Opening index.html...');
