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
        slip.forEach(selection => {
            placeBet({
                id: Math.random().toString(36).substr(2, 9),
                eventId: selection.eventId,
                eventName: selection.eventName,
                selectionId: selection.selectionId,
                selectionName: selection.selectionName,
                odds: selection.odds,
                stake: stake / slip.length,
                placedAt: new Date().toISOString(),
                status: 'pending'
            });
        });
        clearSlip();
        setIsOpen(false);
    };

    if (slip.length === 0) return null;

    return (
        <div className={`fixed bottom-0 right-0 md:right-0 w-full md:w-80 bg-background border-t md:border-l border-border shadow-2xl transition-transform duration-300 z-50 ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-3rem)]"} md:translate-y-0 md:static md:h-full`}>
            {/* Header */}
            <div
                className="bg-card border-b border-border p-3 flex items-center justify-between cursor-pointer md:cursor-default"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs">
                        {slip.length}
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wide text-foreground">Bet Slip</span>
                </div>
                <div className="flex items-center gap-3 md:hidden">
                    <span className="font-bold text-sm text-accent">{formatCurrency(bankroll)}</span>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(100vh-14rem)] md:h-auto">
                <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-background">
                    {slip.map((sel) => (
                        <div key={`${sel.eventId}-${sel.selectionId}`} className="bg-card border border-border p-3 rounded-sm relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFromSlip(sel.eventId, sel.selectionId); }}
                                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="pr-6">
                                <div className="font-bold text-sm text-primary mb-0.5">{sel.selectionName}</div>
                                <div className="text-xs text-muted-foreground mb-2">{sel.eventName}</div>
                            </div>
                            <div className="flex justify-between items-center bg-muted/50 p-2 rounded-sm">
                                <span className="font-bold text-sm text-foreground">Win</span>
                                <span className="font-bold text-sm text-primary bg-primary/10 px-2 py-0.5 rounded">{sel.odds.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / Stake */}
                <div className="p-3 bg-card border-t border-border space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Stake per bet</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground">$</span>
                            <Input
                                type="number"
                                value={stake}
                                onChange={(e) => setStake(parseFloat(e.target.value))}
                                className="w-20 h-8 text-right font-bold bg-background border-border focus:border-primary rounded-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Est. Returns</span>
                        <span className="font-bold text-lg text-primary">
                            {formatCurrency(slip.reduce((acc, s) => acc * s.odds, 1) * stake)}
                        </span>
                    </div>

                    <Button
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base h-10 rounded-sm uppercase tracking-wide shadow-sm"
                        onClick={handlePlaceBet}
                    >
                        Place Bet
                    </Button>
                </div>
            </div>
        </div>
    );
}
