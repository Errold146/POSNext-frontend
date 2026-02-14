import Link from "next/link"
import { Metadata } from "next"

import { Heading } from "@/components/ui"
import { AddCouponForm } from "@/components/coupons"

export const metadata: Metadata = {
    title: "Crear Cupón",
    description: "Creación de nuevos cupones de descuento",
}

export default function NewCouponPage() {
    return (
        <>
            <Link
                href='/admin/coupons'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Volver
            </Link>

            <Heading>Nuevo Cupón</Heading>

            <AddCouponForm />
        </>
    )
}
