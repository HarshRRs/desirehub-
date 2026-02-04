import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-midnight">
            <Navbar />
            <Sidebar />
            <main className="pl-64 pt-20 min-h-screen">
                <div className="container mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
