const missions = [
    "Offer everyday products at prices students can afford",
    "Make shopping fast with simple search, filters and clear product details",
    "Deliver every order quickly and keep customers informed along the way"
]

function About() {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800">About MiniShop</h2>

            <div className="bg-white p-6 mt-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-gray-700">
                    MiniShop is a small online store built as a web programming project at KMITL.
                    It sells electronics, fashion and everyday items, and started as a static page
                    before growing into a multi-page React application.
                </p>

                <h3 className="mt-6 text-lg font-semibold text-gray-800">Our Mission</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    {missions.map(item => <li key={item}>{item}</li>)}
                </ul>

                <h3 className="mt-6 text-lg font-semibold text-gray-800">Contact</h3>
                <p className="mt-2 text-gray-700">support@minishop.example · Bangkok, Thailand</p>
            </div>
        </>
    )
}

export default About
