"use client"

import { DailySale } from "@/src/schemas"
import { formatPrice } from "@/utils"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts"

type DailySalesChartProps = {
    dailySales: DailySale[]
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; payload: { date: string } }> }) {
    if (!active || !payload?.length) return null

    const rawDate = payload[0]?.payload?.date
    const dateLabel = rawDate ? format(parseISO(rawDate), "EEEE d 'de' MMM", { locale: es }) : ""

    return (
        <div className="rounded-xl border border-cielo-200 bg-white px-4 py-3 shadow-lg">
            <p className="mb-1 text-xs font-semibold capitalize text-cielo-500">{dateLabel}</p>
            {payload.map((entry, idx) => (
                <p key={idx} className="text-sm font-bold text-cielo-900">
                    {entry.dataKey === "total" ? `Ventas: ${formatPrice(entry.value)}` : `Transacciones: ${entry.value}`}
                </p>
            ))}
        </div>
    )
}

export function DailySalesChart({ dailySales }: DailySalesChartProps) {
    const chartData = dailySales.map((d) => ({
        ...d,
        label: format(parseISO(d.date), "d MMM", { locale: es })
    }))

    return (
        <div className="rounded-2xl border border-cielo-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Tendencia</p>
                    <h2 className="text-lg font-black text-cielo-900">Ventas Diarias</h2>
                </div>
                <span className="rounded-full bg-cielo-100 px-3 py-1 text-xs font-semibold text-cielo-700">
                    Últimos 30 días
                </span>
            </div>

            {/* Area Chart - Revenue */}
            <div className="px-4 pt-6 pb-2">
                <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-cielo-500">Ingresos por día</p>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2aa63e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2aa63e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d8eaff" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#153693', fontSize: 11 }}
                            axisLine={{ stroke: '#badaff' }}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fill: '#153693', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#2aa63e"
                            strokeWidth={2.5}
                            fill="url(#colorRevenue)"
                            dot={false}
                            activeDot={{ r: 5, fill: '#2aa63e', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Bar Chart - Transactions count */}
            <div className="border-t border-cielo-100 px-4 pt-4 pb-6">
                <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-cielo-500">Número de transacciones</p>
                <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d8eaff" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#153693', fontSize: 11 }}
                            axisLine={{ stroke: '#badaff' }}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fill: '#153693', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="transactions"
                            fill="#155dfc"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={24}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
