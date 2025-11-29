import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b-0 shadow-lg shadow-black/20">
            <div className="w-full flex h-20 items-center justify-between px-6">

                <div className="flex items-center gap-10">
                    {/* Left: Seamless Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-10 w-10">
                            <Image
                                src="/robot-horse-logo.png"
                                alt="Stake.ai"
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(0,255,157,0.3)]"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white group-hover:text-white transition-colors">Stake<span className="text-primary glow-text">.ai</span></span>
                    </Link>

                    {/* Horizontal Menu */}
                    <nav className="hidden md:flex items-center gap-2">
                        <Link href="/racing" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-full transition-all">Racing</Link>
                        <Link href="/sports" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-full transition-all">Sports</Link>
                        <Link href="/promos" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-accent hover:bg-white/5 rounded-full transition-all">Promos</Link>
                    </nav>
                </div>

                {/* Center: Search (Compact) */}
                <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder="Search events, horses, teams..."
                            className="relative w-full bg-black/20 text-sm text-foreground pl-10 pr-4 py-2.5 rounded-full border border-white/5 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50 backdrop-blur-sm"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:flex">
                        My Bets
                    </Button>
                    <Button
                        size="sm"
                        className="rounded-full font-bold h-10 px-6 text-sm bg-primary text-black hover:bg-primary/90 glow-primary transition-all hover:scale-105"
                    >
                        Join Now
                    </Button>
                </div>
            </div>
            {/* Mobile Sub-nav (Keep for mobile) */}
            <div className="md:hidden flex items-center gap-6 px-6 py-3 bg-black/20 backdrop-blur-md border-b border-white/5 overflow-x-auto scrollbar-hide">
                <Link href="/racing" className="text-sm font-medium text-foreground/80 hover:text-primary whitespace-nowrap transition-colors">Racing</Link>
                <Link href="/sports" className="text-sm font-medium text-foreground/80 hover:text-primary whitespace-nowrap transition-colors">Sports</Link>
                <Link href="/live" className="text-sm font-medium text-foreground/80 hover:text-primary whitespace-nowrap transition-colors">Live</Link>
            </div>
        </header>
    )
}
