import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Heading } from "@/components/ui";
import { EditProductForm } from "@/components/products";
import { CategoriesResponseSchema, ProductSchema } from "@/src/schemas";

export const metadata: Metadata = {
	title: "Editar Producto",
	description: "Edición de productos",
};

type Params = Promise<{id: string}>

async function getProduct(id: string) {
    const url = `${process.env.API_URL}/products/${id}`
    const req = await fetch(url)
    const json = await req.json()
    
    if ( !req.ok ) {
        notFound()
    }

    const product = ProductSchema.parse(json)
    return product
}

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

export default async function EditProductPage({params}: {params: Params}) {

    const { id } = await params
    const product = await getProduct(id)
    const categories = await getCategories()

    return (
        <>
            <Link
                href='/admin/products'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Volver 
            </Link>
           <Heading>Editar el Producto: {product.name}</Heading>

           <EditProductForm categories={categories} product={product} />    
        </>
    )
}
