
'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Lock, User } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await signIn("credentials", {
                redirect: false,
                id,
                password,
            })

            if (result?.error) {
                setError("Invalid ID or PIN. / غلط شناخت یا پن کوڈ")
            } else {
                router.push("/")
                router.refresh()
            }
        } catch (err) {
            setError("An unexpected error occurred. / غیر متوقع غلطی")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <Card className="w-full max-w-md z-10 glass-panel border-0 shadow-2xl scale-in">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <span className="text-white font-bold text-2xl">FC</span>
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        FARMCTRL
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2 font-medium">
                        Farm Operations Control <br />
                        <span className="text-xs opacity-70">فارم آپریشنز کنٹرول</span>
                    </p>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                                <User size={14} className="text-emerald-500" />
                                User ID / صارف شناخت
                            </label>
                            <Input
                                id="id"
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="e.g. manager-1"
                                className="bg-white/50"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                                <Lock size={14} className="text-emerald-500" />
                                PIN / پن کوڈ
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="****"
                                className="bg-white/50"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-bold shadow-lg shadow-emerald-500/20"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login / لاگ ان کریں"}
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-xs text-muted-foreground">
                                Secure access for authorized personnel only.
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
