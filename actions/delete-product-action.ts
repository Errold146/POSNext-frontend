"use server"

import { revalidatePath } from "next/cache"

import { ErrorResponseSchema, Product, SuccessResponseSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function deleteProduct(
    productId: Product["id"],
    _prevState: ActionStateType,
    _formData: FormData
) {
    const url = `${process.env.API_URL}/products/${productId}`
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
            errors: ["No se pudo eliminar el producto."],
            success: "",
        }
    }

    const successMessage = json
        ? SuccessResponseSchema.parse(json).message
        : "Producto eliminado correctamente."

    revalidatePath("/admin/products")

    return {
        errors: [],
        success: successMessage,
    }
}
