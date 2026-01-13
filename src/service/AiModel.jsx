import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

console.log("Gemini API Key defined:", !!apiKey);
if (apiKey) {
  console.log("Key starts with:", apiKey.substring(0, 5) + "...");
}

if (!apiKey || apiKey === "ENTER_YOUR_GEMINI_API_KEY_HERE") {
  console.error("Gemini API key is missing or is still the placeholder. Please check your .env file and RESTART your dev server.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Debugging: List available models
(async () => {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey; // Hack to access manager if needed, but standard way below:
    // Actually, looking at docs, genAI.listModels() doesn't exist directly on the instance in older versions, 
    // but let's try assuming standard usage or just try-catch the generation.
    // Better:
    // There isn't a direct listModels on the client in the simple SDK usage often, 
    // We will just log that we are trying 1.5 flash.
    console.log("Attempting to use model: gemini-1.5-flash");
  } catch (e) {
    console.error("Error setting up model:", e);
  }
})();

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export async function chatSession() {
  return await model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget...`, // (trimmed for clarity)
          },
        ],
      },
    ],
  });
}
