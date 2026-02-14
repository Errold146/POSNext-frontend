import Link from "next/link";

type PaginationProps = {
    page: number
    pageSize: number
    total: number
    basePath: string
    pageParam?: string
    query?: Record<string, string | number | undefined>
}

export function Pagination({
    page,
    pageSize,
    total,
    basePath,
    pageParam = "page",
    query
}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const currentPage = Math.min(Math.max(1, page), totalPages)
    const prevPage = Math.max(1, currentPage - 1)
    const nextPage = Math.min(totalPages, currentPage + 1)

    const buildQuery = (targetPage: number) => {
        const nextQuery: Record<string, string | number> = {}
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined) nextQuery[key] = value
            }
        }
        nextQuery[pageParam] = targetPage
        return nextQuery
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cielo-300 bg-cielo-50/40 px-5 py-3 shadow-sm">
            <p className="text-sm text-cielo-700">
                Página {currentPage} de {totalPages}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold">
                <Link
                    href={{ pathname: basePath, query: buildQuery(prevPage) }}
                    className={`rounded-full border border-cielo-300 px-3 py-1 text-cielo-700 transition ${
                        currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-cielo-100"
                    }`}
                >
                    Anterior
                </Link>
                <Link
                    href={{ pathname: basePath, query: buildQuery(nextPage) }}
                    className={`rounded-full border border-cielo-300 px-3 py-1 text-cielo-700 transition ${
                        currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-cielo-100"
                    }`}
                >
                    Siguiente
                </Link>
            </div>
        </div>
    )
}
