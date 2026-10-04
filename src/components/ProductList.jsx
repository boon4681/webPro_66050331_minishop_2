import ProductCard from "./ProductCard"

function ProductList({ products, onAdd, onDetail }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    name={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    rating={product.rating.rate}
                    reviews={product.rating.count}
                    onAdd={() => onAdd()}
                    onDetail={() => onDetail(product.id)}
                />
            ))}
        </div>
    )
}

export default ProductList
