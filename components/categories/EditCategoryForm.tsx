"use client"

import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { CategoryForm } from "./CategoryForm"
import type { Category } from "@/src/schemas"
import { updateCategory } from "@/actions/update-category-action"

type EditCategoryFormProps = {
    category: Category
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {

    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateCategoryById = updateCategory.bind(null, +id)
    const [state, dispatch] = useActionState(updateCategoryById, {
        errors: [],
        fieldErrors: {},
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(err => toast.error(err))
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
            <CategoryForm category={category} fieldErrors={state.fieldErrors} />
            <input
                type="submit"
                className="mt-5 w-full cursor-pointer rounded-xl bg-apple-500 py-3 text-sm font-bold uppercase tracking-wide text-apple-50 shadow-sm transition hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-apple-200"
                value='Actualizar Categoría'
            />
        </form>
    )
}
