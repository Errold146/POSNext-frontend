"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
    id: number;
    name: string;
};

type MainNavLinksProps = {
    categories: Category[];
};

export function MainNavLinks({ categories }: MainNavLinksProps) {
    const pathname = usePathname();

    const linkClass = (active: boolean) =>
        `transition-colors duration-200 font-bold p-2 uppercase ${
            active ? "text-apple-500" : "text-white hover:text-apple-500"
        }`;

    return (
        <>
            {categories.map(cat => (
                <Link
                    key={cat.id}
                    href={`/${cat.id}`}
                    className={linkClass(pathname === `/${cat.id}`)}
                >
                    {cat.name}
                </Link>
            ))}

            <Link
                href="/admin/sales"
                className={linkClass(pathname.startsWith("/admin"))}
            >
                Administracion
            </Link>
        </>
    );
}
