import Link from "next/link"
import { Metadata } from "next"

import { Heading } from "@/components/ui"
import { CouponsTable } from "@/components/coupons"

export const dynamic = 'force-dynamic'
import { CouponsAdminResponseSchema } from "@/src/schemas"

export const metadata: Metadata = {
    title: "Administrador de Cupones",
    description: "Administrador de cupones de descuento",
}

async function getCoupons() {
    const url = `${process.env.API_URL}/coupons`
    const req = await fetch(url, { cache: 'no-store' })
    const json = await req.json()
    return CouponsAdminResponseSchema.parse(json)
}

export default async function CouponsPage() {
    const coupons = await getCoupons()

    return (
        <>
            <Link
                href='/admin/coupons/new'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Crear Cupón
            </Link>

            <Heading>Administrar Cupones</Heading>

            <CouponsTable coupons={coupons} />
        </>
    )
}
