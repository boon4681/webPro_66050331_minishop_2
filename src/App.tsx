import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import Icon from "./components/Icon"
import ProductDetail from "./components/ProductDetail"
import ProductList from "./components/ProductList"
import Profile from "./components/Profile"
import Sidebar from "./components/Sidebar"
import type { Page, Product, SortOrder } from "./types"

type Source = {
    url: string
    parse: (data: unknown) => Product[]
}

type DummyJsonResponse = {
    products: (Omit<Product, "image" | "rating"> & {
        thumbnail: string
        rating: number
        reviews: unknown[]
    })[]
}

const sources: Source[] = [
    { url: "https://fakestoreapi.com/products", parse: data => data as Product[] },
    {
        url: "https://dummyjson.com/products",
        parse: data => (data as DummyJsonResponse).products.map(({ thumbnail, rating, reviews, ...item }) => ({
            ...item,
            image: thumbnail,
            rating: { rate: rating, count: reviews.length }
        }))
    }
]

const TIMEOUT_MS = 6000

const loadProducts = async () => {
    for (const source of sources) {
        try {
            const response = await fetch(source.url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
            if (response.ok) return source.parse(await response.json())
        } catch {
            continue
        }
    }
    throw new Error("all product sources failed")
}

const pages: Page[] = ["dashboard", "products", "profile", "detail"]

const isPage = (value: string): value is Page => (pages as string[]).includes(value)

const sort_options: { value: SortOrder, label: string }[] = [
    { value: "asc", label: "Price Low → High" },
    { value: "desc", label: "Price High → Low" }
]

function App() {
    const [page, setPage] = useState<Page>(() => {
        const hash = location.hash.slice(1)
        return isPage(hash) ? hash : "dashboard"
    })
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [cartCount, setCartCount] = useState(0)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [sort, setSort] = useState<SortOrder | "">("")
    const [detailId, setDetailId] = useState<number | null>(null)
    const search_input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        loadProducts()
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(() => {
                setError("ไม่สามารถโหลดข้อมูลได้")
                setLoading(false)
            })
    }, [])

    const categories = ["All", ...new Set(products.map(item => item.category))]

    const query = search.trim().toLowerCase()
    const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(query) &&
        (category === "All" || item.category === category)
    )
    if (sort) filteredProducts.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price)

    const detail_product = products.find(item => item.id === detailId) ?? products[0]

    const addToCart = (quantity = 1) => setCartCount(count => count + quantity)

    const showDetail = (id: number) => {
        setDetailId(id)
        setPage("detail")
    }

    const openSearch = () => {
        flushSync(() => setPage("products"))
        search_input.current?.focus()
    }

    const status = loading
        ? <p className="text-center text-gray-500 py-10">Loading...</p>
        : error
            ? <p className="text-center text-red-600 py-10">{error}</p>
            : null

    return (
        <div className="min-h-screen bg-slate-100 p-0 md:p-6">
            <div className="max-w-7xl mx-auto bg-white md:rounded-xl md:border border-slate-200 shadow-sm overflow-hidden">
                <Header
                    cartCount={cartCount}
                    onSearch={openSearch}
                    onCart={() => setPage("detail")}
                    onProfile={() => setPage("profile")}
                />

                <div className="flex flex-col md:flex-row">
                    <Sidebar page={page} onNavigate={setPage} />

                    <main className="flex-1 min-w-0 p-5 bg-slate-50 min-h-[calc(100vh-7rem)]">
                        {page === "dashboard" && <Dashboard />}

                        {page === "products" && (
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
                                    {status ?? (filteredProducts.length === 0 ? (
                                        <p className="text-center text-gray-500 py-10">ไม่พบสินค้าที่ค้นหา</p>
                                    ) : (
                                        <ProductList products={filteredProducts} onAdd={addToCart} onDetail={showDetail} />
                                    ))}
                                </div>
                            </>
                        )}

                        {page === "profile" && <Profile />}

                        {page === "detail" && (status ?? (detail_product && (
                            <ProductDetail
                                key={detail_product.id}
                                product={detail_product}
                                onAdd={addToCart}
                                onBack={() => setPage("products")}
                            />
                        )))}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default App
