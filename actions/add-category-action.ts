"use server"

import { ErrorResponseSchema, CategoryFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[] | undefined>
    success: string
}

export async function addCategory(prevState: ActionStateType, formData: FormData) {

    const category = CategoryFormSchema.safeParse({
        name: formData.get('name'),
    })

    if (!category.success) {
        const fieldErrors = category.error.flatten((issue) => issue.message).fieldErrors
        return {
            errors: category.error.issues.map(err => err.message),
            fieldErrors,
            success: ''
        }
    }

    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category.data)
    })

    const json = await req.json()

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(err => err),
            fieldErrors: {},
            success: ''
        }
    }

    return {
        errors: [],
        fieldErrors: {},
        success: 'Categoría Creada Correctamente.'
    }
}
