import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const localEnvConfig = dotenv.parse(fs.readFileSync('.env.local'));
Object.entries(localEnvConfig).forEach(([k, v]) => {
  process.env[k] = v;
});
