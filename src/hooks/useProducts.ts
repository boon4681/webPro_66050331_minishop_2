import { useEffect, useState } from "react"
import { getProducts } from "../models/productModel"
import type { Product } from "../types"

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => setError("ไม่สามารถโหลดข้อมูลได้"))
            .finally(() => setLoading(false))
    }, [])

    return { products, loading, error }
}
