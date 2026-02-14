import Link from "next/link"
import { Metadata } from "next"

import { Heading } from "@/components/ui"
import { CategoriesTable } from "@/components/categories"

export const dynamic = 'force-dynamic'
import { CategoriesResponseSchema } from "@/src/schemas"

export const metadata: Metadata = {
    title: "Administrador de Categorías",
    description: "Administrador de categorías",
}

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

export default async function CategoriesPage() {
    const categories = await getCategories()

    return (
        <>
            <Link
                href='/admin/categories/new'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Crear Categoría
            </Link>

            <Heading>Administrar Categorías</Heading>

            <CategoriesTable categories={categories} />
        </>
    )
}
