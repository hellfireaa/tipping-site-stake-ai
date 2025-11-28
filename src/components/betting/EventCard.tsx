"use client";

import { Event } from "@/lib/mock-data";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionBadge } from "./PredictionBadge";
import { AiAnalysis } from "./AiAnalysis";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBetting } from "@/context/BettingContext";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const { addToSlip, slip, formatCurrency } = useBetting();
    const winner = event.competitors.find(c => c.id === event.prediction.winnerId);
    const startTime = new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleOddsClick = (competitor: any) => {
        addToSlip({
            eventId: event.id,
            eventName: event.title,
            selectionId: competitor.id,
            selectionName: competitor.name,
            odds: competitor.odds
        });
    };

    return (
        <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                            {event.category}
                        </div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                    </div>
                    <PredictionBadge confidence={event.prediction.confidence} />
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {startTime}
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {event.venue}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/50">
                    <div>
                        <div className="text-xs text-green-700 dark:text-green-400 font-medium mb-0.5">Predicted Winner</div>
                        <div className="font-bold text-green-900 dark:text-green-100">{winner?.name}</div>
                    </div>
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold"
                        onClick={() => winner && handleOddsClick(winner)}
                    >
                        {winner?.odds?.toFixed(2) ?? "N/A"}
                    </Button>
                </div>

                <AiAnalysis reasoning={event.prediction.reasoning} />

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Full Market</div>
                        <div className="text-xs text-zinc-400">{event.competitors.length} Runners</div>
                    </div>
                    <div className="max-h-60 overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                        {event.competitors.map((comp) => {
                            const isSelected = slip.some(s => s.eventId === event.id && s.selectionId === comp.id);
                            const isAiPick = comp.id === event.prediction.winnerId;

                            return (
                                <div
                                    key={comp.id}
                                    className={`flex items-center justify-between text-sm p-2 rounded-md transition-colors ${isAiPick
                                        ? "bg-purple-50 border border-purple-100 dark:bg-purple-900/20 dark:border-purple-900/50"
                                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {comp.number && (
                                            <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                                {comp.number}
                                            </span>
                                        )}
                                        <div className="flex flex-col">
                                            <span className={`font-medium ${isAiPick ? "text-purple-700 dark:text-purple-300" : ""}`}>
                                                {comp.name}
                                            </span>
                                            {isAiPick && (
                                                <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">
                                                    AI Pick
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant={isSelected ? "default" : "outline"}
                                        size="sm"
                                        className={`h-7 min-w-[60px] font-mono ${isSelected
                                            ? "bg-indigo-600 hover:bg-indigo-700"
                                            : isAiPick
                                                ? "border-purple-200 text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/50"
                                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            }`}
                                        onClick={() => handleOddsClick(comp)}
                                    >
                                        {comp.odds?.toFixed(2) ?? "-"}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </CardContent>
            <CardFooter className="bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 p-4">
                <Link
                    href={event.type === 'racing' ? `/racing/${event.id}` : `/sports/${event.id}`}
                    className="w-full text-center text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    View Full Analysis &rarr;
                </Link>
            </CardFooter>
        </Card>
    );
}
