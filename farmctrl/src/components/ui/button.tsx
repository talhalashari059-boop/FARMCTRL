
import { ButtonHTMLAttributes, forwardRef } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Simple utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive"
    size?: "sm" | "default" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {

        // Base styles (using CSS variables for customization)
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"

        const variants = {
            default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg hover:-translate-y-0.5",
            secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] border border-[var(--border)]",
            outline: "border border-[var(--input)] bg-transparent hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
            ghost: "hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
            destructive: "bg-[var(--danger)] text-white hover:opacity-90 shadow-sm",
        }

        const sizes = {
            sm: "h-8 px-3 text-xs",
            default: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-lg",
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
