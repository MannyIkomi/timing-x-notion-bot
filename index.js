import dotenv from 'dotenv';
dotenv.config();
import { getProjectTimeEntries } from './timing.js';

const CLIENT_PROJECT_ID = '3511776504486172160';

getProjectTimeEntries(CLIENT_PROJECT_ID).then((res) => console.log(res));
