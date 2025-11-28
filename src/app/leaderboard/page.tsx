"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBetting } from "@/context/BettingContext";
import history from "@/db/history.json";
import { Trophy, TrendingUp, DollarSign, Percent } from "lucide-react";

export default function LeaderboardPage() {
    const { betHistory, bankroll, resetBankroll, formatCurrency } = useBetting();

    // Calculate User Stats
    const userTotalBets = betHistory.length;
    const userWins = betHistory.filter(b => b.status === "won").length;
    const userWinRate = userTotalBets > 0 ? (userWins / userTotalBets) * 100 : 0;
    const userProfit = bankroll - 500; // Based on $500 starting bankroll
    const userRoi = userTotalBets > 0
        ? (userProfit / betHistory.reduce((acc, b) => acc + b.stake, 0)) * 100
        : 0;

    // Calculate AI Stats (from history.json)
    const aiTotalBets = history.length;
    const aiWins = history.filter((h: any) => h.outcome?.result === "won").length;
    const aiWinRate = aiTotalBets > 0 ? (aiWins / aiTotalBets) * 100 : 0;
    const aiProfit = history.reduce((acc, h: any) => acc + (h.profit || 0), 0); // Assuming $100 stake per tip for simplicity in history.json
    // Note: history.json profit is absolute. To calculate ROI we need total staked.
    // Let's assume the AI bets flat $100 on every tip for this calculation.
    const aiTotalStaked = aiTotalBets * 100;
    const aiRoi = aiTotalBets > 0 ? (aiProfit / aiTotalStaked) * 100 : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <h1 className="text-3xl font-bold tracking-tight">Beat the AI Leaderboard</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Card */}
                <Card className="border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20">
                    <CardHeader>
                        <CardTitle className="text-indigo-700 dark:text-indigo-300">You (The Challenger)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <DollarSign className="h-4 w-4" /> Net Profit
                                </div>
                                <div className={`text-2xl font-bold ${userProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {userProfit >= 0 ? "+" : ""}{formatCurrency(userProfit).replace('SB ', '')}
                                </div>
                                <div className="text-xs text-zinc-400">SB</div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <Percent className="h-4 w-4" /> ROI
                                </div>
                                <div className={`text-2xl font-bold ${userRoi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {userRoi.toFixed(1)}%
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <TrendingUp className="h-4 w-4" /> Win Rate
                                </div>
                                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {userWinRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <Trophy className="h-4 w-4" /> Wins
                                </div>
                                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {userWins} / {userTotalBets}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Card */}
                <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20">
                    <CardHeader>
                        <CardTitle className="text-purple-700 dark:text-purple-300">Stake.ai (The Pro)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <DollarSign className="h-4 w-4" /> Net Profit
                                </div>
                                <div className={`text-2xl font-bold ${aiProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {aiProfit >= 0 ? "+" : ""}{formatCurrency(aiProfit).replace('SB ', '')}
                                </div>
                                <div className="text-xs text-zinc-400">SB</div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <Percent className="h-4 w-4" /> ROI
                                </div>
                                <div className={`text-2xl font-bold ${aiRoi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {aiRoi.toFixed(1)}%
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <TrendingUp className="h-4 w-4" /> Win Rate
                                </div>
                                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {aiWinRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                    <Trophy className="h-4 w-4" /> Wins
                                </div>
                                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {aiWins} / {aiTotalBets}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 text-center space-y-6">
                {userProfit > aiProfit ? (
                    <div className="p-6 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">🎉 You are Winning!</h2>
                        <p className="text-green-700 dark:text-green-300">You are currently beating the AI by {formatCurrency(userProfit - aiProfit)}. Keep it up!</p>
                    </div>
                ) : (
                    <div className="p-6 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">🤖 The AI is Winning</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">The AI is currently ahead by {formatCurrency(aiProfit - userProfit)}. Check the tips and try to find some value!</p>
                    </div>
                )}

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-500 mb-4">Want to start over?</p>
                    <button
                        onClick={() => {
                            if (confirm("Are you sure you want to reset your bankroll to SB 500.00 and clear your history? This cannot be undone.")) {
                                resetBankroll();
                            }
                        }}
                        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 rounded-md text-sm font-medium transition-colors"
                    >
                        Reset Challenge
                    </button>
                </div>
            </div>
        </div>
    );
}
