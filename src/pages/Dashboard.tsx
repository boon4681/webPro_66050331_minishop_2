import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Icon, { type IconName } from "../components/Icon"
import { getProducts, type StoreProduct } from "../services/productApi"
import { baht } from "../utils"

type Stat = {
    title: string
    value: number | string
    icon: IconName
    description: string
}

function Dashboard() {
    const [products, setProducts] = useState<StoreProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const loadData = () =>
        getProducts()
            .then(data => {
                setProducts(data)
                setError("")
            })
            .catch(() => setError("ไม่สามารถโหลดข้อมูลสินค้าได้"))
            .finally(() => setLoading(false))

    useEffect(() => {
        loadData()
    }, [])

    const retry = () => {
        setLoading(true)
        loadData()
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-3 p-10">
                <span className="loading loading-spinner loading-lg" />
                <p className="opacity-70">Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div role="alert" className="alert alert-error">
                <span>{error}</span>
                <button onClick={retry} className="btn btn-sm">Retry</button>
            </div>
        )
    }

    const totalValue = products.reduce((sum, product) => sum + Number(product.price || 0), 0)
    const categories = new Set(products.map(product => product.category)).size

    const stats: Stat[] = [
        { title: "Total Products", value: products.length, icon: "box", description: "จำนวนสินค้าทั้งหมด" },
        { title: "Product Value", value: baht(totalValue), icon: "baht", description: "ผลรวมราคาสินค้า" },
        { title: "Categories", value: categories, icon: "tag", description: "จำนวนหมวดหมู่" }
    ]

    const recent = [...products].reverse().slice(0, 5)

    return (
        <section className="space-y-4">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>Admin</li>
                    <li>Dashboard</li>
                </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="mt-1 text-sm opacity-60">Overview of your MiniShop products</p>
                </div>
                <Link to="/admin/products" className="btn btn-primary">Manage Products</Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map(stat => (
                    <div key={stat.title} className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="card-title text-base">{stat.title}</h2>
                                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Icon name={stat.icon} className="size-6" />
                                </div>
                            </div>
                            <p className="mt-1 text-3xl font-bold text-primary">{stat.value}</p>
                            <p className="text-sm opacity-60">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="card-title">Recent Products</h2>
                        <Link to="/admin/products" className="link link-primary">View All</Link>
                    </div>

                    {products.length === 0 ? (
                        <div role="alert" className="alert mt-4">
                            <span>ยังไม่มีสินค้าในระบบ</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th className="text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent.map(product => (
                                        <tr key={product.id}>
                                            <td className="font-medium">{product.name}</td>
                                            <td><span className="badge badge-outline">{product.category}</span></td>
                                            <td className="text-right">{baht(product.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Dashboard
