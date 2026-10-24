import { Link } from "react-router-dom"
import { baht } from "../utils"
import Icon from "./Icon"

type ProductCardProps = {
    id: number
    name: string
    price: number
    image: string
    category: string
    rating: number
    reviews: number
    onAdd: () => void
}

function ProductCard({ id, name, price, image, category, rating, reviews, onAdd }: ProductCardProps) {
    return (
        <div className="flex flex-col bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <Link to={`/products/${id}`} className="w-full aspect-[5/4] bg-slate-100 rounded-lg overflow-hidden">
                <img src={image} alt={name} className="w-full h-full p-4 object-contain mix-blend-multiply hover:scale-105 transition" />
            </Link>
            <p className="mt-3 text-xs text-blue-600 font-medium capitalize">{category}</p>
            <h3 className="mt-1 font-semibold text-gray-800 line-clamp-2">{name}</h3>
            <p className="mt-auto pt-1 text-xl font-bold text-gray-900">{baht(price)}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                <Icon name="star" className="size-4 text-amber-400" filled /> {rating} <span className="text-gray-400">({reviews})</span>
            </p>
            <button onClick={onAdd} className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 cursor-pointer">
                Add to Cart
            </button>
            <Link to={`/products/${id}`} className="w-full mt-2 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium text-center hover:bg-gray-50">
                View Detail
            </Link>
        </div>
    )
}

export default ProductCard
