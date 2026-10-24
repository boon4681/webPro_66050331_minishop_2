const year = new Date().getFullYear()

function Footer() {
    return (
        <footer className="px-5 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
            © {year} MiniShop · 66050331
        </footer>
    )
}

export default Footer
