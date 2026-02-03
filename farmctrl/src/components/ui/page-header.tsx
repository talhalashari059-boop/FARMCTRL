
import { cn } from "@/lib/utils" // Will create this util next

export function PageHeader({ title, subtitle, action, className }: { title: string, subtitle?: string, action?: React.ReactNode, className?: string }) {
    return (
        <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 fade-in", className)}>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    {title}
                </h1>
                {subtitle && <p className="mt-2 text-lg text-[var(--muted-foreground)]">{subtitle}</p>}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    )
}
