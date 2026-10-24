const API_URL = "http://localhost:3001/products"

export type StoreProduct = {
    id: number
    name: string
    price: number
    category: string
}

export type ProductInput = Omit<StoreProduct, "id">

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
}

const withBody = (method: "POST" | "PUT", data: ProductInput): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})

export const getProducts = () => request<StoreProduct[]>(API_URL)

export const getProductById = (id: number) => request<StoreProduct>(`${API_URL}/${id}`)

export const createProduct = (data: ProductInput) => request<StoreProduct>(API_URL, withBody("POST", data))

export const updateProduct = (id: number, data: ProductInput) =>
    request<StoreProduct>(`${API_URL}/${id}`, withBody("PUT", data))

export const deleteProduct = (id: number) => request<object>(`${API_URL}/${id}`, { method: "DELETE" })
