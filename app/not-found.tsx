"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
            <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-cielo-200/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-apple-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-milano-200/50 blur-3xl" />

            <section className="relative w-full max-w-2xl rounded-3xl border border-cielo-200/70 bg-white/80 p-10 text-center shadow-2xl backdrop-blur">
                <p className=" text-2xl font-semibold uppercase tracking-[0.3em] text-cielo-600">
                    Error 404
                </p>
                <h1 className="mt-4 text-7xl font-extrabold tracking-tight text-transparent bg-linear-to-r from-milano-500 via-cielo-600 to-apple-500 bg-clip-text">
                    No encontrado
                </h1>
                <p className="mt-4 text-base text-slate-600">
                    Lo que buscas no esta disponible o el enlace ya no existe. Puedes
                    volver a la pagina anterior o ir al inicio.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center rounded-full bg-milano-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-milano-500/30 transition hover:-translate-y-0.5 hover:bg-milano-600"
                    >
                        Volver atras
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full border border-cielo-300/70 bg-white px-6 py-3 text-sm font-semibold text-cielo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cielo-400 hover:bg-cielo-50"
                    >
                        Ir al inicio
                    </Link>
                </div>
            </section>
        </main>
    );
}
