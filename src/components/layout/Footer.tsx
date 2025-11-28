import Link from "next/link"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/stake-ai-logo.png"
                                    alt="Stake.ai Logo"
                                    width={420}
                                    height={150}
                                    className="h-32 w-auto object-contain"
                                />
                            </Link>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Advanced AI algorithms for smarter betting.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Racing Tips</Link></li>
                            <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Sports Tips</Link></li>
                            <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Results</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">About Us</Link></li>
                            <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Contact</Link></li>
                            <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Responsible Gambling</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            Don't chase your losses. Walk away. Gamble responsibly.
                        </p>
                        <div className="text-xs text-zinc-400">
                            18+ Only.
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        DISCLAIMER: This is a simulation for entertainment purposes only. No real money is involved. 'Stake Bucks' are a virtual currency with no monetary value.
                    </p>
                </div>
            </div>
        </footer>
    )
}
