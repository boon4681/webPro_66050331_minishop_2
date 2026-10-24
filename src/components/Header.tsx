import { Link, useNavigate } from "react-router-dom"
import Icon from "./Icon"

type HeaderProps = {
    cartCount: number
}

function Header({ cartCount }: HeaderProps) {
    const navigate = useNavigate()

    return (
        <header className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
            <Link to="/" className="text-2xl font-bold text-blue-600">MiniShop</Link>
            <div className="flex items-center gap-5 text-gray-700">
                <button onClick={() => navigate("/products", { state: { focusSearch: true } })} className="hover:text-blue-600 cursor-pointer">
                    <Icon name="search" className="size-6" />
                </button>
                <div title={`${cartCount} items in cart`} className="relative">
                    <Icon name="cart" className="size-6" />
                    <span className="absolute -top-2 -right-2 h-4 min-w-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {cartCount}
                    </span>
                </div>
                <Link to="/profile" className="text-gray-500 hover:text-blue-600">
                    <Icon name="avatar" className="size-7" filled />
                </Link>
            </div>
        </header>
    )
}

export default Header
