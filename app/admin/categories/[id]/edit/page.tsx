import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Heading } from "@/components/ui"

export const dynamic = 'force-dynamic'
import { EditCategoryForm } from "@/components/categories"
import { CategorySchema } from "@/src/schemas"

export const metadata: Metadata = {
    title: "Editar Categoría",
    description: "Edición de categorías",
}

type Params = Promise<{ id: string }>

async function getCategory(id: string) {
    const url = `${process.env.API_URL}/categories/${id}`
    const req = await fetch(url)
    const json = await req.json()

    if (!req.ok) {
        notFound()
    }

    return CategorySchema.parse(json)
}

export default async function EditCategoryPage({ params }: { params: Params }) {
    const { id } = await params
    const category = await getCategory(id)

    return (
        <>
            <Link
                href='/admin/categories'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Volver
            </Link>

            <Heading>Editar Categoría: {category.name}</Heading>

            <EditCategoryForm category={category} />
        </>
    )
}
