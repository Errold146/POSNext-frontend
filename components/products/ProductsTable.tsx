
import Image from "next/image";

import { formatPrice, getImagePath, isAvialable } from "@/utils";
import { Product } from "@/src/schemas";
import { Pagination } from "@/components/ui";
import Link from "next/link";
import { DeleteProductForm } from "./DeleteProductForm";

type ProductsTableProps = {
    products: Product[]
    total: number
    page: number
    pageSize: number
}

function inventoryBadgeClass(inventory: number) {
    if (inventory >= 7) return "bg-apple-100 text-apple-700"
    if (inventory >= 4) return "bg-amber-100 text-amber-700"
    return "bg-milano-100 text-milano-700"
}

export function ProductsTable({ products, total, page, pageSize }: ProductsTableProps) {
    return (
        <section className="mt-6 space-y-4">
            <Pagination page={page} pageSize={pageSize} total={total} basePath="/admin/products" />

            <div className="rounded-2xl border border-cielo-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Inventario</p>
                    <h2 className="text-lg font-black text-cielo-900">Productos</h2>
                </div>
                <span className="rounded-full bg-apple-100 px-3 py-1 text-xs font-semibold text-apple-700">
                    {total} productos
                </span>
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-white text-xs uppercase tracking-wider text-cielo-500">
                        <tr className="border-b border-cielo-100">
                            <th className="px-6 py-3">Producto</th>
                            <th className="px-6 py-3">Precio</th>
                            <th className="px-6 py-3">Inventario</th>
                            <th className="px-6 py-3">Categoria</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cielo-100">
                        {products.map((product) => (
                            <tr key={product.id} className="transition hover:bg-cielo-50/60">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-cielo-50">
                                            <Image
                                                src={getImagePath(product.image)}
                                                alt={`Image of product: ${product.name}`}
                                                fill
                                                className="object-contain"
                                                sizes="48px"
                                                priority
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-cielo-900">{product.name}</p>
                                            <p className="text-xs text-cielo-500">ID: {product.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-cielo-900">
                                    {formatPrice(product.price)}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${inventoryBadgeClass(product.inventory)}`}
                                    >
                                        {isAvialable(product.inventory) ? (
                                            `${product.inventory} unidades`
                                        ): (
                                            <span className="text-milano-600">Agotado</span>
                                        )}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-cielo-600">
                                    {product.category?.name ?? `#${product.categoryId}`}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="inline-flex items-center gap-2">
                                        <Link 
                                            className="rounded-full border border-apple-200 px-3 py-1 text-xs font-semibold text-apple-700 transition hover:bg-apple-100"
                                            href={`/admin/products/${product.id}/edit`}
                                        >
                                            Editar
                                        </Link>
                                        <DeleteProductForm productId={product.id} className="px-3 py-1" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="divide-y divide-cielo-100 md:hidden">
                {products.map((product) => (
                    <div key={product.id} className="space-y-3 px-5 py-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-cielo-50">
                                <Image
                                    src={getImagePath(product.image)}
                                    alt={`Image of product: ${product.name}`}
                                    fill
                                    className="object-contain"
                                    sizes="64px"
                                />
                            </div>
                            <div>
                                <p className="text-base font-semibold text-cielo-900">{product.name}</p>
                                <p className="text-xs text-cielo-500">ID: {product.id}</p>
                            </div>
                        </div>
                        <div className="grid gap-2 text-sm text-cielo-700">
                            <div className="flex items-center justify-between">
                                <span>Precio</span>
                                <span className="font-semibold text-cielo-900">{formatPrice(product.price)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Inventario</span>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${inventoryBadgeClass(product.inventory)}`}
                                >
                                    {isAvialable(product.inventory) ? (
                                        <p>{product.inventory} unidades</p>
                                    ): (
                                        <p className="text-milano-600">Agotado</p>
                                    )}
                                    
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Categoria</span>
                                <span className="text-cielo-600">
                                    {product.category?.name ?? `#${product.categoryId}`}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex-1 rounded-full border border-apple-200 px-3 py-2 text-xs font-semibold text-apple-700 transition hover:bg-apple-50">
                                Editar
                            </button>
                            <DeleteProductForm productId={product.id} className="flex-1 px-3 py-2" />
                        </div>
                    </div>
                ))}
            </div>
            </div>

            <Pagination page={page} pageSize={pageSize} total={total} basePath="/admin/products" />
        </section>
    )
}
