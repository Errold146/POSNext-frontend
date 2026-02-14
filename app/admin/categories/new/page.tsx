import Link from "next/link"
import { Metadata } from "next"

import { Heading } from "@/components/ui"
import { AddCategoryForm } from "@/components/categories"

export const metadata: Metadata = {
    title: "Crear Categoría",
    description: "Creación de nuevas categorías",
}

export default function NewCategoryPage() {
    return (
        <>
            <Link
                href='/admin/categories'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Volver
            </Link>

            <Heading>Nueva Categoría</Heading>

            <AddCategoryForm />
        </>
    )
}
