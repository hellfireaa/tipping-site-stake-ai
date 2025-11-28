"use client";

import { useState } from "react";
import { useBetting } from "@/context/BettingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ChevronUp, ChevronDown } from "lucide-react";

export function BetSlip() {
    const { slip, removeFromSlip, clearSlip, placeBet, bankroll, formatCurrency } = useBetting();
    const [isOpen, setIsOpen] = useState(false);
    const [stake, setStake] = useState(10);

    const handlePlaceBet = () => {
        if (slip.length === 0) return;

        // For simplicity, treating multiples as single bets for now in this UI
        // In a real app, we'd handle multis vs singles differently
        slip.forEach(selection => {
            placeBet({
                id: Math.random().toString(36).substr(2, 9),
                eventId: selection.eventId,
                eventName: selection.eventName,
                selectionId: selection.selectionId,
                selectionName: selection.selectionName,
                odds: selection.odds,
                stake: stake / slip.length, // Splitting stake for now
                placedAt: new Date().toISOString(),
                status: 'pending'
            });
        });
        clearSlip();
        setIsOpen(false);
    };

    if (slip.length === 0) return null;

    return (
        <div className={`fixed bottom-0 right-4 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-t-xl shadow-2xl transition-transform duration-300 z-50 ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-3rem)]"}`}>
            <div
                className="bg-indigo-600 text-white p-3 rounded-t-xl flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <span className="font-bold">Bet Slip</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{slip.length}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{formatCurrency(bankroll)}</span>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </div>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-3 mb-4">
                    {slip.map((sel) => (
                        <div key={`${sel.eventId}-${sel.selectionId}`} className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg relative group">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFromSlip(sel.eventId, sel.selectionId); }}
                                className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="text-xs text-zinc-500 mb-1">{sel.eventName}</div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{sel.selectionName}</span>
                                <span className="text-sm font-bold text-indigo-600">{sel.odds.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">Total Stake</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">SB</span>
                            <Input
                                type="number"
                                value={stake}
                                onChange={(e) => setStake(parseFloat(e.target.value))}
                                className="w-20 h-8 text-right"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Est. Return</span>
                        <span className="font-bold text-green-600">
                            {formatCurrency(slip.reduce((acc, s) => acc * s.odds, 1) * stake)}
                        </span>
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handlePlaceBet}>
                        Place Bet
                    </Button>
                </div>
            </div>
        </div>
    );
}
