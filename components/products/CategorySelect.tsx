"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"

type Category = {
    id: number
    name: string
}

type CategorySelectProps = {
    categories: Category[]
    name?: string
    placeholder?: string
    hasError?: boolean
    describedById?: string
    initialSelectedId?: number | null
}

export function CategorySelect({
    categories,
    name = "categoryId",
    placeholder = "-- Seleccionar Categoria --",
    hasError = false,
    describedById,
    initialSelectedId = null,
}: CategorySelectProps) {
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId)
    const [activeIndex, setActiveIndex] = useState(0)
    const [localError, setLocalError] = useState(false)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
    const listId = useId()

    const options = useMemo(
        () => [
            { id: null, label: placeholder, isPlaceholder: true },
            ...categories.map((cat) => ({
                id: cat.id,
                label: cat.name,
                isPlaceholder: false,
            })),
        ],
        [categories, placeholder]
    )

    const selectedIndex = useMemo(
        () => options.findIndex((option) => option.id === selectedId),
        [options, selectedId]
    )

    const selectedLabel = useMemo(() => {
        if (selectedId === null) return ""
        return categories.find((cat) => cat.id === selectedId)?.name ?? ""
    }, [categories, selectedId])

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (!wrapperRef.current) return
            if (!wrapperRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    useEffect(() => {
        if (!open) return
        const nextIndex = selectedIndex >= 0 ? selectedIndex : 0
        setActiveIndex(nextIndex)
        requestAnimationFrame(() => {
            optionRefs.current[nextIndex]?.focus()
        })
    }, [open, selectedIndex])

    useEffect(() => {
        if (!hasError && selectedId !== null) {
            setLocalError(false)
        }
    }, [hasError, selectedId])

    useEffect(() => {
        if (initialSelectedId !== null) {
            setSelectedId(initialSelectedId)
        }
    }, [initialSelectedId])

    useEffect(() => {
        const form = wrapperRef.current?.closest("form")
        if (!form) return

        function handleSubmit() {
            if (selectedId === null) {
                setLocalError(true)
            }
        }

        form.addEventListener("submit", handleSubmit)
        return () => form.removeEventListener("submit", handleSubmit)
    }, [selectedId])

    function moveActiveIndex(direction: 1 | -1) {
        if (options.length === 0) return
        setActiveIndex((prev) => {
            const next = (prev + direction + options.length) % options.length
            optionRefs.current[next]?.focus()
            return next
        })
    }

    function handleSelect(optionId: number | null) {
        setSelectedId(optionId)
        if (optionId !== null) {
            setLocalError(false)
        }
        setOpen(false)
    }

    function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
        if (event.key === "ArrowDown") {
            event.preventDefault()
            if (!open) {
                setOpen(true)
                return
            }
            moveActiveIndex(1)
        }

        if (event.key === "ArrowUp") {
            event.preventDefault()
            if (!open) {
                setOpen(true)
                return
            }
            moveActiveIndex(-1)
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            if (!open) {
                setOpen(true)
                return
            }
            const option = options[activeIndex]
            if (option) handleSelect(option.id)
        }

        if (event.key === "Escape") {
            event.preventDefault()
            setOpen(false)
        }
    }

    function handleOptionKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
        if (event.key === "ArrowDown") {
            event.preventDefault()
            moveActiveIndex(1)
        }

        if (event.key === "ArrowUp") {
            event.preventDefault()
            moveActiveIndex(-1)
        }

        if (event.key === "Escape") {
            event.preventDefault()
            setOpen(false)
        }
    }

    return (
        <div ref={wrapperRef} className="relative">
            <input type="hidden" name={name} value={selectedId ?? ""} />
            <button
                id={name}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-invalid={hasError || localError}
                aria-describedby={describedById}
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={handleTriggerKeyDown}
                className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-cielo-900 shadow-sm transition focus:outline-none focus:ring-2 ${
                    hasError || localError
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                        : "border-cielo-200 focus:border-apple-300 focus:ring-apple-200"
                }`}
            >
                <span className={selectedId ? "text-cielo-900" : "text-cielo-400"}>
                    {selectedId ? selectedLabel : placeholder}
                </span>
                <span className="ml-3 flex h-5 w-5 items-center justify-center rounded-full bg-cielo-50 text-cielo-700">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                        <path
                            d="M5.5 7.5l4.5 4.5 4.5-4.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            <div
                id={listId}
                role="listbox"
                aria-hidden={!open}
                className={`absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-cielo-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] transition duration-150 ease-out origin-top ${
                    open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                }`}
            >
                <div className="max-h-60 overflow-y-auto py-1">
                    {options.map((option, index) => {
                        const isSelected = option.id === selectedId
                        const isActive = index === activeIndex
                        return (
                            <button
                                key={`${option.id ?? "placeholder"}-${index}`}
                                ref={(node) => {
                                    optionRefs.current[index] = node
                                }}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleSelect(option.id)}
                                onKeyDown={handleOptionKeyDown}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
                                    isActive ? "bg-cielo-50" : "bg-white"
                                } ${
                                    option.isPlaceholder
                                        ? "text-cielo-500"
                                        : isSelected
                                            ? "text-cielo-900"
                                            : "text-cielo-800"
                                } hover:bg-cielo-50`}
                            >
                                <span>{option.label}</span>
                                {isSelected && !option.isPlaceholder ? (
                                    <span className="rounded-full bg-apple-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-apple-700">
                                        Seleccionado
                                    </span>
                                ) : null}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
