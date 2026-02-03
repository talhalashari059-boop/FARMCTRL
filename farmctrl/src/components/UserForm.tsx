
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "@/app/actions/users"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Banknote, UserPlus, Shield, Key } from "lucide-react"

export function UserForm({ creatorRole }: { creatorRole: string }) {
    const router = useRouter()
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("LABOUR")
    const [pin, setPin] = useState("")
    const [dailyWage, setDailyWage] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })

        const result = await createUser({
            id,
            name,
            role: creatorRole === 'MANAGEMENT' ? 'LABOUR' : role,
            pin,
            dailyWage: dailyWage ? parseFloat(dailyWage) : undefined
        })

        if (result.success) {
            setMessage({ type: 'success', text: 'User created successfully! / صارف کامیابی سے شامل کر لیا گیا' })
            setId("")
            setName("")
            setPin("")
            setDailyWage("")
            router.refresh()
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to create user' })
        }
        setLoading(false)
    }

    return (
        <Card className="glass-panel scale-in border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                        <UserPlus size={20} />
                    </div>
                    {creatorRole === 'MANAGEMENT' ? 'Add Labour / لیبر شامل کریں' : 'Add New Staff / نیا عملہ شامل کریں'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Full Name / پورا نام</label>
                        <Input
                            placeholder="e.g. Ahmad Khan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">System ID / سسٹم آئی ڈی</label>
                        <Input
                            placeholder="e.g. manager-2"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>

                    {creatorRole !== 'MANAGEMENT' && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 ml-1 flex items-center gap-2">
                                <Shield size={14} className="text-emerald-500" />
                                Role / عہدہ
                            </label>
                            <select
                                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="LABOUR">LABOUR / لیبر</option>
                                <option value="MANAGEMENT">MANAGER / مینیجر</option>
                            </select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1 flex items-center gap-2">
                            <Key size={14} className="text-emerald-500" />
                            Security PIN / پن کوڈ
                        </label>
                        <Input
                            type="password"
                            placeholder="****"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                            maxLength={8}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1 flex items-center gap-2">
                            <Banknote size={14} className="text-emerald-500" />
                            Daily Wage (RS) / روزانہ اجرت
                        </label>
                        <Input
                            type="number"
                            placeholder="e.g. 1500"
                            value={dailyWage}
                            onChange={(e) => setDailyWage(e.target.value)}
                            required
                        />
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <Button type="submit" className="w-full h-12 text-md font-bold shadow-lg shadow-emerald-500/10" disabled={loading}>
                        {loading ? "Creating... / شامل ہو رہا ہے..." : "Add User / شامل کریں"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

