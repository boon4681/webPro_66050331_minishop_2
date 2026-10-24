import { baht } from "../utils"
import Icon, { type IconName } from "../components/Icon"

type SummaryCardProps = {
    bg: string
    color: string
    icon: IconName
    filled?: boolean
    label: string
    value: number | string
}

function SummaryCard({ bg, color, icon, filled, label, value }: SummaryCardProps) {
    return (
        <div className={`p-4 rounded-xl ${bg}`}>
            <div className={`size-9 rounded-full bg-white/70 ${color} flex items-center justify-center`}>
                <Icon name={icon} filled={filled} />
            </div>
            <p className="mt-3 text-sm text-gray-600">{label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        </div>
    )
}

function Profile() {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800">Profile</h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className="size-24 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                        <Icon name="user" className="size-14" filled />
                    </div>
                    <h3 className="mt-3 text-2xl font-bold text-gray-900">Alex Student</h3>
                    <div className="w-full mt-4 flex flex-col gap-3 text-gray-700">
                        <p className="flex items-center gap-3"><Icon name="mail" className="size-5 text-gray-500" /> alex@email.com</p>
                        <p className="flex items-center gap-3"><Icon name="id_card" className="size-5 text-gray-500" /> Student ID: 6501234567</p>
                    </div>
                    <button className="w-full mt-5 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 cursor-pointer">
                        <Icon name="pen" className="size-4" /> Edit Profile
                    </button>
                </div>

                <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-gray-800">Account Summary</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <SummaryCard bg="bg-blue-50" color="text-blue-600" icon="cart" label="Total Orders" value={128} />
                        <SummaryCard bg="bg-purple-50" color="text-purple-600" icon="baht" label="Total Spent" value={baht(48500)} />
                        <SummaryCard bg="bg-green-50" color="text-green-600" icon="box" label="Wishlist Items" value={6} />
                        <SummaryCard bg="bg-amber-50" color="text-amber-500" icon="star" filled label="Loyalty Points" value={320} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
