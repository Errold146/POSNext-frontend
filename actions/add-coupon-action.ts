"use server"

import { ErrorResponseSchema, CouponFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[] | undefined>
    success: string
}

export async function addCoupon(prevState: ActionStateType, formData: FormData) {

    const coupon = CouponFormSchema.safeParse({
        name: formData.get('name'),
        percentage: formData.get('percentage'),
        expirationDate: formData.get('expirationDate'),
    })

    if (!coupon.success) {
        const fieldErrors = coupon.error.flatten((issue) => issue.message).fieldErrors
        return {
            errors: coupon.error.issues.map(err => err.message),
            fieldErrors,
            success: ''
        }
    }

    const url = `${process.env.API_URL}/coupons`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coupon.data)
    })

    const json = await req.json()

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(err => err),
            fieldErrors: {},
            success: ''
        }
    }

    return {
        errors: [],
        fieldErrors: {},
        success: 'Cupón Creado Correctamente.'
    }
}
