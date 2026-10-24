import { Link } from "react-router-dom"
import ProductList from "../components/ProductList"
import StatusMessage from "../components/StatusMessage"
import { useProducts } from "../hooks/useProducts"
import { getFeaturedProducts } from "../models/productModel"

type HomeProps = {
    onAdd: () => void
}

function Home({ onAdd }: HomeProps) {
    const { products, loading, error } = useProducts()

    return (
        <>
            <section className="bg-blue-600 text-white p-8 rounded-xl">
                <h2 className="text-3xl font-bold">Welcome to MiniShop</h2>
                <p className="mt-2 text-blue-100">Quality products at fair prices, delivered to your door.</p>
                <div className="flex flex-wrap gap-3 mt-6">
                    <Link to="/products" className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50">
                        Shop Now
                    </Link>
                    <Link to="/about" className="border border-white/60 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10">
                        About Us
                    </Link>
                </div>
            </section>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">Featured Products</h2>
            <div className="mt-4">
                {loading ? (
                    <StatusMessage>Loading...</StatusMessage>
                ) : error ? (
                    <StatusMessage error>{error}</StatusMessage>
                ) : (
                    <ProductList products={getFeaturedProducts(products)} onAdd={onAdd} />
                )}
            </div>
        </>
    )
}

export default Home
