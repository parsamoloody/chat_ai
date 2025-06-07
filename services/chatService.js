import openai from '../config/openai.js'

async function getChatResponse(message) {
  try {
    if (!message) {
        return "internal server error: message not defined"
    }
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-4o-mini",
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error("Failed to get response from OpenAI.");
  }
}
export default getChatResponse