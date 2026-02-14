"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/ui";

export function AdminNav() {
    const pathname = usePathname();
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

    const linkClass = (active: boolean) =>
        `transition-colors duration-200 font-bold p-2 uppercase ${
            active ? "text-apple-500" : "text-white hover:text-apple-500"
        }`;

    return (
        <header
            ref={navRef}
            className="flex flex-col bg-cielo-950 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10"
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-5">
                    <Logo />
                </div>

                <button
                    type="button"
                    className="rounded-md border border-cielo-800 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white md:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-controls="admin-nav-links"
                >
                    {isOpen ? "Cerrar" : "Menu"}
                </button>
            </div>

            <nav
                id="admin-nav-links"
                className={`mt-4 flex flex-col gap-2 md:mt-0 md:flex md:flex-row md:items-center md:justify-end ${
                    isOpen ? "flex" : "hidden"
                } md:!flex`}
                onClick={() => setIsOpen(false)}
            >
                <Link
                    href={'/admin/products'}
                    className={linkClass(pathname.startsWith("/admin/products"))}
                >Productos</Link>

                <Link
                    href={'/admin/categories'}
                    className={linkClass(pathname.startsWith("/admin/categories"))}
                >Categorías</Link>

                <Link
                    href={'/admin/sales'}
                    className={linkClass(pathname.startsWith("/admin/sales"))}
                >Ventas</Link>

                <Link
                    href={'/admin/coupons'}
                    className={linkClass(pathname.startsWith("/admin/coupons"))}
                >Cupones</Link>

                <Link
                    href={'/admin/dashboard'}
                    className={linkClass(pathname.startsWith("/admin/dashboard"))}
                >Dashboard</Link>

                <Link
                    href={'/'}
                    className={linkClass(pathname === "/")}
                >Tienda</Link>
            </nav>
        </header>
    )
}