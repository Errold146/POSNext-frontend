"use client"

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { ProductForm } from "./ProductFrom";
import type { Category } from "@/src/schemas";
import { addProduct } from "@/actions/add-product-action";

type AddProductFormProps = {
    categories: Category[]
}

export function AddProductForm({ categories }: AddProductFormProps) {

    const router = useRouter()
    const [state, dispatch] = useActionState(addProduct, {
        errors: [],
        fieldErrors: {},
        success: ''
    })

    useEffect(() => {
        if (state.errors.length) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
    }, [state.errors])

    useEffect(() => {
        if ( state.success ) {
            toast.success(state.success)
            router.push('/admin/products')
        }
    }, [state.success])
    
    return (
        <form
            action={dispatch}
        >
            <ProductForm categories={categories} fieldErrors={state.fieldErrors} />
            <input 
                type="submit"
                className="mt-5 w-full cursor-pointer rounded-xl bg-apple-500 py-3 text-sm font-bold uppercase tracking-wide text-apple-50 shadow-sm transition hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-apple-200"
                value='Crear Producto'
            />
        </form>
    )
}
