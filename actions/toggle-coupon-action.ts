"use server"

import { revalidatePath } from "next/cache"
import { CouponAdmin } from "@/src/schemas"

export async function toggleCouponAction(couponId: CouponAdmin['id']) {

    const url = `${process.env.API_URL}/coupons/${couponId}/toggle`
    const req = await fetch(url, {
        method: 'PATCH',
    })

    const json = await req.json()

    revalidatePath('/admin/coupons')

    return json
}
