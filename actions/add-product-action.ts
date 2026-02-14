"use server"

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[] | undefined>
    success: string
}

export async function addProduct(prevState: ActionStateType, formData: FormData) {
    
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
    })

    if ( !product.success ) {
        const fieldErrors = product.error.flatten((issue) => issue.message).fieldErrors
        return {
            errors: product.error.issues.map(err => err.message),
            fieldErrors,
            success: ''
        }
    }

    // Comunicar con la api
    const url = `${process.env.API_URL}/products`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.data)
    })

    const json = await req.json()

    if ( !req.ok ) {
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
        success: 'Producto Agregado Correctamente.'
    }
}