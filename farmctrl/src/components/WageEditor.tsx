
'use client'

import { useState } from 'react'
import { updateWage } from '@/app/actions/users'
import { Edit2, Check, X, Banknote } from 'lucide-react'

export function WageEditor({ userId, currentWage }: { userId: string, currentWage: number | null }) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(currentWage?.toString() || "")
    const [loading, setLoading] = useState(false)

    if (!editing) {
        return (
            <div className="flex items-center gap-2 group min-h-[32px]">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100/50">
                    <Banknote size={14} className="opacity-70" />
                    <span>{currentWage ? `RS ${currentWage.toLocaleString()}` : '-'}</span>
                </div>
                <button
                    onClick={() => setEditing(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-emerald-600"
                    title="Edit Wage"
                >
                    <Edit2 size={14} />
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-1 min-h-[32px] animate-in fade-in zoom-in-95 duration-200">
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">RS</span>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-28 h-9 pl-8 pr-2 text-sm font-bold border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                    autoFocus
                    disabled={loading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const btn = e.currentTarget.nextElementSibling as HTMLButtonElement;
                            btn?.click();
                        }
                        if (e.key === 'Escape') setEditing(false);
                    }}
                />
            </div>
            <button
                onClick={async () => {
                    if (!value || isNaN(parseFloat(value))) return;
                    setLoading(true)
                    await updateWage(userId, parseFloat(value))
                    setEditing(false)
                    setLoading(false)
                }}
                disabled={loading}
                className="h-9 w-9 flex items-center justify-center bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 active:scale-95 transition-all shadow-sm shadow-emerald-500/20 disabled:opacity-50"
            >
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
            </button>
            <button
                onClick={() => setEditing(false)}
                disabled={loading}
                className="h-9 w-9 flex items-center justify-center bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all"
            >
                <X size={16} />
            </button>
        </div>
    )
}
