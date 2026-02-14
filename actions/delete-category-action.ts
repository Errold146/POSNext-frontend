"use server"

import { revalidatePath } from "next/cache"

import { ErrorResponseSchema, Category } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function deleteCategory(
    categoryId: Category["id"],
    _prevState: ActionStateType,
    _formData: FormData
) {
    const url = `${process.env.API_URL}/categories/${categoryId}`
    const req = await fetch(url, {
        method: "DELETE",
    })

    let json: unknown = null
    try {
        json = await req.json()
    } catch {
        json = null
    }

    if (!req.ok) {
        if (json) {
            const errors = ErrorResponseSchema.parse(json)
            return {
                errors: errors.message.map((err) => err),
                success: "",
            }
        }

        return {
            errors: ["No se pudo eliminar la categoría."],
            success: "",
        }
    }

    revalidatePath("/admin/categories")

    return {
        errors: [],
        success: "Categoría eliminada correctamente.",
    }
}
