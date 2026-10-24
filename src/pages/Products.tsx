import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Icon from "../components/Icon"
import ProductList from "../components/ProductList"
import StatusMessage from "../components/StatusMessage"
import { useProducts } from "../hooks/useProducts"
import type { SortOrder } from "../types"

const sort_options: { value: SortOrder, label: string }[] = [
    { value: "asc", label: "Price Low → High" },
    { value: "desc", label: "Price High → Low" }
]

type ProductsProps = {
    onAdd: () => void
}

function Products({ onAdd }: ProductsProps) {
    const { products, loading, error } = useProducts()
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [sort, setSort] = useState<SortOrder | "">("")
    const search_input = useRef<HTMLInputElement>(null)
    const location = useLocation()

    useEffect(() => {
        if (location.state?.focusSearch) search_input.current?.focus()
    }, [location])

    const categories = ["All", ...new Set(products.map(item => item.category))]

    const query = search.trim().toLowerCase()
    const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(query) &&
        (category === "All" || item.category === category)
    )
    if (sort) filteredProducts.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price)

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800">Products</h2>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <label className="flex-1 flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-200 focus-within:border-blue-500">
                    <Icon name="search" className="size-5 text-gray-400" />
                    <input
                        ref={search_input}
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search products..."
                        className="w-full outline-none text-sm"
                    />
                </label>
                <div className="relative sm:w-56">
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full appearance-none bg-white px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm capitalize outline-none focus:border-blue-500"
                    >
                        {categories.map(item => (
                            <option key={item} value={item}>{item === "All" ? "All Categories" : item}</option>
                        ))}
                    </select>
                    <Icon name="chevron" className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {sort_options.map(item => (
                    <button
                        key={item.value}
                        onClick={() => setSort(sort === item.value ? "" : item.value)}
                        className={`px-4 py-2 rounded-lg border text-sm cursor-pointer ${sort === item.value ? "bg-blue-600 border-blue-600 text-white font-medium" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                    >
                        Sort {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {loading ? (
                    <StatusMessage>Loading...</StatusMessage>
                ) : error ? (
                    <StatusMessage error>{error}</StatusMessage>
                ) : filteredProducts.length === 0 ? (
                    <StatusMessage>ไม่พบสินค้าที่ค้นหา</StatusMessage>
                ) : (
                    <ProductList products={filteredProducts} onAdd={onAdd} />
                )}
            </div>
        </>
    )
}

export default Products
