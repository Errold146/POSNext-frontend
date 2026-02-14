"use client"

import { useStore } from "@/src/store";
import { Product } from "@/src/schemas";
import { isAvialable } from "@/utils";

export function AddProductButton({product}: {product: Product}) {

    const addToCart = useStore(state => state.addToCart)
    const available = isAvialable(product.inventory)

    return (
        <button
            type="button"
            className={`absolute top-5 right-5 ${available ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
            onClick={() => addToCart(product)}
            disabled={!available}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 bg-cielo-600 rounded-full text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    )
}
