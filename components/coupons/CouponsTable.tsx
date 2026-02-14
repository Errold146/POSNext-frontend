import Link from "next/link"
import { format, parseISO, isBefore } from "date-fns"
import { es } from "date-fns/locale"

import { CouponAdmin } from "@/src/schemas"
import { ToggleCouponButton } from "./ToggleCouponButton"

type CouponsTableProps = {
    coupons: CouponAdmin[]
}

function statusBadge(coupon: CouponAdmin) {
    if (!coupon.isActive) {
        return { label: "Deshabilitado", classes: "bg-cielo-100 text-cielo-600" }
    }
    const today = new Date()
    const expired = isBefore(parseISO(coupon.expirationDate), today)
    if (expired) {
        return { label: "Expirado", classes: "bg-milano-100 text-milano-700" }
    }
    return { label: "Activo", classes: "bg-apple-100 text-apple-700" }
}

export function CouponsTable({ coupons }: CouponsTableProps) {
    return (
        <div className="mt-6 rounded-2xl border border-cielo-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Administración</p>
                    <h2 className="text-lg font-black text-cielo-900">Cupones de Descuento</h2>
                </div>
                <span className="rounded-full bg-apple-100 px-3 py-1 text-xs font-semibold text-apple-700">
                    {coupons.length} cupones
                </span>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-white text-xs uppercase tracking-wider text-cielo-500">
                        <tr className="border-b border-cielo-100">
                            <th className="px-6 py-3">Cupón</th>
                            <th className="px-6 py-3">Descuento</th>
                            <th className="px-6 py-3">Expiración</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cielo-100">
                        {coupons.map((coupon) => {
                            const badge = statusBadge(coupon)
                            return (
                                <tr key={coupon.id} className="transition hover:bg-cielo-50/60">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cielo-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4.5 w-4.5 text-cielo-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-cielo-900">{coupon.name}</p>
                                                <p className="text-xs text-cielo-500">ID: {coupon.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-apple-100 px-3 py-1 text-xs font-bold text-apple-700">
                                            {coupon.percentage}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-cielo-600">
                                        {format(parseISO(coupon.expirationDate), "d 'de' MMM, yyyy", { locale: es })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.classes}`}>
                                            {badge.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <ToggleCouponButton coupon={coupon} className="px-3 py-1" />
                                            <Link
                                                className="rounded-full border border-apple-200 px-3 py-1 text-xs font-semibold text-apple-700 transition hover:bg-apple-100"
                                                href={`/admin/coupons/${coupon.id}/edit`}
                                            >
                                                Editar
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-cielo-100 md:hidden">
                {coupons.map((coupon) => {
                    const badge = statusBadge(coupon)
                    return (
                        <div key={coupon.id} className="space-y-3 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cielo-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-cielo-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-cielo-900">{coupon.name}</p>
                                    <p className="text-xs text-cielo-500">ID: {coupon.id}</p>
                                </div>
                            </div>
                            <div className="grid gap-2 text-sm text-cielo-700">
                                <div className="flex items-center justify-between">
                                    <span>Descuento</span>
                                    <span className="rounded-full bg-apple-100 px-3 py-1 text-xs font-bold text-apple-700">
                                        {coupon.percentage}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Expiración</span>
                                    <span className="text-cielo-600">
                                        {format(parseISO(coupon.expirationDate), "d 'de' MMM, yyyy", { locale: es })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Estado</span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.classes}`}>
                                        {badge.label}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    className="flex-1 rounded-full border border-apple-200 px-3 py-2 text-center text-xs font-semibold text-apple-700 transition hover:bg-apple-50"
                                    href={`/admin/coupons/${coupon.id}/edit`}
                                >
                                    Editar
                                </Link>
                                <ToggleCouponButton coupon={coupon} className="flex-1 px-3 py-2" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
