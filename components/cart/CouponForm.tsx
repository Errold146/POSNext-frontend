import { useStore } from "@/src/store"

export function CouponForm() {

    const applyCoupon = useStore(state => state.applyCoupon)
    const coupon = useStore(state => state.coupon)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const couponName = formData.get('coupon_name')?.toString() || ''
        if ( !couponName.length ) return;
        await applyCoupon(couponName)
    }

    return (
        <>
            <p className="py-5 font-bold border-t border-cielo-300">Canjear Cupón</p>
            <form 
                className="flex" 
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    className="p-2 bg-white border border-cielo-300 w-full"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />
                <input 
                    type="submit"
                    className="p-3 text-apple-950 bg-apple-400 hover:bg-apple-500 transition-colors duration-200 font-bold hover:cursor-pointer"
                    value='Canjear'
                />
            </form>

            {coupon.message ? (
                <p
                    className={
                        coupon.message === "Cupón Válido"
                            ? "my-3 text-center font-bold text-apple-500"
                            : "my-3 text-center font-bold text-milano-500"
                    }
                >
                    {coupon.message}
                </p>
            ) : null}
        </>
    )
}