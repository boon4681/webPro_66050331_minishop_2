import { useEffect, useState, type FormEvent } from "react"
import StatusMessage from "../components/StatusMessage"
import { createProduct, deleteProduct, getProducts, updateProduct, type StoreProduct } from "../services/productApi"
import { baht } from "../utils"

const categories = ["Computer", "Audio", "Fashion", "Gadget"]

const empty_form = { name: "", price: "", category: categories[0] }

function ProductManagement() {
    const [products, setProducts] = useState<StoreProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [form, setForm] = useState(empty_form)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formError, setFormError] = useState("")
    const [saving, setSaving] = useState(false)

    const loadProducts = () =>
        getProducts()
            .then(data => {
                setProducts(data)
                setError("")
            })
            .catch(() => setError("ไม่สามารถโหลดข้อมูลได้"))
            .finally(() => setLoading(false))

    useEffect(() => {
        loadProducts()
    }, [])

    const resetForm = () => {
        setForm(empty_form)
        setEditingId(null)
        setFormError("")
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const name = form.name.trim()
        const price = Number(form.price)

        if (!name) {
            setFormError("กรุณากรอกชื่อสินค้า")
            return
        }
        if (!(price > 0)) {
            setFormError("ราคาต้องมากกว่า 0")
            return
        }

        setSaving(true)
        try {
            const data = { name, price, category: form.category }
            if (editingId === null) await createProduct(data)
            else await updateProduct(editingId, data)
            resetForm()
            await loadProducts()
        } catch {
            setFormError("บันทึกข้อมูลไม่สำเร็จ")
        } finally {
            setSaving(false)
        }
    }

    const handleEdit = (product: StoreProduct) => {
        setEditingId(product.id)
        setForm({ name: product.name, price: String(product.price), category: product.category })
        setFormError("")
    }

    const handleDelete = async (product: StoreProduct) => {
        if (!confirm(`ต้องการลบ ${product.name} ใช่หรือไม่?`)) return
        try {
            await deleteProduct(product.id)
            if (editingId === product.id) resetForm()
            await loadProducts()
        } catch {
            setError("ลบสินค้าไม่สำเร็จ")
        }
    }

    const input_class = "w-full mt-1 bg-white px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500"

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800">Product Management</h2>
            <p className="mt-1 text-sm text-gray-500">จัดการสินค้าผ่าน REST API ที่ http://localhost:3001/products</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <form onSubmit={handleSubmit} noValidate className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-fit">
                    <h3 className="font-semibold text-gray-800">{editingId === null ? "Add Product" : `Edit Product #${editingId}`}</h3>

                    <label className="block mt-4 text-sm text-gray-700">
                        Name
                        <input
                            type="text"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                            placeholder="เช่น Mouse"
                            className={input_class}
                        />
                    </label>

                    <label className="block mt-3 text-sm text-gray-700">
                        Price (บาท)
                        <input
                            type="number"
                            step="any"
                            value={form.price}
                            onChange={(event) => setForm({ ...form, price: event.target.value })}
                            placeholder="เช่น 450"
                            className={input_class}
                        />
                    </label>

                    <label className="block mt-3 text-sm text-gray-700">
                        Category
                        <select
                            value={form.category}
                            onChange={(event) => setForm({ ...form, category: event.target.value })}
                            className={input_class}
                        >
                            {categories.map(item => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </label>

                    {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
                    >
                        {editingId === null ? "Add Product" : "Save Changes"}
                    </button>
                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="w-full mt-2 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-gray-800">Products</h3>
                    {loading ? (
                        <StatusMessage>Loading...</StatusMessage>
                    ) : error ? (
                        <StatusMessage error>{error}</StatusMessage>
                    ) : products.length === 0 ? (
                        <StatusMessage>ยังไม่มีสินค้า</StatusMessage>
                    ) : (
                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="bg-slate-100 text-gray-600">
                                    <tr>
                                        <th className="py-2 px-3 font-medium">ID</th>
                                        <th className="py-2 px-3 font-medium">Name</th>
                                        <th className="py-2 px-3 font-medium">Category</th>
                                        <th className="py-2 px-3 font-medium text-right">Price</th>
                                        <th className="py-2 px-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} className={`border-b border-gray-100 last:border-0 ${product.id === editingId ? "bg-blue-50" : ""}`}>
                                            <td className="py-2.5 px-3">{product.id}</td>
                                            <td className="py-2.5 px-3 font-medium text-gray-900">{product.name}</td>
                                            <td className="py-2.5 px-3">{product.category}</td>
                                            <td className="py-2.5 px-3 text-right">{baht(product.price)}</td>
                                            <td className="py-2.5 px-3">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(product)} className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(product)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductManagement
