import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="py-16 text-center">
            <p className="text-6xl font-bold text-blue-600">404</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-800">Page not found</h2>
            <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
            <Link to="/" className="inline-block mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700">
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound
