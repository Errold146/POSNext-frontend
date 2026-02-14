"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

import type { CouponAdmin } from "@/src/schemas"
import { toggleCouponAction } from "@/actions/toggle-coupon-action"

type ToggleCouponButtonProps = {
    coupon: CouponAdmin
    className?: string
}

export function ToggleCouponButton({ coupon, className = "" }: ToggleCouponButtonProps) {

    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        startTransition(async () => {
            const result = await toggleCouponAction(coupon.id)
            if (result.message) {
                toast.success(result.message)
                router.refresh()
            }
        })
    }

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={isPending}
            className={`rounded-full border text-xs font-semibold transition ${
                coupon.isActive
                    ? "border-milano-200 text-milano-700 hover:bg-milano-100"
                    : "border-apple-200 text-apple-700 hover:bg-apple-100"
            } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
        >
            {isPending ? "..." : coupon.isActive ? "Deshabilitar" : "Habilitar"}
        </button>
    )
}
