import { Metadata } from "next";
import { format } from "date-fns";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Heading } from "@/components/ui";

export const dynamic = 'force-dynamic'
import { getSalesByDate } from "@/src/api";
import { TransactionFilter } from "@/components/transactions";

export const metadata: Metadata = {
	title: "Administrador de Ventas",
	description: "Administrador de ventas",
};

export default async function SalesPage() {

    const queryClient = new QueryClient()

    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd')
    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    return (
        <>
            <Heading>Ventas</Heading>
            <p className="text-lg mb-5">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha.</p>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionFilter />
            </HydrationBoundary>
        </>
    )
}
