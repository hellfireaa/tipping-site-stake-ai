import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getEvents } from "@/lib/data";
import { AiTopTips } from "@/components/betting/AiTopTips";
import { FullFieldDetails } from "@/components/betting/FullFieldDetails";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-background">

      {/* MAIN CONTENT - Fluid Width */}
      <main className="flex-1 min-w-0">
        <div className="w-full px-4 md:px-6 space-y-6">

          {/* AI Top Tips Section */}
          <AiTopTips events={events} />

          {/* Full Field Details Section */}
          <FullFieldDetails events={events} />

        </div>
      </main>

      {/* RIGHT SIDEBAR - Promos / Betslip */}
      <aside className="hidden lg:block w-80 border-l border-white/5 bg-card/30 p-6 space-y-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto backdrop-blur-sm">

        {/* Promo Card */}
        <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="p-6 relative z-10">
            <h3 className="font-bold text-xl text-foreground leading-tight mb-2">Daily Multi Special</h3>
            <p className="text-sm text-muted-foreground mb-4">Boosted odds on our top 3 AI picks for today.</p>
            <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold border-none h-10 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Add to Slip
            </Button>
          </div>
        </div>

        {/* Trending */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Trending Bets</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card/40 border border-white/5 rounded-xl p-4 hover:bg-card/60 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Lakers vs Celtics</span>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">2.45</span>
                </div>
                <p className="text-xs text-muted-foreground">Lakers -5.5 Line</p>
              </div>
            ))}
          </div>
        </div>

      </aside>

    </div>
  )
}
