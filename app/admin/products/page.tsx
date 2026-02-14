import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Heading } from "@/components/ui";

export const dynamic = 'force-dynamic'
import { ProductsTable } from "@/components/products";
import { ProductsResponseSchema } from "@/src/schemas";

export const metadata: Metadata = {
	title: "Administrador de Productos",
	description: "Administrador de productos",
};

type ProductsPageProps = {
    searchParams?: Promise<{
        page?: string
    }>
}

async function getProducts(page: number, take: number) {
    const skip = (page - 1) * take
    const params = new URLSearchParams({
        take: take.toString(),
        skip: skip.toString()
    })
    const url = `${process.env.API_URL}/products?${params.toString()}`
    const req = await fetch(url)
    const json = await req.json()

    const products = ProductsResponseSchema.parse(json)
    return products
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {

    const resolvedSearchParams = await searchParams
    const rawPage = resolvedSearchParams?.page
    const parsedPage = Number(rawPage)
    const normalizedPage = Number.isFinite(parsedPage) ? Math.trunc(parsedPage) : 1
    const safePage = normalizedPage < 1 ? 1 : normalizedPage
    const pageSize = 10
    const products = await getProducts(safePage, pageSize)
    const totalPages = Math.max(1, Math.ceil(products.total / pageSize))

    if (rawPage && String(rawPage) !== String(safePage)) {
        redirect(`/admin/products?page=${safePage}`)
    }

    if (safePage > totalPages) {
        redirect(`/admin/products?page=${totalPages}`)
    }

    return (
        <>
            <Link
                href='/admin/products/new'
                className="rounded-xl bg-cielo-50 text-cielo-700 border border-cielo-300 font-bold py-2 px-10 hover:bg-cielo-100 transition-colors duration-200"
            >
                Crear Producto
            </Link>

            <Heading>Administrar Productos</Heading>

            <ProductsTable
                products={products.products}
                total={products.total}
                page={safePage}
                pageSize={pageSize}
            />
        </>
    )
}
