import { registerAs } from '@nestjs/config';

export default registerAs('news', () => ({
  apiKey: process.env.NEWS_API_KEY,
}));
