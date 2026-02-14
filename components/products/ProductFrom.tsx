import { CategorySelect } from "./CategorySelect";
import type { Category, Product } from "@/src/schemas";
import { UploadProductImage } from "./UploadProductImage";

type FieldErrors = Record<string, string[] | undefined>

type ProductFormProps = {
    categories: Category[]
    fieldErrors?: FieldErrors
    product?: Product
}

export function ProductForm({ categories, fieldErrors = {}, product }: ProductFormProps) {
    const nameError = fieldErrors.name?.[0]
    const priceError = fieldErrors.price?.[0]
    const inventoryError = fieldErrors.inventory?.[0]
    const categoryError = fieldErrors.categoryId?.[0]

    return (
        <>
            <div className="space-y-6 rounded-2xl border border-cielo-200 bg-white p-6 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)]">
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-cielo-900"
                    >Nombre Producto</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre Producto"
                        aria-invalid={Boolean(nameError)}
                        aria-describedby={nameError ? "name-error" : undefined}
                        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 placeholder:text-cielo-400 shadow-sm transition focus:outline-none focus:ring-2 ${
                            nameError
                                ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                                : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                        }`}
                        name="name"
                        defaultValue={product?.name}
                    />
                    {nameError ? (
                        <p id="name-error" className="text-xs font-medium text-milano-500">
                            {nameError}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="price"
                        className="block text-sm font-semibold text-cielo-900"
                    >Precio</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Precio Producto"
                        aria-invalid={Boolean(priceError)}
                        aria-describedby={priceError ? "price-error" : undefined}
                        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 placeholder:text-cielo-400 shadow-sm transition focus:outline-none focus:ring-2 ${
                            priceError
                                ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                                : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                        }`}
                        name="price"
                        min={0}
                        defaultValue={product?.price}
                    />
                    {priceError ? (
                        <p id="price-error" className="text-xs font-medium text-milano-500">
                            {priceError}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="inventory"
                        className="block text-sm font-semibold text-cielo-900"
                    >Inventario</label>
                    <input
                        id="inventory"
                        type="number"
                        placeholder="Cantidad Disponible"
                        aria-invalid={Boolean(inventoryError)}
                        aria-describedby={inventoryError ? "inventory-error" : undefined}
                        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 placeholder:text-cielo-400 shadow-sm transition focus:outline-none focus:ring-2 ${
                            inventoryError
                                ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                                : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                        }`}
                        name="inventory"
                        min={0}
                        defaultValue={product?.inventory}
                    />
                    {inventoryError ? (
                        <p id="inventory-error" className="text-xs font-medium text-milano-500">
                            {inventoryError}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="categoryId"
                        className="block text-sm font-semibold text-cielo-900"
                    >Categoría</label>
                    <CategorySelect
                        categories={categories}
                        hasError={Boolean(categoryError)}
                        describedById={categoryError ? "category-error" : undefined}
                        initialSelectedId={product?.categoryId ?? null}
                    />
                    {categoryError ? (
                        <p id="category-error" className="text-xs font-medium text-milano-500">
                            {categoryError}
                        </p>
                    ) : null}
                </div>
            </div>

            <UploadProductImage currentImage={product?.image} />

        </>
    )
}