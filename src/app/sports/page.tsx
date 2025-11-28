import { EventCard } from "@/components/betting/EventCard"
import { getEvents } from "@/lib/data"



export default async function SportsPage() {
    const events = await getEvents()
    const sportEvents = events.filter(e => e.type === "sport")

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sports Tips</h1>
                    <p className="text-muted-foreground mt-2">
                        Expert analysis and predictions for upcoming matches
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sportEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    )
}
