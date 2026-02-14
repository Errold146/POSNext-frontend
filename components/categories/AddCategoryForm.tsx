"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

import { CategoryForm } from "./CategoryForm"
import { addCategory } from "@/actions/add-category-action"

export function AddCategoryForm() {

    const router = useRouter()
    const [state, dispatch] = useActionState(addCategory, {
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
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/categories')
        }
    }, [state.success])

    return (
        <form action={dispatch}>
            <CategoryForm fieldErrors={state.fieldErrors} />
            <input
                type="submit"
                className="mt-5 w-full cursor-pointer rounded-xl bg-apple-500 py-3 text-sm font-bold uppercase tracking-wide text-apple-50 shadow-sm transition hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-apple-200"
                value='Crear Categoría'
            />
        </form>
    )
}
