import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProductDetail from "./pages/ProductDetail"
import ProductManagement from "./pages/ProductManagement"
import Products from "./pages/Products"
import Profile from "./pages/Profile"

function App() {
    const [cartCount, setCartCount] = useState(0)

    const addToCart = (quantity = 1) => setCartCount(count => count + quantity)

    return (
        <Routes>
            <Route element={<Layout cartCount={cartCount} />}>
                <Route path="/" element={<Home onAdd={() => addToCart()} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products onAdd={() => addToCart()} />} />
                <Route path="/products/:id" element={<ProductDetail onAdd={addToCart} />} />
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
