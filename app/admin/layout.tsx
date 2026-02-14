import { AdminNav } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin",
	description: "Administrador de productos",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdminNav />
            <div className="lg:min-h-screen container mx-auto mt-10 px-10 lg:px-0">
                {children}
            </div>
        </>
    );
}