import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react";
import fs from "fs/promises";
import path from "path";
import { useBetting } from "@/context/BettingContext";

async function getStats() {
    try {
        const historyPath = path.join(process.cwd(), "src/db/history.json");
        const data = await fs.readFile(historyPath, "utf-8");
        const history = JSON.parse(data);

        if (history.length === 0) return null;

        const totalTips = history.length;
        const wins = history.filter((h: any) => h.outcome?.result === "won").length;
        const totalProfit = history.reduce((sum: number, h: any) => sum + (h.profit || 0), 0);
        const winRate = Math.round((wins / totalTips) * 100);
        const roi = Math.round((totalProfit / (totalTips * 20)) * 100);

        return { totalTips, wins, totalProfit, winRate, roi };
    } catch (e) {
        return null;
    }
}

export async function PerformanceStats() {
    const stats = await getStats();

    if (!stats) return null;

    return (
        <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                    <DollarSign className={`h-4 w-4 ${stats.totalProfit >= 0 ? "text-green-500" : "text-red-500"}`} />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stats.totalProfit >= 0 ? "+" : ""}SB {stats.totalProfit.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">Based on flat stakes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.winRate}%</div>
                    <p className="text-xs text-muted-foreground">{stats.wins} wins from {stats.totalTips} tips</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ROI</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${stats.roi >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stats.roi}%
                    </div>
                    <p className="text-xs text-muted-foreground">Return on Investment</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalTips}</div>
                    <p className="text-xs text-muted-foreground">Lifetime predictions</p>
                </CardContent>
            </Card>
        </div>
    );
}
