import { EventCard } from "@/components/betting/EventCard"
import { getEvents } from "@/lib/data"



export default async function RacingPage() {
    const events = await getEvents()
    const racingEvents = events.filter(e => e.type === "racing")

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Racing Tips</h1>
                    <p className="text-muted-foreground mt-2">
                        Expert analysis and predictions for upcoming races
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {racingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    )
}
