import chatService from '../services/chatService.js'
import logger from '../utils/logger.js'
async function handleChat(req, res) {
  const { message } = req.body;
console.log(req.body)

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const reply = await chatService(message);
    logger.info("OpenAI response sent.");
    res.json({ answer: reply });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export default handleChat