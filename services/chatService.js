import openai from "../config/openai.js";

class ChatServiceError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = "ChatServiceError";
    if (cause) this.cause = cause;
  }
}
export default async function chatService(message) {
  if (typeof message !== "string" || message.trim().length === 0) {
    throw new ChatServiceError("Message must be a non-empty string.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message.trim() }],
    });

    const choice = response?.choices?.[0]?.message?.content;
    if (!choice) {
      throw new ChatServiceError("Unexpected API response shape.", response);
    }
    return choice;
  } catch (err) {
    if (err.name === "OpenAIError") {
      throw new ChatServiceError(
        `OpenAI API error (${err.status ?? "unknown status"}): ${err.message}`,
        err,
      );
    }

    if (err instanceof ChatServiceError) {
      throw err;
    }

    throw new ChatServiceError("Failed to get response from OpenAI.", err);
  }
}
