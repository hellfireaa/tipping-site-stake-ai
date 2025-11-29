import { Event } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, MapPin } from "lucide-react";

interface FullFieldDetailsProps {
    events: Event[];
}

export function FullFieldDetails({ events }: FullFieldDetailsProps) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Full Field Details</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10">
                        Next to Jump
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                        All Racing
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                        All Sports
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-card/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                        {/* Event Header */}
                        <div className="p-4 flex items-center justify-between bg-white/5 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">{event.title}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {event.venue} • {event.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/5">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-xs font-mono font-medium text-primary">
                                        {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Competitors Table */}
                        <div className="p-2">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-muted-foreground text-xs border-b border-white/5">
                                        <th className="pb-2 pl-2 font-medium">#</th>
                                        <th className="pb-2 font-medium">Competitor</th>
                                        <th className="pb-2 text-right font-medium pr-2">Odds</th>
                                        <th className="pb-2 text-right font-medium pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {event.competitors.map((comp) => (
                                        <tr key={comp.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="py-3 pl-2 text-muted-foreground font-mono text-xs">{comp.number || "-"}</td>
                                            <td className="py-3">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{comp.name}</span>
                                                    {comp.jockey && <span className="text-xs text-muted-foreground">{comp.jockey}</span>}
                                                </div>
                                            </td>
                                            <td className="py-3 text-right pr-2">
                                                <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-md group-hover:bg-primary group-hover:text-black transition-all">
                                                    {comp.odds.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right pr-2">
                                                <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 bg-transparent hover:bg-primary hover:text-black hover:border-primary transition-all">
                                                    Bet
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
