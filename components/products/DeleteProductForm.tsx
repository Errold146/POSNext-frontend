"use client"

import { toast } from "sonner"
import { useActionState, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { Product } from "@/src/schemas"
import { deleteProduct } from "@/actions/delete-product-action"

type DeleteProductFormProps = {
    productId: Product["id"]
    className?: string
}

export function DeleteProductForm({ productId, className }: DeleteProductFormProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const toastIdRef = useRef<string | number | null>(null)
    const deleteProductById = deleteProduct.bind(null, productId)
    const [state, dispatch, isPending] = useActionState(deleteProductById, {
        errors: [],
        success: "",
    })

    useEffect(() => {
        if (state.errors.length) {
            const [first, ...rest] = state.errors
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current)
                toastIdRef.current = null
            }
            if (first) {
                toast.error(first)
            }
            rest.forEach((err) => toast.error(err))
            setIsOpen(false)
        }
    }, [state.errors])

    useEffect(() => {
        if (state.success) {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current)
                toastIdRef.current = null
            }
            toast.success(state.success)
            setIsOpen(false)
            const refreshId = window.setTimeout(() => {
                router.refresh()
            }, 400)
            return () => {
                window.clearTimeout(refreshId)
            }
        }
    }, [state.success, router])

    useEffect(() => {
        return () => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current)
                toastIdRef.current = null
            }
        }
    }, [])

    function handleConfirmSubmit() {
        toastIdRef.current = toast.loading("Eliminando producto...")
    }

    return (
        <>
            <button
                type="button"
                className={`rounded-full border border-milano-200 text-xs font-semibold text-milano-700 transition hover:bg-milano-100/70 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
                onClick={() => setIsOpen(true)}
                disabled={isPending}
            >
                Eliminar
            </button>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-cielo-950/40 backdrop-blur-sm px-4"
                    onClick={() => !isPending && setIsOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`delete-product-title-${productId}`}
                        className="w-full max-w-sm animate-in fade-in zoom-in-95 rounded-2xl border border-cielo-100 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header con icono */}
                        <div className="flex flex-col items-center px-6 pt-7 pb-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-milano-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-milano-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                            <h3
                                id={`delete-product-title-${productId}`}
                                className="mt-4 text-lg font-bold text-cielo-900"
                            >
                                Eliminar producto
                            </h3>
                            <p className="mt-1.5 text-center text-sm text-cielo-500">
                                Esta acción no se puede deshacer. ¿Estás seguro de que quieres continuar?
                            </p>
                        </div>

                        {/* Divider + actions */}
                        <div className="mt-4 border-t border-cielo-100 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="flex-1 rounded-xl border border-cielo-200 bg-white px-4 py-2.5 text-sm font-semibold text-cielo-700 transition hover:bg-cielo-50 focus:outline-none focus:ring-2 focus:ring-cielo-200 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isPending}
                                >
                                    Cancelar
                                </button>
                                <form action={dispatch} onSubmit={handleConfirmSubmit} className="flex-1">
                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-milano-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-milano-600 focus:outline-none focus:ring-2 focus:ring-milano-200 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Eliminando..." : "Sí, eliminar"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
