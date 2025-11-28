const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // For some reason the SDK might not expose listModels directly on the main class in all versions?
        // Let's try to just use the raw fetch if needed, but first try the SDK if possible.
        // Actually, the error message said "Call ListModels to see the list".
        // I'll try to guess a few more common ones first to save time: "gemini-1.0-pro", "gemini-1.5-pro-latest"

        // But let's try to just run a simple test with "gemini-1.5-flash-latest"
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        console.log(result.response.text());
    } catch (e) {
        console.error(e);
    }
}

listModels();
