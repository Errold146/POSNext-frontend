"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Logo } from "./Logo";
import { MainNavLinks } from "./MainNavLinks";
import { Category } from "@/src/schemas";

type MainNavClientProps = {
    categories: Category[]
}

export function MainNavClient({ categories }: MainNavClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!isOpen) return;
            const target = event.target as Node;
            if (navRef.current && !navRef.current.contains(target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <header
            ref={navRef}
            className="flex flex-col bg-cielo-950 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10"
        >
            <div className="flex items-center justify-between">
                <Link href={'/'}>
                    <Logo />
                </Link>

                <button
                    type="button"
                    className="rounded-md border border-cielo-800 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white md:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-controls="main-nav-links"
                >
                    {isOpen ? "Cerrar" : "Menu"}
                </button>
            </div>

            <nav
                id="main-nav-links"
                className={`mt-4 flex flex-col items-center gap-2 md:mt-0 md:flex md:flex-row md:justify-end ${
                    isOpen ? "flex" : "hidden"
                } md:!flex`}
                onClick={() => setIsOpen(false)}
            >
                <MainNavLinks categories={categories} />
            </nav>
        </header>
    )
}
