import { getEventById, getEvents } from "@/lib/data"
import { notFound } from "next/navigation"
import { Clock, MapPin, TrendingUp, ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PredictionBadge } from "@/components/betting/PredictionBadge"

export async function generateStaticParams() {
    const events = await getEvents()
    return events
        .filter(event => event.type === 'sport')
        .map((event) => ({
            id: event.id,
        }))
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function SportsEventPage({ params }: PageProps) {
    const { id } = await params
    const event = await getEventById(id)

    if (!event || event.type !== "sport") {
        notFound()
    }

    const winner = event.competitors.find(c => c.id === event.prediction.winnerId)
    const startTime = new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short' })

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <Link href="/sports" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-6">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Sports
            </Link>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                                    <TrendingUp className="h-4 w-4" />
                                    {event.category}
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight mb-2">{event.title}</h1>
                                <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {event.venue}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" /> {startTime}
                                    </div>
                                </div>
                            </div>
                            <PredictionBadge confidence={event.prediction.confidence} />
                        </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Info className="h-5 w-5 text-emerald-600" />
                            AI Analysis
                        </h2>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/50 rounded-lg p-4 mb-6">
                            <p className="text-emerald-900 dark:text-emerald-100 leading-relaxed">
                                {event.prediction.reasoning}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/50">
                                <div className="text-sm text-green-700 dark:text-green-400 font-medium mb-1">Top Pick</div>
                                <div className="font-bold text-lg text-green-900 dark:text-green-100">{winner?.name}</div>
                                <div className="text-2xl font-bold text-green-700 dark:text-green-400 mt-2">{winner?.odds?.toFixed(2) ?? "N/A"}</div>
                            </div>
                            <div className="p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:bg-zinc-800/50 dark:border-zinc-700">
                                <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">Value Rating</div>
                                <div className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{event.prediction.valueRating}</div>
                                <div className="text-xs text-zinc-500 mt-2">Based on risk/reward ratio</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Head to Head</h3>
                        <div className="space-y-3">
                            {event.competitors.map((comp) => (
                                <div key={comp.id} className={`flex items-center justify-between p-3 rounded-lg border ${comp.id === winner?.id ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/50' : 'border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
                                    <div className="font-medium text-sm">{comp.name}</div>
                                    <Button size="sm" variant={comp.id === winner?.id ? "default" : "outline"} className={comp.id === winner?.id ? "bg-green-600 hover:bg-green-700 text-white" : ""}>
                                        {comp.odds?.toFixed(2) ?? "-"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
