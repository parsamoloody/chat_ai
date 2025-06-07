import { OpenAI } from 'openai/client.js';
import env from 'dotenv'
env.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai