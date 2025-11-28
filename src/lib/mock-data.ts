import { Zap, Trophy, TrendingUp } from "lucide-react";

export type EventType = "racing" | "sport";

export interface Competitor {
    id: string;
    name: string;
    number?: number; // For horses
    barrier?: number; // For horses
    jockey?: string; // For horses
    odds: number;
}

export interface AiPrediction {
    winnerId: string;
    confidence: number; // 0-100
    reasoning: string;
    valueRating: "High" | "Medium" | "Low";
}

export interface Event {
    id: string;
    type: EventType;
    title: string;
    venue: string;
    startTime: string; // ISO string
    competitors: Competitor[];
    prediction: AiPrediction;
    category: string; // e.g., "R1 Flemington", "AFL"
}

export const MOCK_EVENTS: Event[] = [
    // Racing - Wednesday 26 Nov 2025
    {
        id: "r1",
        type: "racing",
        title: "Geelong Twilight",
        venue: "Geelong",
        category: "Race 4 - 1400m",
        startTime: "2025-11-26T15:40:00+11:00",
        competitors: [
            { id: "h1", name: "Coastal Town", number: 2, barrier: 4, jockey: "D. Lane", odds: 3.20 },
            { id: "h2", name: "Thunder Point", number: 5, barrier: 8, jockey: "J. McNeil", odds: 5.50 },
            { id: "h3", name: "Stormy Grey", number: 1, barrier: 2, jockey: "B. Mertens", odds: 4.80 },
            { id: "h4", name: "Red Pharoah", number: 8, barrier: 11, jockey: "C. Williams", odds: 9.00 },
        ],
        prediction: {
            winnerId: "h1",
            confidence: 82,
            reasoning: "Coastal Town drops in class and draws perfectly in barrier 4. Damian Lane takes the ride, which is a strong signal from the stable. Recent jump-outs suggest peak fitness for this 1400m assignment.",
            valueRating: "High"
        }
    },
    {
        id: "r2",
        type: "racing",
        title: "Wyong Provincial",
        venue: "Wyong",
        category: "Race 6 - 1100m",
        startTime: "2025-11-26T14:15:00+11:00",
        competitors: [
            { id: "h5", name: "Speedy Gonzales", number: 3, barrier: 1, jockey: "T. Berry", odds: 2.80 },
            { id: "h6", name: "Shadow Runner", number: 4, barrier: 6, jockey: "J. Collett", odds: 4.20 },
            { id: "h7", name: "Magic Time", number: 2, barrier: 5, jockey: "N. Rawiller", odds: 6.00 },
        ],
        prediction: {
            winnerId: "h5",
            confidence: 78,
            reasoning: "Speedy Gonzales has excellent early speed and should lead from the inside gate. The Wyong track favors leaders over this distance. Trial form has been sharp.",
            valueRating: "Medium"
        }
    },
    {
        id: "r3",
        type: "racing",
        title: "Ipswich Metro",
        venue: "Ipswich",
        category: "Race 5 - 1666m",
        startTime: "2025-11-26T16:00:00+11:00",
        competitors: [
            { id: "h8", name: "Queensland Rose", number: 7, barrier: 3, jockey: "J. Orman", odds: 3.50 },
            { id: "h9", name: "Brisbane Boy", number: 1, barrier: 9, jockey: "R. Maloney", odds: 4.00 },
            { id: "h10", name: "Gold Coast Girl", number: 5, barrier: 2, jockey: "A. Jones", odds: 8.50 },
        ],
        prediction: {
            winnerId: "h8",
            confidence: 65,
            reasoning: "Queensland Rose is stepping up to her preferred distance. Orman has a great strike rate at Ipswich. The soft draw allows her to settle closer to the speed than last start.",
            valueRating: "Low"
        }
    },
    // Sports - Wednesday 26 Nov 2025
    {
        id: "s1",
        type: "sport",
        title: "Melb Stars vs Hobart Hurricanes",
        venue: "Junction Oval",
        category: "WBBL",
        startTime: "2025-11-26T15:10:00+11:00",
        competitors: [
            { id: "t1", name: "Melbourne Stars", odds: 1.85 },
            { id: "t2", name: "Hobart Hurricanes", odds: 1.95 },
        ],
        prediction: {
            winnerId: "t1",
            confidence: 70,
            reasoning: "The Stars have a strong home record at Junction Oval. Their top-order batting has been consistent, and the spin attack should suit the pitch conditions expected tomorrow.",
            valueRating: "Medium"
        }
    },
    {
        id: "s2",
        type: "sport",
        title: "Sydney Flames vs Geelong Venom",
        venue: "Quaycentre",
        category: "WNBL",
        startTime: "2025-11-26T19:00:00+11:00",
        competitors: [
            { id: "t3", name: "Sydney Flames", odds: 1.45 },
            { id: "t4", name: "Geelong Venom", odds: 2.75 },
        ],
        prediction: {
            winnerId: "t3",
            confidence: 88,
            reasoning: "Sydney Flames are on a 5-game winning streak and playing at home. Geelong has struggled on the road this season, particularly defensively against fast-paced teams.",
            valueRating: "High"
        }
    },
    {
        id: "s3",
        type: "sport",
        title: "Melb Renegades vs Perth Scorchers",
        venue: "CitiPower Centre",
        category: "WBBL",
        startTime: "2025-11-26T10:00:00+11:00", // Morning game
        competitors: [
            { id: "t5", name: "Melb Renegades", odds: 2.10 },
            { id: "t6", name: "Perth Scorchers", odds: 1.72 },
        ],
        prediction: {
            winnerId: "t6",
            confidence: 75,
            reasoning: "Perth Scorchers have the best bowling attack in the league. The early start time might assist swing, which favors their pace battery. Renegades have been inconsistent with the bat.",
            valueRating: "Medium"
        }
    }
];
