import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY is not set in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateTips() {
  // Use gemini-2.0-flash with googleSearch tool
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    tools: [{ googleSearch: {} } as any]
  });

  const prompt = `
    You are an expert sports and racing analyst.
    Generate a JSON object containing 3 Australian horse racing tips and 3 Australian sports tips for TODAY.
    
    IMPORTANT INSTRUCTIONS:
    1. **Find Real Events**: Use Google Search to find actual events scheduled for today.
    2. **Select High Confidence**: Choose the 3 racing events where you have the HIGHEST confidence in your tip.
    3. **Full Field (Racing)**: For the racing events, you MUST list the **Top 12 competitors** (or the full field if less than 12).
       - **CRITICAL**: DO NOT USE PLACEHOLDERS like "Horse 1", "Jockey 2", etc.
       - If you cannot find the full field, list ONLY the competitors you can verify. It is better to have 8 real horses than 12 fake ones.
       - Search for "race field [race name] [venue]" or "form guide [venue] today".
    4. **Verify Form**: For EACH event, you MUST search for the specific competitors' recent form.
       - DO NOT hallucinate winning streaks or stats.
       - Base your "reasoning" ONLY on the search results you found.
    5. **Realistic Odds**: Estimate odds based on the real form you found.
    
    The output must strictly follow this JSON structure:
    [
      {
        "id": "r1",
        "type": "racing",
        "title": "Race Title",
        "venue": "Venue Name",
        "category": "Race Number - Distance",
        "startTime": "ISO 8601 Date String",
        "competitors": [
          { "id": "h1", "name": "Horse 1", "number": 1, "barrier": 1, "jockey": "Jockey Name", "odds": 3.50 },
          { "id": "h2", "name": "Horse 2", "number": 2, "barrier": 2, "jockey": "Jockey Name", "odds": 4.20 }
          // ... up to 12 competitors
        ],
        "prediction": {
          "winnerId": "h1",
          "confidence": 85,
          "reasoning": "CITE REAL STATS HERE. E.g. 'Has won 2 of last 3'. Do not make up stats.",
          "valueRating": "High"
        }
      },
      // ... 2 more racing events
      {
        "id": "s1",
        "type": "sport",
        "title": "Team A vs Team B",
        "venue": "Stadium Name",
        "category": "League Name",
        "startTime": "ISO 8601 Date String",
        "competitors": [
          { "id": "t1", "name": "Team A", "odds": 1.80 },
          { "id": "t2", "name": "Team B", "odds": 2.00 }
        ],
        "prediction": {
          "winnerId": "t1",
          "confidence": 75,
          "reasoning": "Detailed reasoning...",
          "valueRating": "Medium"
        }
      }
      // ... 2 more sports events
    ]
  `;

  try {
    console.log("Generating tips with Gemini (using Google Search)...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up markdown code blocks if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Find the first '[' and last ']' to extract the array
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');

    if (startIndex !== -1 && endIndex !== -1) {
      text = text.substring(startIndex, endIndex + 1);
    }

    const events = JSON.parse(text);

    const outputPath = path.join(process.cwd(), "src/db/events.json");
    await fs.writeFile(outputPath, JSON.stringify(events, null, 4));

    console.log(`Successfully wrote ${events.length} events to src/db/events.json`);
  } catch (error) {
    console.error("Error generating tips:", error);
    process.exit(1);
  }
}

generateTips();
