"use client"

import { useState } from "react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "../ui";
import { formatPrice } from "@/utils";
import { getSalesByDate } from "@/src/api";
import { TransactionSummary } from "./TransactionSummary";

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export function TransactionFilter() {

    const [date, setDate] = useState<Value>(new Date())

    const selectedDate = Array.isArray(date) ? date[0] : date
    const formattedDate = format(selectedDate ?? new Date(), "yyyy-MM-dd")
    const { data, isLoading, isError } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    const dailyTotal = data?.reduce((total, transaction) => total + transaction.total, 0) ?? 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
            <div className="lg:sticky lg:top-10">
                <Calendar
                    value={date}
                    onChange={setDate}
                />
            </div>
            <div>
                {isLoading ? (
                    <Spinner />
                ) : isError ? (
                    <p className="text-lg text-center text-red-600">Error al cargar las ventas.</p>
                ) : data?.length ? (
                    <>
                        <div className="flex items-center justify-between rounded-2xl border border-cielo-200 bg-white px-5 py-4 text-cielo-900 shadow-sm">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Total del dia</p>
                                <p className="text-lg font-black">{formatPrice(dailyTotal)}</p>
                            </div>
                            <span className="rounded-full bg-cielo-100 px-3 py-1 text-xs font-semibold text-cielo-700">
                                {data.length} ventas
                            </span>
                        </div>
                        {data.map((transaction) => (
                            <TransactionSummary key={transaction.id} transaction={transaction} />
                        ))}
                    </>
                ) : (
                    <p className="text-lg text-center text-milano-500">No hay ventas en esta fecha.</p>
                )}
            </div>
        </div>
    );
}
