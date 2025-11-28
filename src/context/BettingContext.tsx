"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Bet {
    id: string;
    eventId: string;
    selectionId: string;
    selectionName: string;
    eventName: string;
    odds: number;
    stake: number;
    placedAt: string;
    status: "pending" | "won" | "lost";
    return?: number;
}

export interface SlipSelection {
    eventId: string;
    selectionId: string;
    selectionName: string;
    eventName: string;
    odds: number;
}

interface BettingContextType {
    bankroll: number;
    activeBets: Bet[];
    betHistory: Bet[];
    slip: SlipSelection[];
    addToSlip: (selection: SlipSelection) => void;
    removeFromSlip: (eventId: string, selectionId: string) => void;
    clearSlip: () => void;
    placeBet: (bet: Bet) => void;
    settleBet: (betId: string, result: "won" | "lost") => void;
    resetBankroll: () => void;
    checkSettlement: () => Promise<void>;
    formatCurrency: (amount: number) => string;
}

const BettingContext = createContext<BettingContextType | undefined>(undefined);

export function BettingProvider({ children }: { children: React.ReactNode }) {
    const [bankroll, setBankroll] = useState(500);
    const [activeBets, setActiveBets] = useState<Bet[]>([]);
    const [betHistory, setBetHistory] = useState<Bet[]>([]);
    const [slip, setSlip] = useState<SlipSelection[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedBankroll = localStorage.getItem("punt_ai_bankroll");
        const savedActiveBets = localStorage.getItem("punt_ai_active_bets");
        const savedHistory = localStorage.getItem("punt_ai_bet_history");
        const savedSlip = localStorage.getItem("punt_ai_slip");

        if (savedBankroll) setBankroll(parseFloat(savedBankroll));
        if (savedActiveBets) setActiveBets(JSON.parse(savedActiveBets));
        if (savedHistory) setBetHistory(JSON.parse(savedHistory));
        if (savedSlip) setSlip(JSON.parse(savedSlip));
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("punt_ai_bankroll", bankroll.toString());
        localStorage.setItem("punt_ai_active_bets", JSON.stringify(activeBets));
        localStorage.setItem("punt_ai_bet_history", JSON.stringify(betHistory));
        localStorage.setItem("punt_ai_slip", JSON.stringify(slip));
    }, [bankroll, activeBets, betHistory, slip]);

    const addToSlip = (selection: SlipSelection) => {
        setSlip((prev) => {
            // Check if already in slip
            if (prev.some(s => s.eventId === selection.eventId && s.selectionId === selection.selectionId)) {
                return prev;
            }
            const filtered = prev.filter(s => s.eventId !== selection.eventId);
            return [...filtered, selection];
        });
    };

    const removeFromSlip = (eventId: string, selectionId: string) => {
        setSlip((prev) => prev.filter(s => !(s.eventId === eventId && s.selectionId === selectionId)));
    };

    const clearSlip = () => {
        setSlip([]);
    };

    const placeBet = (bet: Bet) => {
        if (bankroll < bet.stake) {
            alert("Insufficient funds!");
            return;
        }
        setBankroll((prev) => prev - bet.stake);
        setActiveBets((prev) => [...prev, bet]);
    };

    const settleBet = (betId: string, result: "won" | "lost") => {
        setActiveBets((prev) => {
            const betIndex = prev.findIndex((b) => b.id === betId);
            if (betIndex === -1) return prev;

            const bet = prev[betIndex];
            const updatedBet = { ...bet, status: result, return: result === "won" ? bet.stake * bet.odds : 0 };

            // Move to history
            setBetHistory((h) => [updatedBet, ...h]);

            // Update bankroll if won
            if (result === "won") {
                setBankroll((b) => b + (updatedBet.return || 0));
            }

            // Remove from active
            const newActive = [...prev];
            newActive.splice(betIndex, 1);
            return newActive;
        });
    };

    // Client-side settlement logic would go here, reading from a static results file
    // For now, we remove the server-side API call to enable static export
    const checkSettlement = async () => {
        console.log("Settlement check skipped for static deployment");
    };

    // Check for settlement when active bets change
    useEffect(() => {
        checkSettlement();
    }, [activeBets]);

    const resetBankroll = () => {
        setBankroll(500);
        setActiveBets([]);
        setBetHistory([]);
        setSlip([]);
    };

    const formatCurrency = (amount: number) => {
        return `SB ${amount.toFixed(2)}`;
    };

    return (
        <BettingContext.Provider value={{
            bankroll, activeBets, betHistory, slip,
            addToSlip, removeFromSlip, clearSlip,
            placeBet, settleBet, resetBankroll, checkSettlement,
            formatCurrency
        }}>
            {children}
        </BettingContext.Provider>
    );
}

export function useBetting() {
    const context = useContext(BettingContext);
    if (context === undefined) {
        throw new Error("useBetting must be used within a BettingProvider");
    }
    return context;
}
