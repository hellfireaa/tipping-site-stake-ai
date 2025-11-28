"use client";

import { useBetting } from "@/context/BettingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2, XCircle, AlertCircle, Ticket, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyBetsPage() {
    const { activeBets, betHistory, bankroll, resetBankroll, settleBet, formatCurrency } = useBetting();

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Bets</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your active bets and view betting history
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Bankroll</div>
                    <div className="text-2xl font-bold text-indigo-600">{formatCurrency(bankroll)}</div>
                    <Button variant="ghost" size="sm" onClick={resetBankroll} className="text-xs text-muted-foreground">
                        Reset Bankroll
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="active" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="active">Active Bets ({activeBets.length})</TabsTrigger>
                    <TabsTrigger value="history">History ({betHistory.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                    {activeBets.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                            <Ticket className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                            <p className="text-muted-foreground">No active bets.</p>
                        </div>
                    ) : (
                        activeBets.map((bet) => (
                            <Card key={bet.id}>
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                                    Pending
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    Placed: {new Date(bet.placedAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg">{bet.selectionName}</h3>
                                            <p className="text-muted-foreground">{bet.eventName}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-right">
                                                <div className="text-sm text-muted-foreground">Stake</div>
                                                <div className="font-bold">{formatCurrency(bet.stake)}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-muted-foreground">Potential Return</div>
                                                <div className="font-bold text-green-600">
                                                    {formatCurrency(bet.stake * bet.odds)}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <Button size="sm" variant="outline" className="h-6 text-xs text-green-600 border-green-200 hover:bg-green-50" onClick={() => settleBet(bet.id, "won")}>
                                                    Simulate Win
                                                </Button>
                                                <Button size="sm" variant="outline" className="h-6 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => settleBet(bet.id, "lost")}>
                                                    Simulate Loss
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    {betHistory.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                            <History className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                            <p className="text-muted-foreground">No betting history.</p>
                        </div>
                    ) : (
                        betHistory.map((bet) => {
                            const isWin = bet.status === "won";
                            return (
                                <Card key={bet.id} className={isWin ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {isWin ? (
                                                        <Badge className="bg-green-600 hover:bg-green-700">Won</Badge>
                                                    ) : (
                                                        <Badge variant="destructive">Lost</Badge>
                                                    )}
                                                    <span className="text-sm text-muted-foreground">
                                                        Placed: {new Date(bet.placedAt).toLocaleString()}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-lg">{bet.selectionName}</h3>
                                                <p className="text-muted-foreground">{bet.eventName}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <div className="text-right">
                                                    <div className="text-sm text-muted-foreground">Stake: {formatCurrency(bet.stake)} @ {bet.odds.toFixed(2)}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-muted-foreground">Return</div>
                                                    <div className={`font-bold text-xl ${isWin ? "text-green-600" : "text-red-600"}`}>
                                                        {isWin ? "+" : ""}{formatCurrency((bet.return || 0) - bet.stake).replace('SB ', '')}
                                                    </div>
                                                    <div className="text-xs text-zinc-400">SB</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
