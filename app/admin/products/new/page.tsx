import Link from "next/link";
import { Metadata } from "next";

import { Heading } from "@/components/ui";
import { AddProductForm } from "@/components/products";
import { CategoriesResponseSchema } from "@/src/schemas";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

export const metadata: Metadata = {
	title: "Crear Producto",
	description: "Creación de nuevos productos",
};

export default async function NewProductPage() {
    const categories = await getCategories()

    return (
        <>
            <Link
                href='/admin/products'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Volver 
            </Link>
           <Heading>Nuevo Producto</Heading>    

           <AddProductForm categories={categories} />
        </>
    )
}
