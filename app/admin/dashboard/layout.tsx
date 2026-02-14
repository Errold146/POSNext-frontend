export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-auto my-10 w-full max-w-7xl rounded-2xl bg-linear-to-br from-white via-white to-cielo-50/30 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] md:p-10">
            {children}
        </div>
    )
}
