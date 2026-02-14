"use client"

import { toast } from "sonner";
import { useActionState, useEffect } from "react";

import { useStore } from "@/src/store";
import { submitOrder } from "@/actions/submit-order-action";

export function SubmitOrderForm() {

    const total = useStore(state => state.total)
    const contents = useStore(state => state.contents)
    const coupon = useStore(state => state.coupon.name)
    const clearOrder = useStore(state => state.clearOrder)
    
    const order = {
        total,
        coupon,
        contents
    }

    const submitOrderData = submitOrder.bind(null, order)
    const [state, dispatch] = useActionState(submitOrderData, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if ( state.success ) {
            toast.success(state.success)
            clearOrder()
        }
    }, [state.success])
    
    useEffect(() => {
        if ( state.errors ) {
            state.errors.forEach(err => toast.error(err))
        }
    }, [state.errors])
    

    return (
        <form action={dispatch}>
            <input 
                type="submit"
                className="mt-5 w-full bg-cielo-500 hover:bg-cielo-600 text-cielo-50 uppercase font-bold p-3 cursor-pointer transition-colors duration-200"
                value={'Confirmar Compra'}
            />
        </form>
    )
}
