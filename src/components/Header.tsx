import Icon from "./Icon"

type HeaderProps = {
    cartCount: number
    onSearch: () => void
    onCart: () => void
    onProfile: () => void
}

function Header({ cartCount, onSearch, onCart, onProfile }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">MiniShop</h1>
            <div className="flex items-center gap-5 text-gray-700">
                <button onClick={onSearch} className="hover:text-blue-600 cursor-pointer">
                    <Icon name="search" className="size-6" />
                </button>
                <button onClick={onCart} className="relative hover:text-blue-600 cursor-pointer">
                    <Icon name="cart" className="size-6" />
                    <span className="absolute -top-2 -right-2 h-4 min-w-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {cartCount}
                    </span>
                </button>
                <button onClick={onProfile} className="text-gray-500 hover:text-blue-600 cursor-pointer">
                    <Icon name="avatar" className="size-7" filled />
                </button>
            </div>
        </header>
    )
}

export default Header
