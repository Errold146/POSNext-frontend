"use client"

import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { CouponForm } from "./CouponForm"
import type { CouponAdmin } from "@/src/schemas"
import { updateCoupon } from "@/actions/update-coupon-action"

type EditCouponFormProps = {
    coupon: CouponAdmin
}

export function EditCouponForm({ coupon }: EditCouponFormProps) {

    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateCouponById = updateCoupon.bind(null, +id)
    const [state, dispatch] = useActionState(updateCouponById, {
        errors: [],
        fieldErrors: {},
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(err => toast.error(err))
        }
    }, [state.errors])

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/coupons')
        }
    }, [state.success])

    return (
        <form action={dispatch}>
            <CouponForm coupon={coupon} fieldErrors={state.fieldErrors} />
            <input
                type="submit"
                className="mt-5 w-full cursor-pointer rounded-xl bg-apple-500 py-3 text-sm font-bold uppercase tracking-wide text-apple-50 shadow-sm transition hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-apple-200"
                value='Actualizar Cupón'
            />
        </form>
    )
}
