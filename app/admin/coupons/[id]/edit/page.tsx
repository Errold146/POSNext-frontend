import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Heading } from "@/components/ui"
import { EditCouponForm } from "@/components/coupons"
import { CouponAdminSchema } from "@/src/schemas"

export const metadata: Metadata = {
    title: "Editar Cupón",
    description: "Edición de cupones de descuento",
}

type Params = Promise<{ id: string }>

async function getCoupon(id: string) {
    const url = `${process.env.API_URL}/coupons/${id}/admin`
    const req = await fetch(url)
    const json = await req.json()

    if (!req.ok) {
        notFound()
    }

    return CouponAdminSchema.parse(json)
}

export default async function EditCouponPage({ params }: { params: Params }) {
    const { id } = await params
    const coupon = await getCoupon(id)

    return (
        <>
            <Link
                href='/admin/coupons'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Volver
            </Link>

            <Heading>Editar Cupón: {coupon.name}</Heading>

            <EditCouponForm coupon={coupon} />
        </>
    )
}
