"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { formatPrice, getImagePath } from "@/utils";
import { CartItem } from "@/src/schemas";
import { useStore } from "@/src/store";

export function ShoppingCartItem({item}: {item: CartItem}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const updateQuantity = useStore(state => state.updateQuantity)
    const removeFromCart = useStore(state => state.removeFromCart)

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <li className="flex items-center space-x-6 py-6 relative">
            <div className='h-24 w-24'>
                <Image 
                    src={getImagePath(item.image)}
                    alt={`Image of product: ${item.name}`}
                    width={100}
                    height={100}
                    className="h-auto w-auto"
                    priority
                />
            </div>
            <div className="flex-auto space-y-2">
                <h3 className="text-apple-950">{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
                <div ref={dropdownRef} className="relative w-32">
                    <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg border border-cielo-200 bg-white/90 px-3 py-2 text-center text-apple-800 shadow-sm transition hover:border-cielo-300 focus:border-cielo-400 focus:outline-none focus:ring-2 focus:ring-cielo-200"
                        onClick={() => setOpen(prev => !prev)}
                        aria-haspopup="listbox"
                        aria-expanded={open}
                    >
                        <span className="flex-1 text-sm font-medium">{item.quantity}</span>
                        <span className="ml-2 text-cielo-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>
                    {open && (
                        <ul
                            role="listbox"
                            aria-label="Cantidad"
                            className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-cielo-100 bg-white/95 p-1 text-sm text-apple-700 shadow-lg ring-1 ring-cielo-100/70 backdrop-blur"
                        >
                            {Array.from({ length: item.inventory }, (_, index) => index + 1).map(num => (
                                <li key={num}>
                                    <button
                                        type="button"
                                        role="option"
                                        aria-selected={item.quantity === num}
                                        onClick={() => {
                                            updateQuantity(item.productId, num);
                                            setOpen(false);
                                        }}
                                        className={`flex w-full items-center justify-center rounded-lg px-2 py-2 transition ${
                                            item.quantity === num
                                                ? "bg-cielo-100 text-cielo-900"
                                                : "hover:bg-cielo-50"
                                        }`}
                                    >
                                        {num}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className='absolute top-10 right-0'>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item.productId)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-milano-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </li>
    )
}