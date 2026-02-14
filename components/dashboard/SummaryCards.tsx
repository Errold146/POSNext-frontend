"use client"

import { AnalyticsSummary } from "@/src/schemas"
import { formatPrice } from "@/utils"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

type SummaryCardsProps = {
    summary: AnalyticsSummary
}

const cards = [
    {
        key: "totalRevenue",
        label: "Ingresos Totales",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
        format: (v: number) => formatPrice(v),
        gradient: "from-apple-50 to-apple-100/50",
        iconBg: "bg-apple-100",
        iconColor: "text-apple-700",
        valueColor: "text-apple-700"
    },
    {
        key: "totalTransactions",
        label: "Total Ventas",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        ),
        format: (v: number) => v.toString(),
        gradient: "from-cielo-50 to-cielo-100/50",
        iconBg: "bg-cielo-100",
        iconColor: "text-cielo-700",
        valueColor: "text-cielo-700"
    },
    {
        key: "totalProductsSold",
        label: "Productos Vendidos",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        ),
        format: (v: number) => `${v} uds`,
        gradient: "from-amber-50 to-amber-100/50",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-700",
        valueColor: "text-amber-700"
    },
    {
        key: "averageTicket",
        label: "Ticket Promedio",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
        ),
        format: (v: number) => formatPrice(v),
        gradient: "from-milano-50 to-milano-100/50",
        iconBg: "bg-milano-100",
        iconColor: "text-milano-700",
        valueColor: "text-milano-700"
    },
] as const

export function SummaryCards({ summary }: SummaryCardsProps) {
    const bestDayLabel = summary.bestDay.date
        ? format(parseISO(summary.bestDay.date), "d 'de' MMM", { locale: es })
        : "—"

    return (
        <div className="space-y-4">
            {/* Main metric cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.key}
                        className={`relative overflow-hidden rounded-2xl border border-cielo-200 bg-linear-to-br ${card.gradient} p-5 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.3)] transition hover:shadow-[0_12px_30px_-12px_rgba(15,23,42,0.4)]`}
                    >
                        <div className={`mb-3 inline-flex rounded-xl ${card.iconBg} p-2.5 ${card.iconColor}`}>
                            {card.icon}
                        </div>
                        <p className="text-xs font-medium uppercase tracking-wider text-cielo-500">{card.label}</p>
                        <p className={`mt-1 text-2xl font-black ${card.valueColor}`}>
                            {card.format(summary[card.key] as number)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Best day + discount highlight */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-apple-200 bg-linear-to-r from-apple-50 to-white p-5 shadow-sm">
                    <div className="rounded-xl bg-apple-100 p-3 text-apple-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.52.587 6.023 6.023 0 0 1-2.52-.587" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-cielo-500">Mejor día de ventas</p>
                        <p className="text-lg font-black text-cielo-900">{bestDayLabel}</p>
                        <p className="text-sm font-semibold text-apple-600">
                            {formatPrice(summary.bestDay.total)} · {summary.bestDay.transactions} ventas
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-milano-200 bg-linear-to-r from-milano-50 to-white p-5 shadow-sm">
                    <div className="rounded-xl bg-milano-100 p-3 text-milano-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-cielo-500">Descuentos otorgados</p>
                        <p className="text-lg font-black text-milano-600">{formatPrice(summary.totalDiscount)}</p>
                        <p className="text-sm text-cielo-500">En cupones aplicados</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
