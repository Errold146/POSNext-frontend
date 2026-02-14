import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({
    subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Punto de venta",
	description: "Punto de venta con next.js",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${outfit.className} bg-cielo-100 `}
			>
				<Providers>
					{children}
				</Providers>
				<Toaster richColors position="top-right" expand visibleToasts={10} className="z-[9999]" />
			</body>
		</html>
	);
}
