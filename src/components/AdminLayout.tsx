import { Link, NavLink, Outlet } from "react-router-dom"
import Icon, { type IconName } from "./Icon"
import ThemeToggle from "./ThemeToggle"

type MenuItem = {
    to: string
    label: string
    icon: IconName
}

const menu: MenuItem[] = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "chart" },
    { to: "/admin/products", label: "Products", icon: "box" }
]

function AdminLayout() {
    return (
        <div className="min-h-screen bg-base-200 text-base-content p-0 md:p-6">
            <div className="max-w-7xl mx-auto bg-base-100 md:rounded-box md:border border-base-300 shadow-sm overflow-hidden">
                <header className="navbar min-h-0 gap-2 px-5 py-3 border-b border-base-300">
                    <div className="flex flex-1 items-center gap-2">
                        <Link to="/admin/dashboard" className="text-2xl font-bold text-primary">MiniShop</Link>
                        <span className="badge badge-primary badge-soft">Admin</span>
                    </div>
                    <div className="flex flex-none items-center gap-1">
                        <ThemeToggle />
                        <Link to="/" className="btn btn-ghost btn-sm">
                            <Icon name="home" /> <span className="hidden sm:inline">View Store</span>
                        </Link>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row">
                    <nav className="md:w-48 shrink-0 p-3 flex md:flex-col gap-1 border-b md:border-b-0 md:border-r border-base-300">
                        <p className="hidden md:block px-3 pt-1 pb-2 text-xs font-semibold tracking-wide opacity-50">ADMIN MENU</p>
                        {menu.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-field text-sm whitespace-nowrap ${isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-base-200"}`}
                            >
                                <Icon name={item.icon} /> {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <main className="flex-1 min-w-0 p-5 bg-base-200 min-h-[calc(100vh-7rem)]">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
