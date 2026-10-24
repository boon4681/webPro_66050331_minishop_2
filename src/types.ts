export type Product = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export type Page = "dashboard" | "products" | "profile" | "detail"

export type SortOrder = "asc" | "desc"
