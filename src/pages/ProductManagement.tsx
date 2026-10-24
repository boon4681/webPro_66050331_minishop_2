import { useEffect, useState, type FormEvent } from "react"
import Icon from "../components/Icon"
import { createProduct, deleteProduct, getProducts, updateProduct, type StoreProduct } from "../services/productApi"
import { baht } from "../utils"

const categories = ["Computer", "Audio", "Fashion", "Gadget"]

const empty_form = { name: "", price: "", category: categories[0] }

function ProductManagement() {
    const [products, setProducts] = useState<StoreProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")
    const [form, setForm] = useState(empty_form)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingId(null)
        setForm(empty_form)
        setFormError("")
    }

    useEffect(() => {
        if (!isModalOpen) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeModal()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [isModalOpen])

    const openAddModal = () => {
        setEditingId(null)
        setForm(empty_form)
        setFormError("")
        setNotice("")
        setIsModalOpen(true)
    }

    const startEdit = (product: StoreProduct) => {
        setEditingId(product.id)
        setForm({ name: product.name, price: String(product.price), category: product.category || categories[0] })
        setFormError("")
        setNotice("")
        setIsModalOpen(true)
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
            setNotice(editingId === null ? `เพิ่ม ${name} แล้ว` : `บันทึกการแก้ไข ${name} แล้ว`)
            closeModal()
            await loadProducts()
        } catch {
            setFormError("บันทึกข้อมูลไม่สำเร็จ")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (product: StoreProduct) => {
        if (!confirm(`ต้องการลบ ${product.name} ใช่หรือไม่?`)) return
        setNotice("")
        try {
            await deleteProduct(product.id)
            setNotice(`ลบ ${product.name} แล้ว`)
            await loadProducts()
        } catch {
            setError("ลบสินค้าไม่สำเร็จ")
        }
    }

    return (
        <section className="space-y-4">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>Admin</li>
                    <li>Products</li>
                </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Product Management</h1>
                    <p className="mt-1 text-sm opacity-60">เพิ่ม แก้ไข และลบสินค้าผ่าน REST API</p>
                </div>
                <button onClick={openAddModal} className="btn btn-primary">
                    <Icon name="plus" className="size-4" /> Add Product
                </button>
            </div>

            {notice && (
                <div role="status" className="alert alert-success alert-soft">
                    <span>{notice}</span>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center gap-3 p-10">
                    <span className="loading loading-spinner loading-lg" />
                    <p className="opacity-70">Loading...</p>
                </div>
            ) : error ? (
                <div role="alert" className="alert alert-error">
                    <span>{error}</span>
                </div>
            ) : products.length === 0 ? (
                <div role="alert" className="alert">
                    <span>ยังไม่มีสินค้า</span>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-box bg-base-100 border border-base-300 shadow-sm">
                    <table className="table table-zebra max-sm:table-sm">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className="hidden sm:table-cell">Category</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-xs opacity-60">ID {product.id}</p>
                                        <span className="badge badge-outline badge-sm mt-1 sm:hidden">{product.category}</span>
                                    </td>
                                    <td className="hidden sm:table-cell"><span className="badge badge-outline">{product.category}</span></td>
                                    <td className="text-right">{baht(product.price)}</td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => startEdit(product)} className="btn btn-outline btn-sm">
                                                Edit
                                            </button>
                                            <button type="button" onClick={() => handleDelete(product)} className="btn btn-error btn-soft btn-sm">
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

            {isModalOpen && (
                <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
                    <form onSubmit={handleSubmit} noValidate className="modal-box max-h-[90vh] max-w-lg overflow-y-auto">
                        <h3 id="product-modal-title" className="text-lg font-bold">
                            {editingId === null ? "Add Product" : `Edit Product #${editingId}`}
                        </h3>

                        <fieldset className="fieldset mt-4">
                            <label className="fieldset-legend" htmlFor="product-name">Name</label>
                            <input
                                id="product-name"
                                autoFocus
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                placeholder="Product name"
                                className="input w-full"
                            />

                            <label className="fieldset-legend" htmlFor="product-price">Price (บาท)</label>
                            <input
                                id="product-price"
                                type="number"
                                step="any"
                                value={form.price}
                                onChange={(event) => setForm({ ...form, price: event.target.value })}
                                placeholder="Price"
                                className="input w-full"
                            />

                            <label className="fieldset-legend" htmlFor="product-category">Category</label>
                            <select
                                id="product-category"
                                value={form.category}
                                onChange={(event) => setForm({ ...form, category: event.target.value })}
                                className="select w-full"
                            >
                                {categories.map(item => <option key={item}>{item}</option>)}
                            </select>
                        </fieldset>

                        {formError && (
                            <div role="alert" className="alert alert-error alert-soft mt-4">
                                <span>{formError}</span>
                            </div>
                        )}

                        <div className="modal-action">
                            <button type="button" onClick={closeModal} className="btn">Cancel</button>
                            <button type="submit" disabled={saving} className="btn btn-primary">
                                {saving && <span className="loading loading-spinner loading-sm" />}
                                {editingId === null ? "Add Product" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                    <div className="modal-backdrop" onClick={closeModal} />
                </div>
            )}
        </section>
    )
}

export default ProductManagement
