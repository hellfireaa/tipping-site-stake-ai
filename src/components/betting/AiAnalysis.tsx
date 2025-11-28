import { Sparkles } from "lucide-react";

interface AiAnalysisProps {
    reasoning: string;
}

export function AiAnalysis({ reasoning }: AiAnalysisProps) {
    return (
        <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-400 font-semibold text-sm">
                <Sparkles className="h-4 w-4" />
                Gemini 3 Analysis
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {reasoning}
            </p>
        </div>
    );
}
