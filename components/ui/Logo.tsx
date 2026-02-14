import Image from "next/image";

export function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-linear-to-br from-milano-500 to-cielo-600 p-0.5 shadow-lg">
                <div className="rounded-2xl bg-cielo-50 p-2">
                    <Image
                        src="/Fronty.png"
                        alt="Fronty"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-xl object-contain"
                        priority
                    />
                </div>
            </div>
            <div className="leading-tight">
                <h1 className="text-3xl font-extrabold text-milano-500">POS</h1>
                <span className="text-sm font-semibold uppercase tracking-wide text-apple-500">
                    Punto de Venta
                </span>
            </div>
        </div>
    );
}