import { getEvents } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import fs from "fs/promises";
import path from "path";



async function getHistory() {
    try {
        const historyPath = path.join(process.cwd(), "src/db/history.json");
        const data = await fs.readFile(historyPath, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export default async function ResultsPage() {
    const history = await getHistory();

    // Sort by date (newest first)
    const sortedHistory = [...history].sort((a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Results History</h1>
                    <p className="text-muted-foreground mt-2">
                        Track record of past AI predictions and outcomes
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {sortedHistory.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No results recorded yet.
                    </div>
                ) : (
                    sortedHistory.map((event: any) => {
                        const isWin = event.outcome?.result === "won";
                        const isVoid = event.outcome?.result === "void";
                        const profit = event.profit || 0;

                        return (
                            <Card key={event.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className={`w-full md:w-2 bg-${isWin ? 'green' : isVoid ? 'zinc' : 'red'}-500 h-2 md:h-auto md:self-stretch`} />

                                    <div className="flex-1 p-6">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                                    {event.type === 'racing' ? <Trophy className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                                                    {event.category} • {new Date(event.startTime).toLocaleDateString()}
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">Prediction:</span>
                                                    <Badge variant="outline" className="font-bold">
                                                        {event.competitors.find((c: any) => c.id === event.prediction.winnerId)?.name}
                                                    </Badge>
                                                    <span className="text-sm text-muted-foreground">
                                                        ({event.competitors.find((c: any) => c.id === event.prediction.winnerId)?.odds.toFixed(2)})
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    {isWin ? (
                                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                    ) : isVoid ? (
                                                        <AlertCircle className="h-5 w-5 text-zinc-500" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-red-600" />
                                                    )}
                                                    <span className={`font-bold text-lg ${isWin ? "text-green-600" : isVoid ? "text-zinc-600" : "text-red-600"
                                                        }`}>
                                                        {isWin ? "WIN" : isVoid ? "VOID" : "LOSS"}
                                                    </span>
                                                </div>
                                                <div className={`text-sm font-medium ${profit > 0 ? "text-green-600" : profit < 0 ? "text-red-600" : "text-zinc-500"
                                                    }`}>
                                                    {profit > 0 ? "+" : ""}SB {profit.toFixed(2)}
                                                </div>
                                            </div>
                                        </div>

                                        {event.outcome?.actualWinnerName && !isWin && !isVoid && (
                                            <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                                                Winner: <span className="font-medium text-foreground">{event.outcome.actualWinnerName}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
