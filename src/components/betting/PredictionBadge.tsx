import { cn } from "@/lib/utils";

interface PredictionBadgeProps {
    confidence: number;
    className?: string;
}

export function PredictionBadge({ confidence, className }: PredictionBadgeProps) {
    let colorClass = "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300";

    if (confidence >= 80) {
        colorClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
    } else if (confidence >= 60) {
        colorClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    }

    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", colorClass, className)}>
            {confidence}% Confidence
        </div>
    );
}
