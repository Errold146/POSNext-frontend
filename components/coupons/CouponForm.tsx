import type { CouponAdmin } from "@/src/schemas"

type FieldErrors = Record<string, string[] | undefined>

type CouponFormProps = {
    fieldErrors?: FieldErrors
    coupon?: CouponAdmin
}

export function CouponForm({ fieldErrors = {}, coupon }: CouponFormProps) {
    const nameError = fieldErrors.name?.[0]
    const percentageError = fieldErrors.percentage?.[0]
    const expirationDateError = fieldErrors.expirationDate?.[0]

    return (
        <div className="space-y-6 rounded-2xl border border-cielo-200 bg-white p-6 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)]">
            {/* Name */}
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-cielo-900"
                >Nombre del Cupón</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej: VERANO2026, DESCUENTO10..."
                    aria-invalid={Boolean(nameError)}
                    aria-describedby={nameError ? "name-error" : undefined}
                    className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 uppercase placeholder:text-cielo-400 placeholder:normal-case shadow-sm transition focus:outline-none focus:ring-2 ${
                        nameError
                            ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                            : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                    }`}
                    name="name"
                    defaultValue={coupon?.name}
                />
                {nameError ? (
                    <p id="name-error" className="text-xs font-medium text-milano-500">
                        {nameError}
                    </p>
                ) : null}
            </div>

            {/* Percentage */}
            <div className="space-y-2">
                <label
                    htmlFor="percentage"
                    className="block text-sm font-semibold text-cielo-900"
                >Descuento (%)</label>
                <input
                    id="percentage"
                    type="number"
                    min={1}
                    max={100}
                    placeholder="Ej: 10, 25, 50..."
                    aria-invalid={Boolean(percentageError)}
                    aria-describedby={percentageError ? "percentage-error" : undefined}
                    className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 placeholder:text-cielo-400 shadow-sm transition focus:outline-none focus:ring-2 ${
                        percentageError
                            ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                            : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                    }`}
                    name="percentage"
                    defaultValue={coupon?.percentage}
                />
                {percentageError ? (
                    <p id="percentage-error" className="text-xs font-medium text-milano-500">
                        {percentageError}
                    </p>
                ) : null}
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
                <label
                    htmlFor="expirationDate"
                    className="block text-sm font-semibold text-cielo-900"
                >Fecha de Expiración</label>
                <input
                    id="expirationDate"
                    type="date"
                    aria-invalid={Boolean(expirationDateError)}
                    aria-describedby={expirationDateError ? "expirationDate-error" : undefined}
                    className={`w-full rounded-xl border bg-white px-4 py-2.5 text-cielo-900 placeholder:text-cielo-400 shadow-sm transition focus:outline-none focus:ring-2 ${
                        expirationDateError
                            ? "border-milano-300 focus:border-milano-400 focus:ring-milano-200"
                            : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                    }`}
                    name="expirationDate"
                    defaultValue={coupon?.expirationDate?.split('T')[0]}
                />
                {expirationDateError ? (
                    <p id="expirationDate-error" className="text-xs font-medium text-milano-500">
                        {expirationDateError}
                    </p>
                ) : null}
            </div>
        </div>
    )
}
