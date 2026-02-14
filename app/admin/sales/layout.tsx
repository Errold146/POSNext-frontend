export default function SalesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white shadow w-full mx-auto p-10 my-10 lg:w-3/5">
            {children}
        </div>
    )
}
