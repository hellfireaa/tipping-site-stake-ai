import { Event } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";

interface AiTopTipsProps {
    events: Event[];
}

export function AiTopTips({ events }: AiTopTipsProps) {
    // Simulate AI selection - in a real app this would come from the backend
    const topTips = events.slice(0, 3);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">AI Top Tips</h2>
                        <p className="text-xs text-muted-foreground">Highest confidence predictions for today</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:text-primary/80 hover:bg-primary/5">
                    View All Predictions <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {topTips.map((event, index) => (
                    <div key={event.id} className="group relative overflow-hidden rounded-2xl bg-card/30 border border-white/10 backdrop-blur-md hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all"></div>

                        <div className="p-5 relative z-10 space-y-4">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-white/5">
                                    {event.type}
                                </span>
                                <div className="flex items-center gap-1 text-primary">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span className="text-xs font-bold">9{8 - index}% Match</span>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div>
                                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {event.venue || "Flemington"}
                                </p>
                            </div>

                            {/* Prediction Box */}
                            <div className="bg-black/40 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-medium text-muted-foreground">AI Prediction</span>
                                    <span className="text-xs font-bold text-primary">Win Bet</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-foreground">
                                        {event.competitors?.[0]?.name || "Favorite"}
                                    </span>
                                    <span className="px-2 py-1 bg-primary text-black text-xs font-bold rounded-md shadow-[0_0_10px_rgba(0,255,157,0.3)]">
                                        $2.40
                                    </span>
                                </div>
                            </div>

                            {/* Action */}
                            <Button className="w-full bg-white/5 hover:bg-primary hover:text-black text-foreground font-bold border border-white/10 hover:border-primary/50 transition-all">
                                Add to Slip
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
