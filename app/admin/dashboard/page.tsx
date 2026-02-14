import { Metadata } from "next";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getAnalytics } from "@/src/api";
import { DashboardContent } from "@/components/dashboard";

export const metadata: Metadata = {
    title: "Dashboard - Analíticas de Ventas",
    description: "Panel de analíticas y métricas de ventas",
};

export default async function DashboardPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['analytics'],
        queryFn: getAnalytics
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DashboardContent />
        </HydrationBoundary>
    )
}
