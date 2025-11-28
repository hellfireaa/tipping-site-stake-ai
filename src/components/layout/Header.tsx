import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
            <div className="container mx-auto flex h-28 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-24 w-auto">
                            <Image
                                src="/stake-ai-logo.png"
                                alt="Stake.ai Logo"
                                width={360}
                                height={120}
                                className="h-24 w-auto object-contain dark:hidden"
                            />
                            <Image
                                src="/stake-ai-logo-dark.png"
                                alt="Stake.ai Logo"
                                width={360}
                                height={120}
                                className="h-24 w-auto object-contain hidden dark:block"
                            />
                        </div>
                    </Link>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/racing" className="hover:text-indigo-600 transition-colors">Racing</Link>
                    <Link href="/sports" className="hover:text-indigo-600 transition-colors">Sports</Link>
                    <Link href="/results" className="hover:text-indigo-600 transition-colors">Results</Link>
                    <Link href="/leaderboard" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Leaderboard</Link>
                    <Link href="/my-bets" className="hover:text-indigo-600 transition-colors">My Bets</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="hidden sm:flex">Log In</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Join Now</Button>
                </div>
            </div>
        </header>
    )
}
