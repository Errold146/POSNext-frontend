import type { Category } from "@/src/schemas"

type FieldErrors = Record<string, string[] | undefined>

type CategoryFormProps = {
    fieldErrors?: FieldErrors
    category?: Category
}

export function CategoryForm({ fieldErrors = {}, category }: CategoryFormProps) {
    const nameError = fieldErrors.name?.[0]

    return (
        <div className="space-y-6 rounded-2xl border border-cielo-200 bg-white p-6 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)]">
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-cielo-900"
                >Nombre de la Categoría</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej: Café, Postres, Bebidas..."
                    aria-invalid={Boolean(nameError)}
                    aria-describedby={nameError ? "name-error" : undefined}
                    className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 placeholder:text-cielo-400 shadow-sm transition focus:outline-none focus:ring-2 ${
                        nameError
                            ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                            : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                    }`}
                    name="name"
                    defaultValue={category?.name}
                />
                {nameError ? (
                    <p id="name-error" className="text-xs font-medium text-milano-500">
                        {nameError}
                    </p>
                ) : null}
            </div>
        </div>
    )
}
