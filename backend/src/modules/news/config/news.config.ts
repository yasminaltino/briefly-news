import { registerAs } from '@nestjs/config';

export default registerAs('news', () => ({
  apiKey: process.env.API_KEY,
}));
