"use client"

import Image from "next/image"
import { TopProduct } from "@/src/schemas"
import { formatPrice, getImagePath } from "@/utils"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

type TopProductsChartProps = {
    topProducts: TopProduct[]
}

const COLORS = [
    "#2aa63e", // apple-600
    "#34b349", // apple-500
    "#155dfc", // cielo-600
    "#2b7eff", // cielo-500
    "#f4190e", // milano-600
    "#ff382e", // milano-500
    "#d97706", // amber-600
    "#f59e0b", // amber-500
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: TopProduct }> }) {
    if (!active || !payload?.length) return null
    const product = payload[0].payload

    return (
        <div className="rounded-xl border border-cielo-200 bg-white px-4 py-3 shadow-lg">
            <p className="mb-1 text-sm font-bold text-cielo-900">{product.name}</p>
            <p className="text-xs text-cielo-600">{product.quantity} unidades vendidas</p>
            <p className="text-xs font-semibold text-apple-600">{formatPrice(product.revenue)}</p>
        </div>
    )
}

export function TopProductsChart({ topProducts }: TopProductsChartProps) {
    if (!topProducts.length) {
        return (
            <div className="flex items-center justify-center rounded-2xl border border-cielo-200 bg-white p-10 shadow-sm">
                <p className="text-cielo-500">No hay datos de productos</p>
            </div>
        )
    }

    const chartData = topProducts.map((p) => ({
        ...p,
        shortName: p.name.length > 14 ? p.name.slice(0, 14) + "…" : p.name
    }))

    return (
        <div className="rounded-2xl border border-cielo-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Ranking</p>
                    <h2 className="text-lg font-black text-cielo-900">Productos Top</h2>
                </div>
                <span className="rounded-full bg-apple-100 px-3 py-1 text-xs font-semibold text-apple-700">
                    Por cantidad
                </span>
            </div>

            {/* Chart */}
            <div className="px-4 pt-6 pb-4">
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d8eaff" horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: '#153693', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="shortName"
                            width={110}
                            tick={{ fill: '#153693', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="quantity" radius={[0, 8, 8, 0]} maxBarSize={28}>
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Product list */}
            <div className="border-t border-cielo-100">
                <ul className="divide-y divide-cielo-50">
                    {topProducts.slice(0, 5).map((product, idx) => (
                        <li key={product.productId} className="flex items-center gap-3 px-5 py-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cielo-100 text-xs font-black text-cielo-700">
                                {idx + 1}
                            </span>
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cielo-50">
                                <Image
                                    src={getImagePath(product.image)}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    sizes="40px"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-cielo-900">{product.name}</p>
                                <p className="text-xs text-cielo-500">{product.quantity} vendidos</p>
                            </div>
                            <p className="text-sm font-bold text-apple-600">{formatPrice(product.revenue)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
