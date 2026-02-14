import { Transaction } from "@/src/schemas"
import { formatPrice, getImagePath } from "@/utils"
import Image from "next/image"

export function TransactionSummary({transaction}: {transaction: Transaction}) {

    return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-cielo-200 bg-linear-to-br from-white via-white to-cielo-50 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cielo-200 bg-cielo-100/70 px-5 py-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-milano-600">Venta</p>
                    <p className="text-lg font-black text-cielo-900">#{transaction.id}</p>
                </div>
                <div className="rounded-full border border-apple-200 bg-apple-100 px-3 py-1 text-xs font-semibold text-apple-700">
                    {transaction.contents.length} items
                </div>
            </div>

            <ul role="list" className="divide-y divide-cielo-100">
                {transaction.contents.map((item) => (
                    <li className="px-5 py-4" key={item.id}>
                        <div className="flex items-center gap-4">
                            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-cielo-100">
                                <Image
                                    src={getImagePath(item.product.image)}
                                    alt={`Image of product: ${item.product.name}`}
                                    priority
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-cielo-900">{item.product.name}</h3>
                                <p className="text-sm text-cielo-600">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="text-base font-black text-cielo-900">{formatPrice(item.price)}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <dl className="grid gap-3 bg-cielo-100/40 px-5 py-4 text-sm font-medium text-cielo-700">
                {transaction.coupon && (
                    <>
                        <div className="flex items-center justify-between">
                            <dt>Cupón</dt>
                            <dd className="font-semibold text-cielo-900">{transaction.coupon}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt>Descuento</dt>
                            <dd className="font-semibold text-apple-700">- {formatPrice(+transaction.discount!)}</dd>
                        </div>
                    </>
                )}
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                    <dt className="text-base font-black text-cielo-900">Total</dt>
                    <dd className="text-base font-black text-cielo-900">{formatPrice(transaction.total)}</dd>
                </div>
            </dl>
        </div>
    )
}