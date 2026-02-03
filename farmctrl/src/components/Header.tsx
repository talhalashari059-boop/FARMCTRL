
import { Menu } from "lucide-react"

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md px-4 shadow-sm md:hidden">
            <button
                onClick={onMenuClick}
                className="inline-flex items-center justify-center rounded-md p-2 text-[var(--foreground)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
                <Menu size={24} />
            </button>
            <span className="text-lg font-bold text-[var(--primary)]">FARMCTRL</span>
        </header>
    )
}
