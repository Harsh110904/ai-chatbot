const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function generateResponse(prompt) {
  try {
    console.log('Using model: gemini-pro-latest');
    const model = ai.getGenerativeModel({ model: "gemini-pro-latest" });
    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error('AI Service Error:', error.message);
    console.error('Full error:', error);
    return "Sorry, I encountered an error processing your request.";
  }
}

module.exports = generateResponse;
