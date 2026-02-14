"use client"

import { CouponUsage as CouponUsageType, AnalyticsSummary } from "@/src/schemas"
import { formatPrice } from "@/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

type CouponUsageTableProps = {
    couponUsage: CouponUsageType[]
    summary: AnalyticsSummary
}

const PIE_COLORS = [
    "#155dfc", // cielo-600
    "#2aa63e", // apple-600
    "#f4190e", // milano-600
    "#d97706", // amber-600
    "#8b5cf6", // violet
    "#06b6d4", // cyan
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
    if (!active || !payload?.length) return null

    return (
        <div className="rounded-xl border border-cielo-200 bg-white px-4 py-3 shadow-lg">
            <p className="text-sm font-bold text-cielo-900">{payload[0].name}</p>
            <p className="text-xs text-cielo-600">{payload[0].value} usos</p>
        </div>
    )
}

export function CouponUsageTable({ couponUsage, summary }: CouponUsageTableProps) {
    const hasCoupons = couponUsage.length > 0

    const pieData = couponUsage.map((c) => ({
        name: c.name,
        value: c.usageCount
    }))

    return (
        <div className="rounded-2xl border border-cielo-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Descuentos</p>
                    <h2 className="text-lg font-black text-cielo-900">Uso de Cupones</h2>
                </div>
                {hasCoupons && (
                    <span className="rounded-full bg-milano-100 px-3 py-1 text-xs font-semibold text-milano-700">
                        {formatPrice(summary.totalDiscount)} ahorrado
                    </span>
                )}
            </div>

            {hasCoupons ? (
                <div className="p-5">
                    {/* Pie chart */}
                    <div className="mb-4">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend / Table */}
                    <div className="space-y-2">
                        {couponUsage.map((coupon, idx) => (
                            <div
                                key={coupon.name}
                                className="flex items-center justify-between rounded-xl bg-cielo-50/50 px-4 py-3 transition hover:bg-cielo-50"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-cielo-900">{coupon.name}</p>
                                        <p className="text-xs text-cielo-500">{coupon.usageCount} {coupon.usageCount === 1 ? 'uso' : 'usos'}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-milano-600">-{formatPrice(coupon.totalDiscount)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-3 rounded-full bg-cielo-50 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-cielo-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-cielo-500">No se han usado cupones</p>
                    <p className="text-xs text-cielo-400">en los últimos 30 días</p>
                </div>
            )}
        </div>
    )
}
