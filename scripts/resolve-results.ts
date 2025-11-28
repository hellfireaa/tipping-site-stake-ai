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

async function resolveResults() {
    const eventsPath = path.join(process.cwd(), "src/db/events.json");
    const historyPath = path.join(process.cwd(), "src/db/history.json");

    try {
        // Read current events
        const eventsData = await fs.readFile(eventsPath, "utf-8");
        const events = JSON.parse(eventsData);

        if (events.length === 0) {
            console.log("No events to resolve.");
            return;
        }

        // Read history
        let history = [];
        try {
            const historyData = await fs.readFile(historyPath, "utf-8");
            history = JSON.parse(historyData);
        } catch (e) {
            // History file might not exist yet or be empty
        }

        // Use gemini-2.0-flash with googleSearch tool
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            tools: [{ googleSearch: {} } as any]
        });

        console.log(`Resolving results for ${events.length} events...`);

        const resolvedEvents = [];

        for (const event of events) {
            const prompt = `
        I need to know the result of this event to settle a bet.
        Event: ${event.title}
        Category: ${event.category}
        Venue: ${event.venue}
        Date: ${event.startTime}
        
        My Prediction was: ${event.prediction.winnerId} (Competitor Name: ${event.competitors.find((c: any) => c.id === event.prediction.winnerId)?.name})
        
        Please search for the official results.
        Did my predicted competitor win?
        
        Return a JSON object ONLY:
        {
          "result": "won" | "lost" | "void" (void if abandoned/cancelled),
          "actualWinnerName": "Name of the winner",
          "scoreOrTime": "Score or winning time if applicable"
        }
      `;

            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                let text = response.text();
                text = text.replace(/```json/g, "").replace(/```/g, "").trim();
                const outcome = JSON.parse(text);

                const predictedCompetitor = event.competitors.find((c: any) => c.id === event.prediction.winnerId);
                const odds = predictedCompetitor?.odds || 1.0;
                const stake = 20;
                let profit = 0;

                if (outcome.result === "won") {
                    profit = (stake * odds) - stake;
                } else if (outcome.result === "lost") {
                    profit = -stake;
                } else {
                    profit = 0; // Void
                }

                resolvedEvents.push({
                    ...event,
                    outcome: outcome,
                    profit: parseFloat(profit.toFixed(2)),
                    resolvedAt: new Date().toISOString()
                });

                console.log(`Resolved ${event.title}: ${outcome.result.toUpperCase()} (${profit >= 0 ? '+' : ''}$${profit.toFixed(2)})`);

            } catch (err) {
                console.error(`Failed to resolve event ${event.id}:`, err);
                // Keep it to try again? Or mark as error? For now, skip.
            }
        }

        // Update history
        const newHistory = [...history, ...resolvedEvents];
        await fs.writeFile(historyPath, JSON.stringify(newHistory, null, 4));
        console.log(`Updated history with ${resolvedEvents.length} new results.`);

        // Clear events.json (optional, but good for workflow)
        // await fs.writeFile(eventsPath, "[]");
        // console.log("Cleared events.json");

    } catch (error) {
        console.error("Error resolving results:", error);
        process.exit(1);
    }
}

resolveResults();
