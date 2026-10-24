import { baht } from "../utils"
import Icon, { type IconName } from "../components/Icon"

type OrderStatus = "Completed" | "Processing" | "Shipped" | "Pending"

type Order = {
    date: string
    customer: string
    items: number
    total: number
    status: OrderStatus
}

type StatCardProps = {
    bg: string
    color: string
    icon: IconName
    label: string
    value: number | string
}

const orders: Order[] = [
    { date: "2025-09-15", customer: "Somchai J.", items: 3, total: 1260, status: "Completed" },
    { date: "2025-09-14", customer: "Nattaya K.", items: 1, total: 520, status: "Processing" },
    { date: "2025-09-13", customer: "Kritsada P.", items: 2, total: 980, status: "Shipped" },
    { date: "2025-09-12", customer: "Piyaporn S.", items: 1, total: 450, status: "Completed" },
    { date: "2025-09-11", customer: "Thanawat C.", items: 4, total: 1800, status: "Pending" }
]

const status_colors: Record<OrderStatus, string> = {
    Completed: "bg-green-50 text-green-600 border-green-200",
    Processing: "bg-blue-50 text-blue-600 border-blue-200",
    Shipped: "bg-purple-50 text-purple-600 border-purple-200",
    Pending: "bg-orange-50 text-orange-600 border-orange-200"
}

function StatCard({ bg, color, icon, label, value }: StatCardProps) {
    return (
        <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className={`size-12 rounded-full ${bg} ${color} flex items-center justify-center`}>
                <Icon name={icon} className="size-6" />
            </div>
            <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
        </div>
    )
}

function Dashboard() {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <StatCard bg="bg-blue-100" color="text-blue-600" icon="box" label="Total Products" value={24} />
                <StatCard bg="bg-green-100" color="text-green-600" icon="cart" label="Orders" value={128} />
                <StatCard bg="bg-purple-100" color="text-purple-600" icon="baht" label="Revenue" value={baht(48500)} />
            </div>

            <div className="bg-white p-5 mt-4 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-xs text-left text-gray-700">
                        <thead className="bg-slate-100 text-gray-600">
                            <tr>
                                <th className="py-2 px-3 font-medium">#</th>
                                <th className="py-2 px-3 font-medium">Date</th>
                                <th className="py-2 px-3 font-medium">Customer</th>
                                <th className="py-2 px-3 font-medium">Items</th>
                                <th className="py-2 px-3 font-medium">Total</th>
                                <th className="py-2 px-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 last:border-0">
                                    <td className="py-2.5 px-3">{index + 1}</td>
                                    <td className="py-2.5 px-3">{item.date}</td>
                                    <td className="py-2.5 px-3">{item.customer}</td>
                                    <td className="py-2.5 px-3">{item.items}</td>
                                    <td className="py-2.5 px-3">{baht(item.total)}</td>
                                    <td className="py-2.5 px-3">
                                        <span className={`px-2 py-0.5 rounded-md border text-xs ${status_colors[item.status]}`}>{item.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard
