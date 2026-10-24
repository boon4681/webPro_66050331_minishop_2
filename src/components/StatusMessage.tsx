import type { ReactNode } from "react"

type StatusMessageProps = {
    children: ReactNode
    error?: boolean
}

function StatusMessage({ children, error = false }: StatusMessageProps) {
    return <p className={`text-center py-10 ${error ? "text-red-600" : "text-gray-500"}`}>{children}</p>
}

export default StatusMessage
