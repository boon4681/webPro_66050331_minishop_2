import { NavLink } from "react-router-dom"
import Icon, { type IconName } from "./Icon"

type NavItem = {
    to: string
    label: string
    icon: IconName
}

const nav_items: NavItem[] = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/dashboard", label: "Dashboard", icon: "chart" },
    { to: "/products", label: "Products", icon: "box" },
    { to: "/about", label: "About", icon: "info" },
    { to: "/profile", label: "Profile", icon: "user" }
]

function Navbar() {
    return (
        <nav className="md:w-48 shrink-0 p-3 flex md:flex-col gap-1 overflow-x-auto border-b md:border-b-0 md:border-r border-gray-200">
            {nav_items.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                >
                    <Icon name={item.icon} /> {item.label}
                </NavLink>
            ))}
        </nav>
    )
}

export default Navbar
