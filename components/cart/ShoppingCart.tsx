"use client"

import { useStore } from "@/src/store";
import { ShoppingCartItem, CouponForm, Amount, SubmitOrderForm } from "@/components/cart";

export function ShoppingCart() {

    const contents = useStore(state => state.contents)
    const total = useStore(state => state.total)
    const discount = useStore(state => state.discount)

    return (
        <>
            {contents.length ? (
                <>
                    <h2 className="text-4xl font-bold text-cielo-800">Resumen de Venta</h2>

                    <ul 
                        role="list"
                        className="mt-6 divide-y divide-cielo-200 border-t border-cielo-200 font-medium text-sm text-apple-500"
                    >
                        {contents.map(item => (
                            <ShoppingCartItem
                                key={item.productId}
                                item={item}
                            />
                        ))}
                    </ul>

                    <dl className="space-y-6 border-t border-cielo-300 py-6 text-xl font-medium text-cielo-500">

                        {discount ? (
                            <Amount label="Descuento" amount={discount} discount={true} />
                        ): null}

                        <Amount label="Total a pagar" amount={total} />
                    </dl>

                    <CouponForm />
                    <SubmitOrderForm />
                </>
            ): (
                <div className="mt-2 flex flex-col items-center gap-2">
                    <p className="text-2xl text-center font-bold text-milano-700">El carrito esta vacio.</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" className="text-milano-700"><defs><mask id="SVGnCBCaezu"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><g stroke="#fff"><path strokeDasharray="20" d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"><animate attributeName="d" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5;M12 4h2v3h2.5l-4.5 4.5M12 4h-2v3h-2.5l4.5 4.5;M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="20;0"/></path><path strokeDasharray="14" strokeDashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" to="0"/></path></g><path stroke="#000" strokeDasharray="26" strokeDashoffset="26" d="M0 11h24" transform="rotate(45 13 12)"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.4s" to="0"/></path></g></mask></defs><path fill="currentColor" d="M0 0h24v24H0z" mask="url(#SVGnCBCaezu)"/><path fill="none" stroke="currentColor" strokeDasharray="24" strokeDashoffset="24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M0 13h22" transform="rotate(45 13 12)"><animate attributeName="d" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" values="M0 13h22;M2 13h22;M0 13h22"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.3s" to="0"/></path></svg>
                </div>
            )}
        </>
    )
}
