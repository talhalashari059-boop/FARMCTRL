
'use client'

import { useState } from "react"
import { updateStock, createItem } from "@/app/actions/inventory"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowRightLeft, Plus, MoveUp, MoveDown } from "lucide-react"

interface Item {
    id: string
    name: string
    quantity: number
    unit: string
    minLevel: number
}

export default function InventoryForm({ items }: { items: Item[] }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'STOCK' | 'NEW'>('STOCK')

    // Stock Update State
    const [itemId, setItemId] = useState("")
    const [type, setType] = useState<'IN' | 'OUT'>('OUT')
    const [quantity, setQuantity] = useState("")
    const [relatedTo, setRelatedTo] = useState("")
    const [loading, setLoading] = useState(false)

    // New Item State
    const [newItemName, setNewItemName] = useState("")
    const [newItemCategory, setNewItemCategory] = useState("OTHER")
    const [newItemUnit, setNewItemUnit] = useState("KG")
    const [newItemMin, setNewItemMin] = useState("0")

    const handleStockUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await updateStock({
            itemId,
            type,
            quantity: parseFloat(quantity),
            relatedTo
        })

        setLoading(false)

        if (result.success) {
            setQuantity("")
            setRelatedTo("")
            router.refresh()
            alert("Stock updated successfully")
        } else {
            alert("Failed to update stock.")
        }
    }

    const handleCreateItem = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await createItem({
            name: newItemName,
            category: newItemCategory,
            unit: newItemUnit,
            minLevel: parseFloat(newItemMin)
        })

        setLoading(false)

        if (result.success) {
            setNewItemName("")
            setNewItemCategory("OTHER")
            setNewItemUnit("KG")
            setNewItemMin("0")
            setActiveTab('STOCK')
            router.refresh()
        } else {
            alert("Failed to create item")
        }
    }

    return (
        <Card className="shadow-lg border-amber-100/50">
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('STOCK')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'STOCK' ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-muted-foreground hover:bg-slate-50'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <ArrowRightLeft size={16} />
                        Update Stock
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('NEW')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'NEW' ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-muted-foreground hover:bg-slate-50'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Plus size={16} />
                        New Item
                    </div>
                </button>
            </div>

            <CardContent className="pt-6">
                {activeTab === 'STOCK' ? (
                    <form onSubmit={handleStockUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Item / سامان</label>
                            <select
                                className="flex h-11 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={itemId}
                                onChange={e => setItemId(e.target.value)}
                                required
                            >
                                <option value="">Select Item</option>
                                {items.map(i => (
                                    <option key={i.id} value={i.id}>{i.name} (Current: {i.quantity} {i.unit})</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all ${type === 'OUT' ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500' : 'border-gray-200 hover:bg-slate-50'}`}>
                                <input type="radio" className="sr-only" checked={type === 'OUT'} onChange={() => setType('OUT')} />
                                <MoveUp className="h-6 w-6" />
                                <span className="font-semibold text-sm">Issue (OUT)</span>
                            </label>
                            <label className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all ${type === 'IN' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500' : 'border-gray-200 hover:bg-slate-50'}`}>
                                <input type="radio" className="sr-only" checked={type === 'IN'} onChange={() => setType('IN')} />
                                <MoveDown className="h-6 w-6" />
                                <span className="font-semibold text-sm">Restock (IN)</span>
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Quantity / مقدار</label>
                            <Input type="number" step="0.1" value={quantity} onChange={e => setQuantity(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Related To (Optional)</label>
                            <Input value={relatedTo} onChange={e => setRelatedTo(e.target.value)} placeholder="Reason or Machine..." />
                        </div>

                        <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Stock"}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleCreateItem} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Item Name / نام</label>
                            <Input value={newItemName} onChange={e => setNewItemName(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category / قسم</label>
                            <select
                                className="flex h-11 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newItemCategory}
                                onChange={e => setNewItemCategory(e.target.value)}
                            >
                                <option value="SEED">SEED / بیج</option>
                                <option value="FERTILIZER">FERTILIZER / کھاد</option>
                                <option value="CHEMICAL">CHEMICAL / سپرے</option>
                                <option value="SPARE_PART">SPARE PART / سپیئر پارٹس</option>
                                <option value="OTHER">OTHER / دیگر</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Unit / یونٹ</label>
                                <select
                                    className="flex h-11 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={newItemUnit}
                                    onChange={e => setNewItemUnit(e.target.value)}
                                >
                                    <option value="KG">KG</option>
                                    <option value="LITRE">LITRE</option>
                                    <option value="BAG">BAG</option>
                                    <option value="PIECE">PIECE</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Min Level Alert</label>
                                <Input type="number" value={newItemMin} onChange={e => setNewItemMin(e.target.value)} />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create New Item"}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}
