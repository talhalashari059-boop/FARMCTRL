
import { getInventoryItems } from "@/app/actions/inventory"
import InventoryForm from "@/components/InventoryForm"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle } from "lucide-react"

export default async function InventoryPage() {
    const items = await getInventoryItems()

    return (
        <div className="space-y-6">
            <PageHeader
                title="Inventory Management"
                subtitle="Track stock levels and manage supplies."
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <InventoryForm items={items} />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader className="bg-slate-50/50 border-b border-gray-100">
                            <CardTitle className="text-base font-semibold">Current Stock Levels</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {items.map(item => (
                                    <div key={item.id} className={`flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors ${item.quantity <= item.minLevel ? 'bg-red-50/30' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{item.category}</span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className={`text-lg font-bold ${item.quantity <= item.minLevel ? 'text-red-600' : 'text-slate-700'}`}>
                                                    {item.quantity}
                                                </span>
                                                <span className="text-sm text-muted-foreground font-medium">{item.unit}</span>
                                            </div>
                                            {item.quantity <= item.minLevel && (
                                                <div className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium justify-end">
                                                    <AlertTriangle size={12} />
                                                    <span>Low Stock Alert</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && <p className="text-center py-8 text-muted-foreground">No inventory items found.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
