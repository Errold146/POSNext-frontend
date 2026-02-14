import Image from "next/image";

import { formatPrice, getImagePath, isAvialable } from "@/utils";
import { Product } from "@/src/schemas";
import { AddProductButton } from "./AddProductButton";

export function ProductCard({product}: {product: Product}) {

    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-cielo-200 bg-white shadow-[0_10px_25px_-15px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.55)]"
        >
            <div className="relative">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-cielo-100/50 via-transparent to-transparent" />
                <Image
                    src={getImagePath(product.image)}
                    alt={`Image of product: ${product.name}`}
                    width={400}
                    height={600}
                    priority
                    className="h-64 w-full object-contain"
                />
            </div>

            <div className="space-y-2 px-5 pb-5 pt-4">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-cielo-900">{product.name}</h3>
                    {isAvialable(product.inventory) ? (
                        <span className="rounded-full bg-apple-100 px-2.5 py-1 text-xs font-semibold text-apple-700">
                            {product.inventory} disponibles
                        </span>
                    ) : (
                        <span className="rounded-full bg-milano-100 px-2.5 py-1 text-xs font-semibold text-milano-600">
                            Agotado
                        </span>
                    )}
                </div>
                <p className="text-2xl font-black text-cielo-900">{formatPrice(product.price)}</p>
                <p className="text-sm text-cielo-600">Producto listo para agregar al carrito.</p>
            </div>
            <AddProductButton product={product} />
        </div>
    )
}