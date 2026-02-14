"use client"

import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { ProductForm } from "./ProductFrom";
import type { Category, Product } from "@/src/schemas";
import { updateProduct } from "@/actions/update-product-action";

type EditProductFormProps = {
    categories: Category[]
    product: Product
}

export function EditProductForm({ categories, product }: EditProductFormProps) {

    const router = useRouter()
    const { id } = useParams<{id: string}>()

    const updateProductById = updateProduct.bind(null, +id)
    const [state, dispatch] = useActionState(updateProductById, {
        errors: [],
        fieldErrors: {},
        success: ''
    })

    useEffect(() => {
        if ( state.errors ) {
            state.errors.forEach(err => toast.error(err))
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
            <ProductForm categories={categories} product={product} fieldErrors={state.fieldErrors} />
            <input 
                type="submit"
                className="mt-5 w-full cursor-pointer rounded-xl bg-apple-500 py-3 text-sm font-bold uppercase tracking-wide text-apple-50 shadow-sm transition hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-apple-200"
                value='Editar Producto'
            />
        </form>
    )
}
