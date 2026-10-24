import type { Product } from "../types"

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

let cache: Promise<Product[]> | null = null

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

export const getProducts = () => {
    cache ??= loadProducts().catch(error => {
        cache = null
        throw error
    })
    return cache
}

export const getProductById = (products: Product[], id: string | undefined) =>
    products.find(item => item.id === Number(id))

export const getFeaturedProducts = (products: Product[], count = 4) =>
    [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, count)
