import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"

type LayoutProps = {
    cartCount: number
}

function Layout({ cartCount }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-100 p-0 md:p-6">
            <div className="max-w-7xl mx-auto bg-white md:rounded-xl md:border border-slate-200 shadow-sm overflow-hidden">
                <Header cartCount={cartCount} />

                <div className="flex flex-col md:flex-row">
                    <Navbar />
                    <main className="flex-1 min-w-0 p-5 bg-slate-50 min-h-[calc(100vh-10rem)]">
                        <Outlet />
                    </main>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Layout
