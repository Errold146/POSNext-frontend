import Link from "next/link"

import { Category } from "@/src/schemas"
import { DeleteCategoryForm } from "./DeleteCategoryForm"

type CategoriesTableProps = {
    categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
    return (
        <div className="mt-6 rounded-2xl border border-cielo-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Administración</p>
                    <h2 className="text-lg font-black text-cielo-900">Categorías</h2>
                </div>
                <span className="rounded-full bg-apple-100 px-3 py-1 text-xs font-semibold text-apple-700">
                    {categories.length} categorías
                </span>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-white text-xs uppercase tracking-wider text-cielo-500">
                        <tr className="border-b border-cielo-100">
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cielo-100">
                        {categories.map((category) => (
                            <tr key={category.id} className="transition hover:bg-cielo-50/60">
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-cielo-100 px-2.5 py-1 text-xs font-semibold text-cielo-700">
                                        #{category.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-apple-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4.5 w-4.5 text-apple-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-cielo-900">{category.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="inline-flex items-center gap-2">
                                        <Link
                                            className="rounded-full border border-apple-200 px-3 py-1 text-xs font-semibold text-apple-700 transition hover:bg-apple-100"
                                            href={`/admin/categories/${category.id}/edit`}
                                        >
                                            Editar
                                        </Link>
                                        <DeleteCategoryForm categoryId={category.id} className="px-3 py-1" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-cielo-100 md:hidden">
                {categories.map((category) => (
                    <div key={category.id} className="space-y-3 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-apple-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-apple-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-base font-semibold text-cielo-900">{category.name}</p>
                                <p className="text-xs text-cielo-500">ID: {category.id}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                className="flex-1 rounded-full border border-apple-200 px-3 py-2 text-center text-xs font-semibold text-apple-700 transition hover:bg-apple-50"
                                href={`/admin/categories/${category.id}/edit`}
                            >
                                Editar
                            </Link>
                            <DeleteCategoryForm categoryId={category.id} className="flex-1 px-3 py-2 text-center" />
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="px-6 py-12 text-center">
                    <p className="text-sm text-cielo-400">No hay categorías registradas aún.</p>
                </div>
            )}
        </div>
    )
}
