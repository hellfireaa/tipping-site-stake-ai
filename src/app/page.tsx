import Link from "next/link"
import { ArrowRight, Trophy, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/betting/EventCard"
import { getEvents } from "@/lib/data";
import { PerformanceStats } from "@/components/betting/PerformanceStats";



export default async function Home() {
  const events = await getEvents();
  const racingEvents = events.filter(e => e.type === "racing");
  const sportEvents = events.filter(e => e.type === "sport");

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <PerformanceStats />

      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Next to Jump</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              AI-powered predictions for upcoming races.
            </p>
          </div>
          <Link href="/racing">
            <Button variant="ghost" className="gap-2">
              View All Racing <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {racingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Sports Highlights</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Top value plays for this weekend's matches.
            </p>
          </div>
          <Link href="/sports">
            <Button variant="ghost" className="gap-2">
              View All Sports <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sportEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  )
}
