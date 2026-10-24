import type { Page } from "../types"
import Icon, { type IconName } from "./Icon"

type NavItem = {
    page: Page
    label: string
    icon: IconName
}

type SidebarProps = {
    page: Page
    onNavigate: (page: Page) => void
}

const nav_items: NavItem[] = [
    { page: "dashboard", label: "Dashboard", icon: "home" },
    { page: "products", label: "Products", icon: "box" },
    { page: "profile", label: "Profile", icon: "user" }
]

function Sidebar({ page, onNavigate }: SidebarProps) {
    const active_page = page === "detail" ? "products" : page
    return (
        <nav className="md:w-48 shrink-0 p-3 flex md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-200">
            {nav_items.map(item => (
                <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer ${item.page === active_page ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                >
                    <Icon name={item.icon} /> {item.label}
                </button>
            ))}
        </nav>
    )
}

export default Sidebar
