import { config } from 'dotenv';

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  config();
}
