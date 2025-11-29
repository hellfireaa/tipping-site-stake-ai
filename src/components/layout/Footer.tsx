import Link from "next/link"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background py-12">
            <div className="w-full px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                                <Image
                                    src="/stake-ai-logo-dark.png"
                                    alt="Stake.ai Logo"
                                    width={420}
                                    height={150}
                                    className="h-24 w-auto object-contain hidden dark:block"
                                />
                                <Image
                                    src="/stake-ai-logo.png"
                                    alt="Stake.ai Logo"
                                    width={420}
                                    height={150}
                                    className="h-24 w-auto object-contain dark:hidden"
                                />
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Advanced AI algorithms for smarter betting.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Racing Tips</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Sports Tips</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Results</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Responsible Gambling</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Don't chase your losses. Walk away. Gamble responsibly.
                        </p>
                        <div className="text-xs text-muted-foreground/60">
                            18+ Only.
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border/40 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        DISCLAIMER: This is a simulation for entertainment purposes only. No real money is involved. 'Stake Bucks' are a virtual currency with no monetary value.
                    </p>
                </div>
            </div>
        </footer>
    )
}
