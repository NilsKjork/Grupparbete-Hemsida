import open from 'open';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

console.log(chalk.greenBright("GREEN!!!"))

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = join(__dirname, '..', 'index.html');
await open(`file://${filePath}`);

console.log('Opening index.html...');
