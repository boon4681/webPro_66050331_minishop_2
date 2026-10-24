import type { Product } from "../types"
import ProductCard from "./ProductCard"

type ProductListProps = {
    products: Product[]
    onAdd: () => void
}

function ProductList({ products, onAdd }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    rating={product.rating.rate}
                    reviews={product.rating.count}
                    onAdd={onAdd}
                />
            ))}
        </div>
    )
}

export default ProductList
