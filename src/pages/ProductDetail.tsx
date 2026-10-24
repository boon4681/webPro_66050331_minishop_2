import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Icon from "../components/Icon"
import StatusMessage from "../components/StatusMessage"
import { useProducts } from "../hooks/useProducts"
import { getProductById } from "../models/productModel"
import { baht } from "../utils"

type ProductDetailProps = {
    onAdd: (quantity: number) => void
}

function ProductDetail({ onAdd }: ProductDetailProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products, loading, error } = useProducts()
    const [quantity, setQuantity] = useState(1)

    const back_link = (
        <Link to="/products" className="flex items-center gap-1 w-fit text-sm text-gray-600 hover:text-blue-600">
            <Icon name="back" className="size-4" /> Back to Products
        </Link>
    )

    if (loading) return <StatusMessage>Loading...</StatusMessage>
    if (error) return <StatusMessage error>{error}</StatusMessage>

    const product = getProductById(products, id)

    if (!product) {
        return (
            <>
                {back_link}
                <div className="bg-white p-10 mt-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
                    <p className="mt-2 text-gray-600">No product has ID {id}.</p>
                </div>
            </>
        )
    }

    const handleAdd = () => {
        onAdd(quantity)
        setQuantity(1)
    }

    return (
        <>
            {back_link}
            <h2 className="mt-2 text-2xl font-bold text-slate-800">Product Detail</h2>

            <div className="bg-white p-5 mt-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6">
                <div className="sm:w-56 aspect-square bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={product.image} alt={product.title} className="w-full h-full p-4 object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-blue-600 font-medium capitalize">{product.category}</p>
                    <h3 className="mt-1 text-xl font-semibold text-gray-900">{product.title}</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">{baht(product.price)}</p>
                    <p className="mt-2 flex items-center gap-1 text-gray-600">
                        <Icon name="star" className="size-5 text-amber-400" filled /> {product.rating.rate} ({product.rating.count})
                    </p>
                    <p className="mt-3 text-sm text-gray-600">{product.description}</p>
                    <div className="flex items-center gap-3 mt-4">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                            <Icon name="minus" />
                        </button>
                        <span className="w-16 py-2 text-center border border-gray-200 rounded-lg font-medium">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="size-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                            <Icon name="plus" />
                        </button>
                    </div>
                    <button onClick={handleAdd} className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer">
                        <Icon name="cart" /> Add to Cart
                    </button>
                    <button onClick={() => navigate("/products")} className="w-full mt-2 border border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail
