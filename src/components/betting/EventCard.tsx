"use client";

import { Event } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useBetting } from "@/context/BettingContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Trophy } from "lucide-react";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const { addToSlip } = useBetting();
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
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3" /> {event.venue}
                            <span className="text-zinc-300">|</span>
                            <Clock className="w-3 h-3" /> {startTime}
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">
                        {event.category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                {/* Prediction Section */}
                {event.prediction && (
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm uppercase tracking-wider">
                                <Trophy className="w-4 h-4" />
                                AI Prediction
                            </div>
                            <p className="text-sm text-zinc-300 mb-3 leading-relaxed">
                                {event.prediction.reasoning}
                            </p>
                            <div className="flex gap-2 text-xs">
                                <span className="font-bold bg-primary/20 px-2.5 py-1 rounded text-primary border border-primary/20">
                                    {event.prediction.confidence}% Confidence
                                </span>
                                <span className="font-bold bg-accent/20 px-2.5 py-1 rounded text-accent border border-accent/20">
                                    {event.prediction.valueRating} Value
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Competitors List */}
                <div className="space-y-2 mt-auto">
                    {event.competitors.map((competitor) => (
                        <div key={competitor.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group">
                            <div className="flex items-center gap-3">
                                {competitor.number && (
                                    <span className="w-6 h-6 flex items-center justify-center bg-zinc-800 rounded-full text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                                        {competitor.number}
                                    </span>
                                )}
                                <div>
                                    <div className="font-medium text-sm text-zinc-200 group-hover:text-white transition-colors">{competitor.name}</div>
                                    {competitor.jockey && (
                                        <div className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{competitor.jockey} {competitor.barrier && `(Barrier ${competitor.barrier})`}</div>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOddsClick(competitor)}
                                className="min-w-[70px] h-8 font-bold border-primary/20 text-primary hover:bg-primary hover:text-black transition-all shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_15px_rgba(0,255,157,0.4)]"
                            >
                                {competitor.odds.toFixed(2)}
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
