"use client"

import { useQuery } from "@tanstack/react-query"
import { getAnalytics } from "@/src/api"
import { Spinner } from "@/components/ui"
import { SummaryCards } from "./SummaryCards"
import { DailySalesChart } from "./DailySalesChart"
import { TopProductsChart } from "./TopProductsChart"
import { CouponUsageTable } from "./CouponUsageTable"

export function DashboardContent() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['analytics'],
        queryFn: getAnalytics
    })

    if (isLoading) return (
        <div className="flex items-center justify-center py-20">
            <Spinner />
        </div>
    )

    if (isError || !data) return (
        <div className="py-20 text-center">
            <p className="text-lg text-milano-600">Error al cargar las analíticas.</p>
        </div>
    )

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-milano-600">Panel de control</p>
                <h1 className="mt-1 text-3xl font-black text-cielo-900">Dashboard de Ventas</h1>
                <p className="mt-2 text-sm text-cielo-500">Últimos 30 días de actividad</p>
            </div>

            {/* Summary Cards */}
            <SummaryCards summary={data.summary} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                {/* Daily Sales Chart */}
                <div className="xl:col-span-2">
                    <DailySalesChart dailySales={data.dailySales} />
                </div>

                {/* Top Products */}
                <TopProductsChart topProducts={data.topProducts} />

                {/* Coupon Usage */}
                <CouponUsageTable couponUsage={data.couponUsage} summary={data.summary} />
            </div>
        </div>
    )
}
